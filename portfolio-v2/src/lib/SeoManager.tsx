import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://nooraqasim.dev').replace(/\/$/, '');
const OG_IMAGE = `${SITE_URL}/og-noora-qasim.png`;

const DEFAULT_SEO = {
  title: 'Noora Qasim | Software Engineer, Tech Mentor & Mobile Developer',
  description:
    'The portfolio of Noora Qasim, a software engineer and tech mentor building full-stack systems, mobile apps, developer tools, hackathons, and education platforms.',
  path: '/',
};

const ROUTE_SEO: Record<string, typeof DEFAULT_SEO> = {
  '/': DEFAULT_SEO,
  '/files/about': {
    title: 'Who Is She? | Noora Qasim',
    description:
      'Meet Noora Qasim: software engineer, mobile developer, mentor, builder, and creative technologist.',
    path: '/files/about',
  },
  '/files/projects': {
    title: 'Projects | Noora Qasim',
    description:
      'A case-file archive of Noora Qasim projects, including mobile apps, games, developer tools, documentation, and shipped client work.',
    path: '/files/projects',
  },
  '/files/speaking': {
    title: 'Speaking & Events | Noora Qasim',
    description:
      'Recorded talks, workshops, hackathons, MC work, and public tech education moments from Noora Qasim.',
    path: '/files/speaking',
  },
  '/files/mentor': {
    title: 'Tech Mentor | Noora Qasim',
    description:
      'Noora Qasim as a tech mentor and software engineer at Reboot Coding Institute, teaching Go, JavaScript, Rust, mobile development, and shipping culture.',
    path: '/files/mentor',
  },
  '/files/contact': {
    title: 'Contact | Noora Qasim',
    description:
      'Contact Noora Qasim for software engineering work, mentorship, workshops, hackathons, speaking, and collaborations.',
    path: '/files/contact',
  },
  '/files/rubiks': {
    title: 'Unusual Talent | Noora Qasim',
    description:
      'A playful evidence-room file for Noora Qasim’s Rubik’s cube speedsolving and pattern-recognition side quest.',
    path: '/files/rubiks',
  },
};

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.content = content;
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = href;
}

function upsertStructuredData(url: string) {
  let script = document.head.querySelector<HTMLScriptElement>('script[data-seo="person"]');

  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seo = 'person';
    document.head.appendChild(script);
  }

  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Noora Qasim',
    url,
    image: OG_IMAGE,
    email: 'mailto:nooraqasimwork@gmail.com',
    jobTitle: ['Software Engineer', 'Tech Mentor', 'Mobile Developer'],
    worksFor: {
      '@type': 'Organization',
      name: 'Reboot Coding Institute',
    },
    knowsAbout: [
      'Software Engineering',
      'Mobile Development',
      'React Native',
      'Expo',
      'TypeScript',
      'JavaScript',
      'Go',
      'Rust',
      'Technical Mentorship',
      'Hackathons',
    ],
    sameAs: ['https://github.com/NooraWael', 'https://www.linkedin.com/in/nooraqasim'],
  });
}

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const seo = ROUTE_SEO[location.pathname] ?? DEFAULT_SEO;
    const canonicalUrl = `${SITE_URL}${seo.path}`;

    document.title = seo.title;
    upsertCanonical(canonicalUrl);

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', OG_IMAGE);
    upsertMeta('property', 'og:image:alt', 'Noora Qasim');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', OG_IMAGE);
    upsertMeta('name', 'twitter:image:alt', 'Noora Qasim');
    upsertStructuredData(canonicalUrl);
  }, [location.pathname]);

  return null;
}
