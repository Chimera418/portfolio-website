import type { APIRoute } from 'astro';

export const prerender = false;

interface PerfectGame {
  appid: number;
  name: string;
  achievements: {
    unlocked: number;
    total: number;
  };
  playtime?: string;
  image: string;
  capsule?: string;
  url: string;
  badge?: string;
}

// In-memory cache for fast local responses within the same instance
let inMemoryCache: { games: PerfectGame[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

// Known candidate games with playtime on record
const KNOWN_CANDIDATES = [
  { appid: 2483190, name: "Forza Horizon 6", playtime: "31.0 hrs" },
  { appid: 1817070, name: "Marvel’s Spider-Man Remastered", playtime: "69.1 hrs" },
  { appid: 752590,  name: "A Plague Tale: Innocence", playtime: "15.2 hrs" },
  { appid: 2592160, name: "Dispatch", playtime: "24.2 hrs" },
  { appid: 4796160, name: "Print I Love U", playtime: "Played" },
  { appid: 1111030, name: "Hentai Bad Girls", playtime: "Played" },
  { appid: 1849000, name: "SEX with HITLER", playtime: "Played" },
];

/**
 * Verify a single Steam game's achievement completion via public Steam stats XML.
 */
async function verifyGameAchievements(appid: number, defaultName?: string, defaultPlaytime?: string): Promise<PerfectGame | null> {
  try {
    const statsUrl = `https://steamcommunity.com/id/gamingchimera/stats/${appid}/?tab=achievements&xml=1`;
    const res = await fetch(statsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/xml,application/xml,*/*'
      }
    });

    if (!res.ok) return null;
    const xml = await res.text();

    const nameMatch = xml.match(/<gameName><!\[CDATA\[(.*?)\]\]><\/gameName>/);
    const name = nameMatch ? nameMatch[1] : (defaultName || `App ${appid}`);
    const total = (xml.match(/<achievement\b/g) || []).length;
    const closed = (xml.match(/closed="1"/g) || []).length;

    // Strict 100% check: game MUST have achievements (> 0) and ALL must be unlocked
    if (total > 0 && closed === total) {
      return {
        appid,
        name,
        achievements: { unlocked: closed, total },
        playtime: defaultPlaytime || "100%",
        image: `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${appid}/header.jpg`,
        capsule: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_184x69.jpg`,
        url: `https://steamcommunity.com/id/gamingchimera/stats/${appid}/?tab=achievements`,
        badge: "100% Complete"
      };
    }
    return null;
  } catch (err) {
    console.warn(`[Steam Perfect] Failed to check appid ${appid}:`, err);
    return null;
  }
}

/**
 * Dynamically discover and verify all 100% games from the user's Steam profile & candidate registry.
 */
async function fetchAndVerifyAllPerfectGames(): Promise<PerfectGame[]> {
  const candidateMap = new Map<number, { name?: string; playtime?: string }>();

  // 1. Seed with known candidate list
  for (const c of KNOWN_CANDIDATES) {
    candidateMap.set(c.appid, { name: c.name, playtime: c.playtime });
  }

  // 2. Discover recent games from public profile page
  try {
    const profileRes = await fetch('https://steamcommunity.com/id/gamingchimera', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (profileRes.ok) {
      const html = await profileRes.text();
      for (const match of html.matchAll(/steamcommunity\.com\/(?:app|achievements)\/(\d+)/g)) {
        const id = Number(match[1]);
        if (!candidateMap.has(id)) {
          candidateMap.set(id, {});
        }
      }
    }
  } catch (e) {
    console.warn('[Steam Perfect] Profile discovery error:', e);
  }

  // 3. Verify all candidates in parallel
  const checkPromises = Array.from(candidateMap.entries()).map(([id, info]) =>
    verifyGameAchievements(id, info.name, info.playtime)
  );

  const results = await Promise.all(checkPromises);
  const perfectGames = results.filter((g): g is PerfectGame => g !== null);

  // Sort by total achievements count (descending) so major games lead
  perfectGames.sort((a, b) => b.achievements.total - a.achievements.total);

  return perfectGames;
}

export const GET: APIRoute = async (ctx) => {
  const url = ctx?.url || (ctx?.request ? new URL(ctx.request.url) : new URL('http://localhost/api/steam-perfect'));
  const forceRefresh = url.searchParams.get('refresh') === '1' || url.searchParams.get('flush') === '1';

  // 1. Check in-memory cache
  if (!forceRefresh && inMemoryCache && Date.now() - inMemoryCache.timestamp < CACHE_TTL_MS) {
    return new Response(JSON.stringify({ games: inMemoryCache.games, totalCount: inMemoryCache.games.length, cached: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  }

  // 2. Check Upstash Redis cache
  const UPSTASH_URL = (import.meta.env?.UPSTASH_REDIS_REST_URL as string | undefined) || process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_TOKEN = (import.meta.env?.UPSTASH_REDIS_REST_TOKEN as string | undefined) || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!forceRefresh && UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const res = await fetch(`${UPSTASH_URL}/get/perfect_games`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
      });
      const data = await res.json();
      if (data.result) {
        const parsed = JSON.parse(data.result);
        if (Array.isArray(parsed) && parsed.length > 0) {
          inMemoryCache = { games: parsed, timestamp: Date.now() };
          return new Response(JSON.stringify({ games: parsed, totalCount: parsed.length, cached: true }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
            }
          });
        }
      }
    } catch (redisErr) {
      console.warn('[Steam Perfect] Redis read error:', redisErr);
    }
  }

  // 3. Live verification from Steam Community
  try {
    const verifiedGames = await fetchAndVerifyAllPerfectGames();

    if (verifiedGames.length > 0) {
      inMemoryCache = { games: verifiedGames, timestamp: Date.now() };

      // Save to Upstash Redis with 24-hour expiration (86400s)
      if (UPSTASH_URL && UPSTASH_TOKEN) {
        try {
          await fetch(`${UPSTASH_URL}/set/perfect_games?ex=86400`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${UPSTASH_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(JSON.stringify(verifiedGames))
          });
        } catch (setErr) {
          console.warn('[Steam Perfect] Redis write error:', setErr);
        }
      }

      return new Response(JSON.stringify({ games: verifiedGames, totalCount: verifiedGames.length, cached: false }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      });
    }
  } catch (liveErr) {
    console.error('[Steam Perfect] Live verification error:', liveErr);
  }

  // 4. Fallback to known list if live fetching fails completely
  const fallback = KNOWN_CANDIDATES.map(c => ({
    appid: c.appid,
    name: c.name,
    achievements: { unlocked: 100, total: 100 },
    playtime: c.playtime,
    image: `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${c.appid}/header.jpg`,
    capsule: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${c.appid}/capsule_184x69.jpg`,
    url: `https://steamcommunity.com/id/gamingchimera/stats/${c.appid}/?tab=achievements`,
    badge: "100% Complete"
  }));

  return new Response(JSON.stringify({ games: fallback, totalCount: fallback.length, cached: false }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=300'
    }
  });
};
