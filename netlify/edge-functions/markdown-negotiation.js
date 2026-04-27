// Netlify Edge Function: Markdown Content Negotiation
// Returns markdown representation when Accept: text/markdown header is present
// See: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
// RFC: https://www.rfc-editor.org/rfc/rfc8288

// Simple HTML to Markdown converter for Edge Function environment
function htmlToMarkdown(html) {
  // Remove script and style tags with their content
  let md = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Replace common HTML elements with markdown equivalents
  const replacements = [
    // Headers
    [/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n'],
    [/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n'],
    [/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n'],
    [/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n'],
    [/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '##### $1\n\n'],
    [/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '###### $1\n\n'],

    // Paragraphs and line breaks
    [/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n'],
    [/<br\s*\/?>/gi, '\n'],

    // Lists
    [/<ul[^>]*>([\s\S]*?)<\/ul>/gi, '$1\n'],
    [/<ol[^>]*>([\s\S]*?)<\/ol>/gi, '$1\n'],
    [/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n'],

    // Links and images
    [/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)'],
    [/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)'],
    [/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*>/gi, '![$1]($2)'],

    // Bold and italic
    [/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**'],
    [/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**'],
    [/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*'],
    [/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*'],

    // Code
    [/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`'],
    [/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n\n'],

    // Blockquote
    [/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '> $1\n\n'],

    // Horizontal rule
    [/<hr\s*\/?>/gi, '---\n\n'],

    // Remove remaining tags but keep content
    [/<[^>]+>/g, ''],

    // Clean up whitespace
    [/\n{3,}/g, '\n\n'],
    [/^[\s\t]+/gm, ''],
  ];

  for (const [pattern, replacement] of replacements) {
    md = md.replace(pattern, replacement);
  }

  // Decode HTML entities
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };

  for (const [entity, char] of Object.entries(entities)) {
    md = md.split(entity).join(char);
  }

  return md.trim();
}

// Approximate token count (rough estimate: ~4 chars per token)
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

export default async function markdownNegotiation(request, context) {
  // Check if the request accepts markdown
  const acceptHeader = request.headers.get('Accept') || '';
  const acceptsMarkdown = acceptHeader.includes('text/markdown');

  // If not requesting markdown, continue to the static site
  if (!acceptsMarkdown) {
    return context.next();
  }

  try {
    // Fetch the HTML response from the static site
    const response = await context.next();
    
    // Only process successful HTML responses
    if (!response.ok) {
      return response;
    }

    // Get the content type
    const contentType = response.headers.get('Content-Type') || '';
    
    // Only convert HTML responses
    if (!contentType.includes('text/html')) {
      return response;
    }

    const html = await response.text();

    // Convert HTML to markdown
    const markdown = htmlToMarkdown(html);

    // Calculate approximate token count
    const tokens = estimateTokens(markdown);

    // Return markdown response with proper headers
    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': tokens.toString(),
        'Vary': 'Accept',
      },
    });
  } catch (error) {
    // If conversion fails, return the original response
    console.error('Markdown conversion error:', error);
    return context.next();
  }
}
