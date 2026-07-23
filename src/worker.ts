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

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

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
