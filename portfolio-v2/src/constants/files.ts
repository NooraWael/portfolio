import { tokens } from './tokens';

export type FileSlug =
  | 'about'
  | 'projects'
  | 'speaking'
  | 'mentor'
  | 'contact'
  | 'rubiks'
  | 'games'
  | 'archive';

export interface FileEntry {
  slug: FileSlug;
  number: string;
  label: string;
  subtitle: string;
  color: string;
  scenePath: string;
  sceneTitle: string;
  transitionDuration: number;
  evidencePosition: [number, number, number];
  evidenceRotation: number;
}

export const FILES: FileEntry[] = [
  {
    slug: 'about',
    number: 'FILE 01',
    label: 'WHO IS SHE?',
    subtitle: 'THE SUBJECT DOSSIER',
    color: tokens.colors.accentBlue,
    scenePath: '/files/about',
    sceneTitle: 'Interrogation Room',
    transitionDuration: 1400,
    evidencePosition: [-0.9, 0.4, 0.04],
    evidenceRotation: -0.08,
  },
  {
    slug: 'projects',
    number: 'FILE 02 / EXHIBIT A',
    label: 'PROJECTS',
    subtitle: 'CASES CLOSED',
    color: tokens.colors.accentRed,
    scenePath: '/files/projects',
    sceneTitle: 'Police Lineup',
    transitionDuration: 1600,
    evidencePosition: [0.9, 0.45, 0.04],
    evidenceRotation: 0.06,
  },
  {
    slug: 'speaking',
    number: 'FILE 03',
    label: 'STAGE',
    subtitle: 'WITNESS TESTIMONY',
    color: tokens.colors.accentYellow,
    scenePath: '/files/speaking',
    sceneTitle: 'Witness Stand',
    transitionDuration: 1400,
    evidencePosition: [0.95, -0.1, 0.04],
    evidenceRotation: -0.04,
  },
  {
    slug: 'mentor',
    number: 'FILE 04',
    label: 'TECH MENTOR',
    subtitle: 'KNOWN ASSOCIATES',
    color: tokens.colors.accentGreen,
    scenePath: '/files/mentor',
    sceneTitle: 'Classroom',
    transitionDuration: 1400,
    evidencePosition: [-0.95, -0.05, 0.04],
    evidenceRotation: 0.07,
  },
  {
    slug: 'contact',
    number: 'FILE 05',
    label: 'CONTACT FILE',
    subtitle: 'OPEN A CHANNEL',
    color: tokens.colors.ink,
    scenePath: '/files/contact',
    sceneTitle: 'Dispatch Booth',
    transitionDuration: 1400,
    evidencePosition: [0.95, -0.55, 0.04],
    evidenceRotation: 0.08,
  },
  {
    slug: 'rubiks',
    number: 'FILE 06',
    label: 'UNUSUAL TALENT',
    subtitle: '0:24 / BEST TIME',
    color: tokens.colors.accentPink,
    scenePath: '/files/rubiks',
    sceneTitle: 'Evidence Locker',
    transitionDuration: 1200,
    evidencePosition: [-0.95, -0.56, 0.04],
    evidenceRotation: -0.05,
  },
  {
    slug: 'games',
    number: 'FILE 07',
    label: 'GAMES',
    subtitle: 'PLAYABLE FILES',
    color: tokens.colors.accentGreen,
    scenePath: '/files/games',
    sceneTitle: 'Game Library',
    transitionDuration: 1200,
    evidencePosition: [0, -0.68, 0.04],
    evidenceRotation: 0,
  },
  {
    slug: 'archive',
    number: 'FILE 08',
    label: 'NEOBRUTALISMVERSION',
    subtitle: 'ARCHIVED BUILD',
    color: tokens.colors.accentBlue,
    scenePath: '/files/archive',
    sceneTitle: 'Archive',
    transitionDuration: 1200,
    evidencePosition: [0, -0.68, 0.04],
    evidenceRotation: 0,
  },
];

export const FILES_BY_SLUG = Object.fromEntries(
  FILES.map((entry) => [entry.slug, entry]),
) as Record<FileSlug, FileEntry>;

export function getFileByPath(pathname: string): FileEntry | null {
  const slug = pathname.replace('/files/', '') as FileSlug;
  if (!slug || !pathname.startsWith('/files/')) {
    return null;
  }
  return FILES_BY_SLUG[slug] ?? null;
}
