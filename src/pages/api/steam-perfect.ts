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
  url: string;
  badge?: string;
}

const PERFECT_GAMES: PerfectGame[] = [
  {
    appid: 1817070,
    name: "Marvel’s Spider-Man Remastered",
    achievements: { unlocked: 78, total: 78 },
    playtime: "69.1 hrs",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1817070/header.jpg",
    url: "https://store.steampowered.com/app/1817070/",
    badge: "100% Complete"
  },
  {
    appid: 2358720,
    name: "Black Myth: Wukong",
    achievements: { unlocked: 81, total: 81 },
    playtime: "11.5 hrs",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg",
    url: "https://store.steampowered.com/app/2358720/",
    badge: "100% Complete"
  },
  {
    appid: 752590,
    name: "A Plague Tale: Innocence",
    achievements: { unlocked: 35, total: 35 },
    playtime: "15.2 hrs",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/752590/header.jpg",
    url: "https://store.steampowered.com/app/752590/",
    badge: "100% Complete"
  },
  {
    appid: 2592160,
    name: "Dispatch",
    achievements: { unlocked: 36, total: 36 },
    playtime: "24.2 hrs",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2592160/header.jpg",
    url: "https://store.steampowered.com/app/2592160/",
    badge: "100% Complete"
  },
  {
    appid: 730,
    name: "Counter-Strike 2",
    achievements: { unlocked: 1, total: 1 },
    playtime: "Played",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
    url: "https://store.steampowered.com/app/730/",
    badge: "100% Complete"
  },
  {
    appid: 4796160,
    name: "Print I Love U",
    achievements: { unlocked: 6, total: 6 },
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/4796160/header.jpg",
    url: "https://store.steampowered.com/search/?term=Print+I+Love+U",
    badge: "100% Complete"
  },
  {
    appid: 1111030,
    name: "Hentai Bad Girls",
    achievements: { unlocked: 40, total: 40 },
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1111030/header.jpg",
    url: "https://store.steampowered.com/app/1111030/",
    badge: "100% Complete"
  },
  {
    appid: 1849000,
    name: "SEX with HITLER",
    achievements: { unlocked: 39, total: 39 },
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1849000/header.jpg",
    url: "https://store.steampowered.com/app/1849000/",
    badge: "100% Complete"
  },
  {
    appid: 1409380,
    name: "Lawnmower Game Beer",
    achievements: { unlocked: 3, total: 3 },
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1409380/header.jpg",
    url: "https://store.steampowered.com/search/?term=Lawnmower+Game+Beer",
    badge: "100% Complete"
  }
];

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ games: PERFECT_GAMES, totalCount: PERFECT_GAMES.length }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
