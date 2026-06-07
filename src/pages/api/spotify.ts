import type { APIRoute } from 'astro';

// This endpoint must be rendered on the server
export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
    const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

    if (!client_id || !client_secret || !refresh_token) {
      throw new Error('Missing Spotify credentials in environment variables.');
    }

    // Get access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    const { access_token } = await tokenResponse.json();

    // Try to get currently playing
    let trackResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });

    let track = null;

    if (trackResponse.status === 200) {
      const data = await trackResponse.json();
      if (data.item) {
        track = {
          name: data.item.name,
          artist: data.item.artists.map((a: any) => a.name).join(', '),
          album: data.item.album.name,
          image: data.item.album.images[0]?.url,
          url: data.item.external_urls.spotify,
          duration_ms: data.item.duration_ms,
          progress_ms: data.progress_ms,
          is_playing: data.is_playing,
        };
      }
    }

    // If nothing playing, get recently played
    if (!track) {
      const recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: { 'Authorization': `Bearer ${access_token}` },
      });

      if (recentResponse.ok) {
        const recentData = await recentResponse.json();
        if (recentData.items?.[0]) {
          const item = recentData.items[0].track;
          track = {
            name: item.name,
            artist: item.artists.map((a: any) => a.name).join(', '),
            album: item.album.name,
            image: item.album.images[0]?.url,
            url: item.external_urls.spotify,
            duration_ms: item.duration_ms,
            progress_ms: 0,
            is_playing: false,
          };
        }
      }
    }

    return new Response(JSON.stringify({ track }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    console.error('Spotify API error:', error);
    return new Response(JSON.stringify({ track: null, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
