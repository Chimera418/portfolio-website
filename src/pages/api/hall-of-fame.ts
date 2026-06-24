import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';
import { getCurrentWeekKey } from '../../lib/timeUtils';

const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

const gameConfig: Record<string, { ascending: boolean }> = {
  'chrome-dino': { ascending: false },
  'snake': { ascending: false },
  'tetris': { ascending: false },
  '2048': { ascending: false },
  'flappy-bird': { ascending: false },
  'color-guesser': { ascending: false },
  'memory-match': { ascending: true },
  'wordle': { ascending: false },
  'dont-wordle': { ascending: true },
};

export const GET: APIRoute = async () => {
  try {
    const topScores: Record<string, { player: string; score: number } | null> = {};
    const weekId = getCurrentWeekKey();

    await Promise.all(Object.keys(gameConfig).map(async (gameId) => {
      const isAscending = gameConfig[gameId].ascending;
      const scoreKey = `leaderboard:${gameId}:${weekId}`;
      let topRaw;
      if (isAscending) {
        topRaw = await redis.zrange(scoreKey, 0, 0, { withScores: true });
      } else {
        topRaw = await redis.zrange(scoreKey, 0, 0, { rev: true, withScores: true });
      }
      
      if (topRaw && topRaw.length >= 2) {
        topScores[gameId] = { player: topRaw[0] as string, score: Math.floor(topRaw[1] as number) };
      } else {
        topScores[gameId] = null;
      }
    }));

    return new Response(JSON.stringify(topScores), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error('Redis error (hall of fame):', error);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
};
