function htmlToMarkdown(html: string) {
  let markdown = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  const replacements: Array<[RegExp, string]> = [
    [/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n'],
    [/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n'],
    [/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n'],
    [/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n'],
    [/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '##### $1\n\n'],
    [/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '###### $1\n\n'],
    [/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n'],
    [/<br\s*\/?>/gi, '\n'],
    [/<ul[^>]*>([\s\S]*?)<\/ul>/gi, '$1\n'],
    [/<ol[^>]*>([\s\S]*?)<\/ol>/gi, '$1\n'],
    [/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n'],
    [/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)'],
    [/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)'],
    [/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*>/gi, '![$1]($2)'],
    [/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**'],
    [/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**'],
    [/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*'],
    [/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*'],
    [/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`'],
    [/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n\n'],
    [/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '> $1\n\n'],
    [/<hr\s*\/?>/gi, '---\n\n'],
    [/<[^>]+>/g, ''],
    [/\n{3,}/g, '\n\n'],
    [/^[\s\t]+/gm, ''],
  ];

  for (const [pattern, replacement] of replacements) {
    markdown = markdown.replace(pattern, replacement);
  }

  return markdown
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&nbsp;', ' ')
    .trim();
}

const forms = {
  contact: {
    fields: ['firstName', 'lastName', 'email', 'phone', 'company', 'projectType', 'budget', 'message'],
    required: ['firstName', 'lastName', 'email', 'projectType', 'message'],
    subject: 'Contact form submission',
    successPath: '/thank-you',
  },
  'site-audit': {
    fields: ['website', 'email', 'name'],
    required: ['website', 'email'],
    subject: 'Free site audit request',
    successPath: '/thank-you-checklist',
  },
  'wordpress-doctor': {
    fields: ['name', 'email', 'phone', 'website', 'issue', 'preferred_date', 'preferred_time', 'urgency'],
    required: ['name', 'email', 'phone', 'issue', 'preferred_date', 'preferred_time'],
    subject: 'WordPress Doctor request',
    successPath: '/thank-you',
  },
  'lead-magnet': {
    fields: ['firstName', 'email'],
    required: ['firstName', 'email'],
    subject: 'Website health checklist request',
    successPath: '/thank-you-checklist',
  },
} as const;

type TurnstileResult = {
  success: boolean;
  hostname?: string;
  action?: string;
  'error-codes'?: string[];
};

const turnstileAction = 'turnstile-spin-v2';
const turnstileHostnames = new Set([
  'meonvalleyweb.com',
  'www.meonvalleyweb.com',
  'localhost',
  '127.0.0.1',
]);

function fieldValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]!);
}

async function verifyTurnstile(formData: FormData, request: Request, env: Env) {
  const token = fieldValue(formData, 'cf-turnstile-response');
  if (!token || token.length > 2048 || !env.TURNSTILE_SECRET) {
    return false;
  }

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET,
    response: token,
  });
  const clientIp = request.headers.get('CF-Connecting-IP');
  if (clientIp) {
    body.set('remoteip', clientIp);
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.error(JSON.stringify({
        message: 'Turnstile Siteverify request failed',
        status: response.status,
      }));
      return false;
    }

    const result = await response.json() as TurnstileResult;
    const requestHostname = new URL(request.url).hostname;
    const validHostname = Boolean(
      result.hostname &&
      turnstileHostnames.has(result.hostname) &&
      result.hostname === requestHostname,
    );
    const validAction = result.action === turnstileAction;

    if (!result.success || !validHostname || !validAction) {
      console.warn(JSON.stringify({
        message: 'Turnstile verification failed',
        errorCodes: result['error-codes'] ?? [],
        hostname: result.hostname,
        action: result.action,
      }));
      return false;
    }

    return true;
  } catch (error) {
    console.error(JSON.stringify({
      message: 'Unable to verify Turnstile response',
      error: error instanceof Error ? error.message : String(error),
    }));
    return false;
  }
}

async function handleFormSubmission(request: Request, env: Env) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  }

  const formData = await request.formData();
  const formName = fieldValue(formData, 'form-name') as keyof typeof forms;
  const form = forms[formName];
  if (!form || fieldValue(formData, 'bot-field')) {
    return new Response('Invalid form submission', { status: 400 });
  }

  if (!(await verifyTurnstile(formData, request, env))) {
    return new Response('Please complete the security check and try again.', { status: 403 });
  }

  const values = Object.fromEntries(form.fields.map((field) => [field, fieldValue(formData, field)]));
  if (form.required.some((field) => !values[field]) || !values.email.includes('@')) {
    return new Response('Please complete all required fields.', { status: 400 });
  }

  const details = form.fields
    .filter((field) => values[field])
    .map((field) => `${field}: ${values[field]}`)
    .join('\n');

  try {
    await env.EMAIL.send({
      to: 'hello@meonvalleyweb.com',
      from: { email: 'forms@meonvalleyweb.com', name: 'Meon Valley Web Forms' },
      replyTo: values.email,
      subject: `${form.subject} from ${values.name || values.firstName || values.email}`,
      text: `${form.subject}\n\n${details}`,
      html: `<h1>${escapeHtml(form.subject)}</h1><dl>${form.fields
        .filter((field) => values[field])
        .map((field) => `<dt><strong>${escapeHtml(field)}</strong></dt><dd>${escapeHtml(values[field]).replaceAll('\n', '<br>')}</dd>`)
        .join('')}</dl>`,
    });
  } catch (error) {
    console.error('Unable to send form submission', error);
    return new Response('Unable to send your request. Please try again later.', { status: 502 });
  }

  return Response.redirect(new URL(form.successPath, request.url), 303);
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/forms') {
      return handleFormSubmission(request, env);
    }

    if (url.hostname === 'www.meonvalleyweb.com') {
      url.hostname = 'meonvalleyweb.com';
      return Response.redirect(url, 301);
    }

    if (url.pathname === '/home') {
      url.pathname = '/';
      return Response.redirect(url, 301);
    }

    if (url.pathname === '/pricing') {
      url.pathname = '/hosting';
      return Response.redirect(url, 301);
    }

    if (url.pathname === '/wordpress-hosting-hampshire') {
      url.pathname = '/hosting';
      return Response.redirect(url, 301);
    }

    const response = await env.ASSETS.fetch(request);
    if (!request.headers.get('Accept')?.includes('text/markdown') || !response.ok || !response.headers.get('Content-Type')?.includes('text/html')) {
      return response;
    }

    const markdown = htmlToMarkdown(await response.text());
    return new Response(markdown, {
      status: response.status,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept',
        'x-markdown-tokens': String(Math.ceil(markdown.length / 4)),
      },
    });
  },
} satisfies ExportedHandler<Env>;
