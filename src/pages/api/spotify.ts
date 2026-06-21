import type { APIRoute } from 'astro';

// This endpoint must be rendered on the server
export const prerender = false;

// In-memory cache to prevent rate limits during local dev and on serverless functions (if reused)
let cachedData: any = null;
let cacheExpiry: number = 0;

let cachedAccessToken: string | null = null;
let tokenExpiry: number = 0;

export const GET: APIRoute = async () => {
  try {
    // Serve from memory cache if valid
    if (Date.now() < cacheExpiry && cachedData) {
      return new Response(JSON.stringify({ track: cachedData }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
        }
      });
    }

    const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
    const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

    if (!client_id || !client_secret || !refresh_token) {
      throw new Error('Missing Spotify credentials in environment variables.');
    }

    // Get or reuse access token
    if (!cachedAccessToken || Date.now() >= tokenExpiry) {
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

      const { access_token, expires_in } = await tokenResponse.json();
      cachedAccessToken = access_token;
      tokenExpiry = Date.now() + (expires_in - 60) * 1000;
    }

    const access_token = cachedAccessToken;

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
    } else if (trackResponse.status === 429) {
      console.warn('Spotify currently-playing API rate limited');
    }

    // If nothing playing, get recently played
    if (!track) {
      const recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: { 'Authorization': `Bearer ${access_token}` },
      });

      if (recentResponse.ok) {
        const recentData = await recentResponse.json();
        if (recentData.items && recentData.items.length > 0) {
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
      } else {
        console.error('Spotify recently-played API failed:', recentResponse.status);
      }
    }

    // Update cache
    if (track) {
      cachedData = track;
      cacheExpiry = Date.now() + 60000; // Cache track data for 60 seconds
    } else if (cachedData) {
      // Fallback to cache if we failed to fetch anything new
      track = cachedData;
      cacheExpiry = Date.now() + 30000; // Extend cache slightly to prevent immediate retries
    }

    return new Response(JSON.stringify({ track }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error: any) {
    console.error('Spotify API error:', error);
    
    // Return cached data on error if we have it
    if (cachedData) {
      return new Response(JSON.stringify({ track: cachedData }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
        }
      });
    }

    return new Response(JSON.stringify({ track: null, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
