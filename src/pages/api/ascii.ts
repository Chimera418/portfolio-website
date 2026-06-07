import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const text = url.searchParams.get('text') || 'Hello';
  const font = url.searchParams.get('font') || 'Graffiti';
  
  try {
    const response = await fetch(`https://asciified.thelicato.io/api/v2/ascii?text=${encodeURIComponent(text)}&font=${encodeURIComponent(font)}`);
    if (!response.ok) {
      return new Response('Error fetching from upstream API', { status: response.status });
    }
    const asciiText = await response.text();
    
    return new Response(asciiText, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  } catch (err) {
    console.error('ASCII API Proxy Error:', err);
    return new Response('Error fetching ASCII art', { status: 500 });
  }
};
