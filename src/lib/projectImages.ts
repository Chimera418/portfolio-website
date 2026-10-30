export interface ProjectImageMeta {
  webp: string;
  fallback: string;
}

export const KNOWN_PROJECT_IMAGES: Record<string, ProjectImageMeta> = {
  'cmra': {
    webp: '/images/projects/cmra.webp',
    fallback: '/images/projects/cmra.png'
  },
  'certificate-generator': {
    webp: '/images/projects/certificate-generator.webp',
    fallback: '/images/projects/certificate-generator.png'
  },
  'version-control-system': {
    webp: '/images/projects/version-control-system.webp',
    fallback: '/images/projects/version-control-system.png'
  },
  'feedback-automater': {
    webp: '/images/projects/feedback-automater.webp',
    fallback: '/images/projects/feedback-automater.png'
  },
  'calculator-pro': {
    webp: '/images/projects/calculator-pro.webp',
    fallback: '/images/projects/calculator-pro.png'
  },
  'protein-ssp': {
    webp: '/images/projects/protein-ssp.webp',
    fallback: '/images/projects/protein-ssp.png'
  },
  'drug-conflict-detection': {
    webp: '/images/projects/drug-conflict-detection.webp',
    fallback: '/images/projects/drug-conflict-detection.png'
  },
  'netreaper': {
    webp: '/images/projects/netreaper.webp',
    fallback: '/images/projects/netreaper.png'
  },
  'spamizard': {
    webp: '/images/projects/spamizard.webp',
    fallback: '/images/projects/spamizard.jpg'
  },
  'tabrix': {
    webp: '/images/projects/tabrix.webp',
    fallback: '/images/projects/tabrix.png'
  },
  'goty-games': {
    webp: '/images/projects/goty-games.webp',
    fallback: '/images/projects/goty-games.png'
  },
  'monks-vs-cannibals': {
    webp: '/images/projects/monks-vs-cannibals.webp',
    fallback: '/images/projects/monks-vs-cannibals.png'
  }
};

/**
 * Returns the best image paths for a project slug, prioritizing optimized
 * local WebP & PNG/JPG assets before falling back to remote URLs.
 */
export function getProjectImage(slug: string, remoteUrl?: string): { webp?: string; fallback?: string } {
  const local = KNOWN_PROJECT_IMAGES[slug];
  if (local) {
    return local;
  }
  if (remoteUrl) {
    return { fallback: remoteUrl };
  }
  return {};
}

/**
 * Flat list of all high-priority project image URLs to prefetch & cache.
 */
export const ALL_PROJECT_PRELOAD_URLS: string[] = Object.values(KNOWN_PROJECT_IMAGES).flatMap(img => [img.webp, img.fallback]);

