import type { APIRoute } from 'astro';

// Returns recently-played games derived from Lanyard (Discord) presence & Steam Store
export const prerender = false;

function json(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
    },
  });
}

const KNOWN_RECENTS: Record<string, string> = {
  'wallpaper engine': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/431960/header.jpg',
  'bodycam': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2406770/header.jpg',
  'meccha chameleon': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4704690/header.jpg',
  'print i love u': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4796160/3dd47ea7113f34c01e6301639cc11ec9b6f58019/header.jpg?t=1791545817',
  'a plague tale: innocence': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/752590/header.jpg',
  'forza horizon 6': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2483190/c53fe3362cc3267a5d34aca3e796b90963e0e23f/header_alt_assets_6.jpg?t=1793894652',
  'marvel’s spider-man remastered': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817070/header.jpg',
  'dispatch': 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2592160/header.jpg',
};

async function resolveSteamThumbnail(name: string): Promise<string | null> {
  const lower = name.toLowerCase().trim();
  if (KNOWN_RECENTS[lower]) return KNOWN_RECENTS[lower];

  try {
    const res = await fetch(`https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(name)}&l=english&cc=US`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const top = data.items[0];
        return top.tiny_image || `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${top.id}/header.jpg`;
      }
    }
  } catch (err) {
    console.warn(`[Steam Recent] storesearch error for ${name}:`, err);
  }
  return null;
}

export const GET: APIRoute = async () => {
  const UPSTASH_URL = import.meta.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_TOKEN = import.meta.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
      return json({ games: [], error: 'Missing Upstash config' });
    }
    const auth = { Authorization: `Bearer ${UPSTASH_TOKEN}` };

    let list: any[] = [];
    const r = await fetch(`${UPSTASH_URL}/get/recent_games`, { headers: auth });
    const j = await r.json();
    try { if (j.result) list = JSON.parse(j.result); } catch {}
    if (!Array.isArray(list)) list = [];

    // Fallback: if no rolling list yet, use the single last-played game.
    if (list.length === 0) {
      const r2 = await fetch(`${UPSTASH_URL}/get/last_played_game`, { headers: auth });
      const j2 = await r2.json();
      try {
        if (j2.result) {
          const g = JSON.parse(j2.result);
          if (g && g.name) list = [g];
        }
      } catch {}
    }

    const games = await Promise.all(
      list.slice(0, 10).map(async (g) => {
        let image = g.image ?? null;
        if (!image && g.name) {
          image = await resolveSteamThumbnail(g.name);
        }
        return {
          name: g.name,
          image,
          url: `https://store.steampowered.com/search/?term=${encodeURIComponent(g.name)}`,
          lastSeen: g.last_seen ?? null,
        };
      })
    );

    return json({ games });
  } catch (error: any) {
    console.error('Steam recent error:', error);
    return json({ games: [], error: error.message });
  }
};
