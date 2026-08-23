import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent,
} from 'react';
import {
  Archive,
  BatteryFull,
  BookOpenText,
  Bomb,
  BriefcaseBusiness,
  Calculator,
  Gamepad2,
  GraduationCap,
  Mail,
  Mic2,
  Puzzle,
  Search,
  Terminal,
  Wifi,
  X,
  type LucideIcon,
} from 'lucide-react';
import profilePhoto from '../assets/photo.png';
import { FILES, type FileEntry, type FileSlug } from '../constants/files';
import './hub.css';

interface DesktopFolderProps {
  file: FileEntry;
  icon: LucideIcon;
  position: Point;
  tone: string;
  onOpen: (file: FileEntry) => void;
  onDragStart: (event: PointerEvent<HTMLButtonElement>, slug: FileSlug) => void;
}

interface Point {
  x: number;
  y: number;
}

interface DragState {
  slug: FileSlug;
  startX: number;
  startY: number;
  origin: Point;
  moved: boolean;
  bounds: DOMRect;
}

interface OverlayDragState {
  target: 'terminal' | 'note' | 'calculator' | 'backgroundPicker';
  startX: number;
  startY: number;
  origin: Point;
  width: number;
  height: number;
}

interface TerminalLine {
  kind: 'system' | 'input' | 'output';
  text: string;
}

type MinesweeperDifficulty = 'easy' | 'medium' | 'hard';
type MinesweeperStatus = 'ready' | 'playing' | 'won' | 'lost';
type GameSlug = 'minesweeper' | 'twenty48' | 'typing';
type Twenty48Direction = 'up' | 'down' | 'left' | 'right';
type Twenty48Status = 'playing' | 'won' | 'lost';
type WallpaperSlug = 'valley' | 'room' | 'cabin' | 'rooftop' | 'desert' | 'stargazing';

interface MinesweeperCell {
  id: number;
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
}

interface MinesweeperConfig {
  label: string;
  rows: number;
  cols: number;
  mines: number;
}

interface DesktopContextMenuState {
  x: number;
  y: number;
}

const folderMeta: Record<
  FileSlug,
  {
    icon: LucideIcon;
    x: number;
    y: number;
    tone: string;
  }
> = {
  about: { icon: BookOpenText, x: 7, y: 18, tone: 'blue' },
  speaking: { icon: Mic2, x: 7, y: 35, tone: 'yellow' },
  projects: { icon: BriefcaseBusiness, x: 8, y: 52, tone: 'orange' },
  mentor: { icon: GraduationCap, x: 88, y: 24, tone: 'green' },
  contact: { icon: Mail, x: 91, y: 49, tone: 'black' },
  rubiks: { icon: Puzzle, x: 86, y: 73, tone: 'pink' },
  games: { icon: Gamepad2, x: 10, y: 71, tone: 'green' },
  archive: { icon: Archive, x: 8, y: 87, tone: 'blue' },
};

const windowTitles: Record<FileSlug, string> = {
  about: 'Noora Qasim',
  projects: 'Projects',
  speaking: 'Speaking',
  mentor: 'Mentor',
  contact: 'Contact',
  rubiks: 'Rubik\'s',
  games: 'Games',
  archive: 'neobrutalismversion',
};

const education = [
  {
    date: '2021 - 2025',
    title: 'B.Sc. ICT / Programming',
    org: 'Bahrain Polytechnic',
    body:
      'Graduated with honors in the programming major. Coursework and project work covered Java, C#, Swift, TypeScript, game development, and collaborative production code.',
  },
  {
    date: '2023 - 2025',
    title: 'Full-Stack Diploma',
    org: 'Reboot Coding Institute',
    body:
      'Hands-on program across systems, algorithms, cloud infrastructure, DevOps, and mobile development, with project work connected to the Nordic ecosystem.',
  },
  {
    date: '2025',
    title: 'Professional Scrum Master',
    org: 'Scrum.org',
    body: 'Certification in Agile and Scrum methodology.',
  },
];

const workHistory = [
  {
    date: '2024 / 6 months',
    title: 'Web Development Intern',
    org: 'Raincode',
    body:
      'Built WordPress-based client sites in a team of four, practiced Agile delivery, and shipped Raincode.tech and Raincode.bh.',
  },
  {
    date: 'Jan 2025 - Mar 2026',
    title: 'Mobile Team Lead',
    org: 'Raincode x Foremarket',
    body:
      'Led React Native / Expo development for Foremarket, Sweden\'s second-hand golf marketplace. Directed a 3-developer mobile team and shipped production features.',
  },
  {
    date: 'Mar 2026 - present',
    title: 'Tech Mentor / Software Engineer',
    org: 'Reboot Coding Institute',
    body:
      'Builds internal systems and learning tools while mentoring students across Go, JavaScript, Rust, mobile development, debugging, and practical engineering.',
  },
];

const stackLogos = [
  { label: 'React Native', src: '/stack/react.webp' },
  { label: 'Expo', src: '/stack/expo.webp' },
  { label: 'TypeScript', src: '/stack/typescript.webp' },
  { label: 'JavaScript', src: '/stack/javascript.webp' },
  { label: 'Next.js', src: '/stack/nextjs.webp' },
  { label: 'Node.js', src: '/stack/nodejs.webp' },
  { label: 'Go', src: '/stack/go.webp' },
  { label: 'Rust', src: '/stack/rust.webp' },
  { label: 'C#', src: '/stack/csharp.webp' },
  { label: 'Unity', src: '/stack/unity.webp' },
  { label: 'SDL2', src: '/stack/sdl2.webp' },
  { label: 'Blender', src: '/stack/blender.webp' },
  { label: 'MongoDB', src: '/stack/mongodb.webp' },
  { label: 'PostgreSQL', src: '/stack/postgresql.webp' },
  { label: 'AWS', src: '/stack/aws.webp' },
  { label: 'Docker', src: '/stack/docker.webp' },
  { label: 'Git', src: '/stack/git.webp' },
  { label: 'Scrum / Agile', src: '/stack/agile.webp' },
];

const projects = [
  {
    id: 'foremarket',
    title: 'Foremarket',
    type: 'Mobile app - iOS / Android',
    date: 'Jan 2025 - ongoing',
    status: 'Active / shipped',
    role: 'Mobile Team Lead',
    stack: ['React Native', 'Expo', 'TypeScript', 'Stripe', 'Firebase'],
    body:
      'A marketplace for second-hand golf equipment. Noora led the mobile build with a 3-developer team, shipped production features, and supported expansion beyond the original market.',
    links: [{ label: 'Visit foremarket.se', href: 'https://foremarket.se' }],
  },
  {
    id: 'cryptic',
    title: 'Cryptic Portal',
    type: '3D escape-room game',
    date: '2024',
    status: 'Downloadable',
    role: 'Senior project',
    stack: ['Unity', 'C#', 'LLM', 'Blender'],
    body:
      'An escape-room game with cryptic puzzles and an AI guide. The NPC uses an LLM to give in-character hints, and the 3D environment was modeled in Blender.',
    links: [{ label: 'Download build', href: 'https://dj96u9m908mjo.cloudfront.net/Cryptic.zip' }],
  },
  {
    id: 'maze',
    title: 'Maze Wars',
    type: '2D maze battler',
    date: '2024',
    status: 'Archived',
    role: 'Systems learning project',
    stack: ['Rust', 'SDL2'],
    body:
      'A from-scratch 2D maze battler written in Rust with SDL2, including a hand-rolled game loop, collision detection, and procedural maze generation.',
    links: [{ label: 'View code', href: 'https://github.com/NooraWael/maze-wars' }],
  },
  {
    id: 'bevy',
    title: 'Bevy Guide',
    type: 'Documentation site',
    date: '2024',
    status: 'Live',
    role: 'Open-source learning resource',
    stack: ['Next.js', 'Rust', 'MDX'],
    body:
      'A learning resource for the Bevy game engine, built with Next.js, MDX, and custom components for embedded code examples.',
    links: [
      { label: 'Visit site', href: 'https://bevy-guide.vercel.app' },
      { label: 'View code', href: 'https://github.com/NooraWael/bevy-guide' },
    ],
  },
  {
    id: 'wget',
    title: 'W-get Replica',
    type: 'CLI / networking project',
    date: '2023',
    status: 'Archived',
    role: 'Go concurrency study',
    stack: ['Go', 'Gin', 'CLI'],
    body:
      'A re-implementation of wget in Go, covering HTTP/HTTPS downloads, recursive mirroring, rate limiting, and concurrent fetching.',
    links: [{ label: 'View code', href: 'https://github.com/NooraWael/get-with-a-w' }],
  },
  {
    id: 'raincode',
    title: 'Raincode Sites',
    type: 'Client websites',
    date: '2024',
    status: 'Live x 2',
    role: 'Web development intern',
    stack: ['WordPress', 'PHP', 'Design'],
    body:
      'Two WordPress client sites shipped during a Raincode internship, with custom templates and theming.',
    links: [
      { label: 'Raincode.tech', href: 'https://raincode.tech' },
      { label: 'Raincode.bh', href: 'https://raincode.bh' },
    ],
  },
];

const speakingEvents = [
  ['Build Hackathon', 'Reboot x Polytechnic - MC / lead mentor', '2026'],
  ['Dream Big Bahrain', 'Speak Up panel / speaker', '2026'],
  ['Zain AI Hackathon', 'Facilitator / mentor', '2026'],
  ['Agile Workshop', 'Bahrain Polytechnic - workshop lead', '2026'],
];

const speakingPhotos = [
  { src: '/speakingMain.jpeg', alt: 'Noora speaking at an event' },
  { src: '/speakup.jpeg', alt: 'Speak Up panel event' },
  { src: '/buildHackathon.jpeg', alt: 'Build Hackathon event' },
  { src: '/zainAI.jpeg', alt: 'Zain AI Hackathon event' },
];

const mentorWork = [
  ['Cohort mentorship', 'Technical mentorship across 500+ students, helping them understand code, debug clearly, and move from exercises into production-ready work.'],
  ['Full-stack workshops', 'Hands-on sessions across frontend, backend, APIs, databases, Agile flow, product thinking, and shipping usable systems.'],
  ['Operational tooling', 'Internal systems for dashboards, recruit tracking, curriculum delivery, reporting, and more efficient education operations.'],
  ['Hackathons + events', 'Team formation, architecture support, demo coaching, judging support, mentoring, and MC work for build-focused events.'],
];

const contactChannels = [
  ['Email', 'nooraqasimwork@gmail.com', 'mailto:nooraqasimwork@gmail.com?subject=Portfolio%20Inquiry'],
  ['GitHub', '@NooraWael', 'https://github.com/NooraWael'],
  ['LinkedIn', 'Noora Qasim', 'https://www.linkedin.com/in/nooraqasim'],
];

const terminalIntro: TerminalLine[] = [
  { kind: 'system', text: 'NQ CTF terminal ready. Type `help`.' },
];

const terminalCompletions = [
  'help',
  'ls',
  'calc',
  'open calculator',
  'clear',
  'cat README.md',
  'cat hint.txt',
  'cat vault.lock',
  'cat vault.calc',
  'cat flag.txt',
];

const minesweeperConfigs: Record<MinesweeperDifficulty, MinesweeperConfig> = {
  easy: { label: 'Easy', rows: 8, cols: 8, mines: 10 },
  medium: { label: 'Medium', rows: 10, cols: 12, mines: 18 },
  hard: { label: 'Hard', rows: 12, cols: 16, mines: 36 },
};

const gameTitles: Record<GameSlug, string> = {
  minesweeper: 'Minesweeper',
  twenty48: '2048',
  typing: 'Typing Test',
};

const games: Array<{ slug: GameSlug; title: string; icon: LucideIcon; tone: string }> = [
  { slug: 'minesweeper', title: 'Minesweeper', icon: Bomb, tone: 'green' },
  { slug: 'twenty48', title: '2048', icon: Calculator, tone: 'yellow' },
  { slug: 'typing', title: 'Typing Test', icon: Terminal, tone: 'blue' },
];

const typingPrompts = [
  'ship useful software and make the path easier for the next builder',
  'debug the system before blaming the user',
  'small teams move faster when the feedback loop is clear',
  'explain the system find the failure ship the fix',
  'full stack work is mostly making messy ideas usable from end to end',
  'build the dashboard wire the api clean the data and test the weird path',
  'good mentorship turns panic into a repeatable debugging process',
  'read the error message slowly then inspect the state that created it',
  'production is where small assumptions become very loud bugs',
  'the best feature is the one people can actually understand and use',
  'start with the user flow then make the code serve that flow',
  'a clean system is easier to teach easier to debug and easier to extend',
  'every hackathon team needs scope control a working demo and calm commits',
  'design the happy path then spend real time on the edge cases',
  'mobile apps feel simple only when the invisible systems are solid',
  'backend work is naming the data correctly and defending every boundary',
  'ship the smallest useful version then listen carefully to what breaks',
  'mentor the person in front of you not the imaginary perfect student',
  'good documentation saves future you from becoming tech support',
  'a bug report is just a story with missing evidence',
  'make the invisible state visible and half the mystery disappears',
  'fast builders are usually just good at cutting scope without cutting quality',
  'the terminal knows what happened if you ask the right question',
  'interfaces should feel obvious after the hard thinking is done',
  'clear feedback beats clever UI every time',
  'write the code like someone tired will debug it at midnight',
  'systems work is turning scattered requirements into dependable behavior',
  'the demo only works when the boring parts are working too',
  'teach the concept then teach the failure mode then let them build',
  'good engineers leave fewer mysteries for the next person',
  'every project needs a clear owner a clear path and a clear done',
  'the fastest fix is usually the one that starts with reproduction',
  'software gets better when people can explain what it is doing',
  'keep the flow tight the copy clear and the states honest',
];

const desktopWallpapers: Array<{ slug: WallpaperSlug; label: string; src: string }> = [
  { slug: 'valley', label: 'Valley', src: '/papercraft-desktop-wallpaper.png' },
  { slug: 'room', label: 'Room', src: '/wallpaper-room.png' },
  { slug: 'cabin', label: 'Cabin', src: '/wallpaper-cabin.png' },
  { slug: 'rooftop', label: 'Rooftop', src: '/wallpaper-rooftop.png' },
  { slug: 'desert', label: 'Desert', src: '/wallpaper-desert.png' },
  { slug: 'stargazing', label: 'Stars', src: '/wallpaper-stargazing.png' },
];

function getInitialWallpaper(): WallpaperSlug {
  if (typeof window === 'undefined') {
    return 'valley';
  }

  const saved = window.localStorage.getItem('nq-wallpaper') as WallpaperSlug | null;
  return saved && desktopWallpapers.some((wallpaper) => wallpaper.slug === saved) ? saved : 'valley';
}

function getDefaultFolderPositions() {
  return Object.fromEntries(
    FILES.map((file) => [file.slug, { x: folderMeta[file.slug].x, y: folderMeta[file.slug].y }]),
  ) as Record<FileSlug, Point>;
}

function createSortedFolderPositions(files: FileEntry[]) {
  const columns = [
    { x: 7, startY: 18 },
    { x: 88, startY: 24 },
  ];
  const next = getDefaultFolderPositions();

  files.forEach((file, index) => {
    const column = index < Math.ceil(files.length / 2) ? columns[0] : columns[1];
    const row = index < Math.ceil(files.length / 2) ? index : index - Math.ceil(files.length / 2);
    next[file.slug] = { x: column.x, y: column.startY + row * 13.4 };
  });

  return next;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getTerminalCompletion(value: string) {
  const match = terminalCompletions.find((completion) => completion.toLowerCase().startsWith(value.toLowerCase()));
  return match ?? value;
}

function getNeighbors(index: number, rows: number, cols: number) {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const neighbors: number[] = [];

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      if (rowOffset === 0 && colOffset === 0) {
        continue;
      }

      const nextRow = row + rowOffset;
      const nextCol = col + colOffset;
      if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) {
        neighbors.push(nextRow * cols + nextCol);
      }
    }
  }

  return neighbors;
}

function createMinesweeperBoard(config: MinesweeperConfig, safeIndex?: number) {
  const total = config.rows * config.cols;
  const mineIndexes = new Set<number>();
  const safeIndexes =
    safeIndex === undefined
      ? new Set<number>()
      : new Set([safeIndex, ...getNeighbors(safeIndex, config.rows, config.cols)]);

  while (mineIndexes.size < config.mines) {
    const index = Math.floor(Math.random() * total);
    if (!safeIndexes.has(index)) {
      mineIndexes.add(index);
    }
  }

  return Array.from({ length: total }, (_, id) => {
    const mine = mineIndexes.has(id);
    const adjacent = mine
      ? 0
      : getNeighbors(id, config.rows, config.cols).filter((neighbor) => mineIndexes.has(neighbor)).length;

    return { id, mine, revealed: false, flagged: false, adjacent };
  });
}

function createEmptyMinesweeperBoard(config: MinesweeperConfig) {
  return Array.from({ length: config.rows * config.cols }, (_, id) => ({
    id,
    mine: false,
    revealed: false,
    flagged: false,
    adjacent: 0,
  }));
}

function revealMinesweeperCell(board: MinesweeperCell[], index: number, config: MinesweeperConfig) {
  const next = board.map((cell) => ({ ...cell }));
  const target = next[index];

  if (!target || target.revealed || target.flagged) {
    return next;
  }

  const queue = [index];
  const visited = new Set<number>();

  while (queue.length) {
    const currentIndex = queue.shift();
    if (currentIndex === undefined || visited.has(currentIndex)) {
      continue;
    }

    visited.add(currentIndex);
    const cell = next[currentIndex];
    if (!cell || cell.flagged || cell.revealed) {
      continue;
    }

    cell.revealed = true;

    if (!cell.mine && cell.adjacent === 0) {
      getNeighbors(currentIndex, config.rows, config.cols).forEach((neighbor) => {
        if (!visited.has(neighbor) && !next[neighbor].mine) {
          queue.push(neighbor);
        }
      });
    }
  }

  return next;
}

function createEmptyTwenty48Board() {
  return Array.from({ length: 16 }, () => 0);
}

function addTwenty48Tile(board: number[]) {
  const emptyIndexes = board
    .map((value, index) => (value === 0 ? index : -1))
    .filter((index) => index !== -1);

  if (!emptyIndexes.length) {
    return board;
  }

  const next = [...board];
  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  next[randomIndex] = Math.random() > 0.9 ? 4 : 2;
  return next;
}

function createTwenty48Board() {
  return addTwenty48Tile(addTwenty48Tile(createEmptyTwenty48Board()));
}

function slideTwenty48Line(line: number[]) {
  const values = line.filter(Boolean);
  const merged: number[] = [];
  let score = 0;

  for (let index = 0; index < values.length; index += 1) {
    if (values[index] === values[index + 1]) {
      const nextValue = values[index] * 2;
      merged.push(nextValue);
      score += nextValue;
      index += 1;
    } else {
      merged.push(values[index]);
    }
  }

  while (merged.length < 4) {
    merged.push(0);
  }

  return {
    line: merged,
    score,
    changed: merged.some((value, index) => value !== line[index]),
  };
}

function moveTwenty48Board(board: number[], direction: Twenty48Direction) {
  const next = createEmptyTwenty48Board();
  let score = 0;
  let changed = false;

  for (let lineIndex = 0; lineIndex < 4; lineIndex += 1) {
    const indexes =
      direction === 'left' || direction === 'right'
        ? Array.from({ length: 4 }, (_, index) => lineIndex * 4 + index)
        : Array.from({ length: 4 }, (_, index) => index * 4 + lineIndex);
    const orderedIndexes = direction === 'right' || direction === 'down' ? [...indexes].reverse() : indexes;
    const line = orderedIndexes.map((index) => board[index]);
    const result = slideTwenty48Line(line);

    orderedIndexes.forEach((index, valueIndex) => {
      next[index] = result.line[valueIndex];
    });

    score += result.score;
    changed = changed || result.changed;
  }

  return { board: next, score, changed };
}

function canMoveTwenty48(board: number[]) {
  if (board.some((value) => value === 0)) {
    return true;
  }

  return board.some((value, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const right = col < 3 ? board[index + 1] : null;
    const down = row < 3 ? board[index + 4] : null;
    return value === right || value === down;
  });
}

function getTwenty48ClassName(value: number) {
  if (value >= 2048) {
    return 'v-2048';
  }

  return value ? `v-${value}` : 'empty';
}

function getInitialTerminalPosition(): Point {
  if (typeof window === 'undefined') {
    return { x: 128, y: 560 };
  }

  return { x: 128, y: Math.max(56, window.innerHeight - 340) };
}

function getInitialNotePosition(): Point {
  if (typeof window === 'undefined') {
    return { x: 1020, y: 520 };
  }

  return {
    x: Math.max(16, window.innerWidth - 430),
    y: Math.max(52, window.innerHeight - 360),
  };
}

function getInitialCalculatorPosition(): Point {
  if (typeof window === 'undefined') {
    return { x: 700, y: 420 };
  }

  return {
    x: Math.max(16, Math.min(window.innerWidth - 300, window.innerWidth * 0.58)),
    y: Math.max(52, Math.min(window.innerHeight - 410, window.innerHeight * 0.42)),
  };
}

function getInitialBackgroundPickerPosition(): Point {
  if (typeof window === 'undefined') {
    return { x: 440, y: 74 };
  }

  return {
    x: Math.max(16, Math.min(window.innerWidth - 584, window.innerWidth / 2 - 280)),
    y: 74,
  };
}

function isCompactLayout() {
  return window.matchMedia('(max-width: 940px)').matches;
}

function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function DesktopFolder({
  file,
  icon: Icon,
  position,
  tone,
  onOpen,
  onDragStart,
}: DesktopFolderProps) {
  return (
    <button
      type="button"
      className={`desktop-folder tone-${tone}`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      onPointerDown={(event) => onDragStart(event, file.slug)}
      onClick={() => onOpen(file)}
      aria-label={`Open ${file.label}`}
    >
      <span className="folder-tab" />
      <span className="folder-body">
        <Icon size={21} strokeWidth={2.35} />
      </span>
      <span className="folder-label">{file.label}</span>
    </button>
  );
}

function RecordList({ title, records }: { title: string; records: typeof education }) {
  return (
    <section className="editorial-section record-section">
      <div className="record-section-header">
        <h3>{title}</h3>
        <span>{title === 'Education' ? 'Learning track' : 'Experience log'}</span>
      </div>
      <div className="timeline-list">
        {records.map((record, index) => (
          <article className="timeline-card" key={`${record.date}-${record.title}`}>
            <div className="record-marker">{String(index + 1).padStart(2, '0')}</div>
            <div className="timeline-date">{record.date}</div>
            <div className="record-copy">
              <h4>{record.title}</h4>
              <p className="record-org">{record.org}</p>
              <p>{record.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutContent() {
  return (
    <>
      <div className="profile-pane editorial-hero">
        <div className="profile-photo">
          <img src={profilePhoto} alt="Noora Qasim" />
        </div>
        <div className="profile-copy">
          <p className="eyebrow">Software engineer / mobile lead / tech mentor</p>
          <h1>Noora Qasim</h1>
          <p className="lead">
            Software engineer working across mobile apps, education systems, and practical developer
            tools. Focused on building useful products, mentoring engineers, and making complex
            systems easier to understand.
          </p>
        </div>
      </div>

      <RecordList title="Education" records={education} />
      <RecordList title="Work" records={workHistory} />

      <section className="editorial-section stack-section">
        <div className="stack-section-head">
          <h3>Working Stack</h3>
          <img className="stack-coding-owl" src="/owl-coding.png" alt="" aria-hidden="true" />
        </div>
        <div className="stack-logo-grid">
          {stackLogos.map((logo) => (
            <div className="stack-logo-tile" key={logo.label} title={logo.label} aria-label={logo.label}>
              <img src={logo.src} alt={logo.label} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectsContent() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  return (
    <>
      <div className="article-heading">
        <p className="eyebrow">Selected work / factual project notes</p>
        <h2>Projects</h2>
        <p className="lead">
          A practical record of shipped work, technical experiments, and learning projects already
          documented in the portfolio.
        </p>
      </div>

      <div className="projects-editorial">
        <div className="project-index">
          {projects.map((project) => (
            <button
              type="button"
              className={selected.id === project.id ? 'active' : ''}
              onClick={() => setSelectedId(project.id)}
              key={project.id}
            >
              <span>{project.status}</span>
              <strong>{project.title}</strong>
              <small>{project.type}</small>
            </button>
          ))}
        </div>

        <article className="project-story">
          <div className="project-meta-line">
            <span>{selected.date}</span>
            <span>{selected.role}</span>
          </div>
          <h3>{selected.title}</h3>
          <p>{selected.body}</p>
          <div className="chip-row">
            {selected.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="link-row">
            {selected.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
          <img className="project-thinking-owl" src="/owl-thinking.png" alt="" aria-hidden="true" />
        </article>
      </div>
    </>
  );
}

function SpeakingContent() {
  return (
    <>
      <div className="speaking-stage">
        <div className="speaking-copy">
          <p className="eyebrow">Speaking / events / facilitation</p>
          <h2>Speaking</h2>
          <p className="lead">
            Public-facing work from panels, hackathons, workshops, and rooms where technical ideas
            had to be explained clearly.
          </p>
        </div>

        <div className="speaking-visual" aria-label="Speaking photos">
          <img className="speaking-mic" src="/mic.png" alt="" aria-hidden="true" />
          <div className="speaking-photo-stack">
            {speakingPhotos.map((photo) => (
              <img src={photo.src} alt={photo.alt} key={photo.src} loading="lazy" />
            ))}
          </div>
        </div>
      </div>

      <div className="event-list speaking-event-list">
        {speakingEvents.map(([title, role, date]) => (
          <article className="event-card" key={title}>
            <span>{date}</span>
            <h3>{title}</h3>
            <p>{role}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function MentorContent() {
  return (
    <section className="mentor-page">
      <div className="mentor-hero">
        <div className="mentor-copy">
          <p className="eyebrow">Reboot Coding Institute / current</p>
          <h2>Full-stack mentorship</h2>
          <p className="lead">
            Helping 500+ students understand code, push production work, and build operationally
            efficient systems across frontend, backend, mobile, data, debugging, and delivery.
          </p>
        </div>

        <div className="mentor-visual" aria-hidden="true">
          <div className="mentor-console">
            <span>mentor.ops</span>
            <code>students: 500+</code>
            <code>scope: full-stack</code>
            <code>mode: build / debug / ship</code>
          </div>
          <img className="mentor-coding-owl" src="/owl-coding.png" alt="" />
        </div>
      </div>

      <div className="mentor-metrics" aria-label="Mentorship focus">
        <div>
          <strong>500+</strong>
          <span>students mentored</span>
        </div>
        <div>
          <strong>Full-stack</strong>
          <span>frontend, backend, APIs, databases, mobile</span>
        </div>
        <div>
          <strong>Production</strong>
          <span>debugging, architecture, shipping habits</span>
        </div>
      </div>

      <div className="mentor-work-grid">
        {mentorWork.map(([title, body], index) => (
          <article className="mentor-work-card" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mentor-system-strip">
        <img className="mentor-thinking-owl" src="/owl-thinking.png" alt="" aria-hidden="true" />
        <div>
          <p className="eyebrow">Mentorship loop</p>
          <h3>Explain the system, find the failure, ship the fix.</h3>
        </div>
        <p>
          The work is not just answering questions. It is turning confusing bugs, scattered
          requirements, and half-built ideas into a clearer path students can repeat on their own.
        </p>
      </div>
    </section>
  );
}

function ContactContent() {
  return (
    <>
      <div className="article-heading">
        <p className="eyebrow">Channels</p>
        <h2>Contact</h2>
        <p className="lead">
          For software builds, full-stack systems, workshops, hackathons, mentorship, speaking,
          collaborations, or work at the intersection of engineering and education.
        </p>
      </div>
      <div className="contact-grid">
        <div className="contact-list">
          {contactChannels.map(([label, value, href]) => (
            <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </a>
          ))}
        </div>
        <img className="contact-owl" src="/owl-surprised.png" alt="" aria-hidden="true" />
      </div>
      <p className="quiet-note">Response window listed in the existing portfolio: usually within 24-48h.</p>
    </>
  );
}

function RubiksContent() {
  return (
    <section className="rubiks-poster" aria-label="Rubik's cube record">
      <div className="rubiks-poster-type" aria-hidden="true">
        <span>Rubik&apos;s cube</span>
        <span>Rubik&apos;s cube</span>
        <span>Rubik&apos;s cube</span>
      </div>

      <img className="rubiks-poster-cube" src="/cube.webp" alt="Rubik's cube" />

      <div className="rubiks-fastest">
        <span>Fastest Rubik&apos;s cube</span>
        <strong>12.43s</strong>
      </div>
    </section>
  );
}

function MinesweeperContent() {
  const [difficulty, setDifficulty] = useState<MinesweeperDifficulty>('easy');
  const config = minesweeperConfigs[difficulty];
  const [board, setBoard] = useState(() => createEmptyMinesweeperBoard(config));
  const [status, setStatus] = useState<MinesweeperStatus>('ready');

  const flags = board.filter((cell) => cell.flagged).length;
  const revealedSafeCells = board.filter((cell) => cell.revealed && !cell.mine).length;
  const totalSafeCells = board.length - config.mines;

  const resetGame = (nextDifficulty = difficulty) => {
    const nextConfig = minesweeperConfigs[nextDifficulty];
    setDifficulty(nextDifficulty);
    setBoard(createEmptyMinesweeperBoard(nextConfig));
    setStatus('ready');
  };

  const revealCell = (index: number) => {
    if (status === 'lost' || status === 'won') {
      return;
    }

    const liveBoard = status === 'ready' ? createMinesweeperBoard(config, index) : board;
    const cell = liveBoard[index];
    if (!cell || cell.revealed || cell.flagged) {
      return;
    }

    if (cell.mine) {
      setBoard((current) => current.map((item) => (item.mine ? { ...item, revealed: true } : item)));
      setStatus('lost');
      return;
    }

    const nextBoard = revealMinesweeperCell(liveBoard, index, config);
    const nextRevealedSafeCells = nextBoard.filter((item) => item.revealed && !item.mine).length;
    setBoard(nextBoard);
    setStatus(nextRevealedSafeCells === totalSafeCells ? 'won' : 'playing');
  };

  const toggleFlag = (index: number) => {
    if (status === 'lost' || status === 'won') {
      return;
    }

    setBoard((current) =>
      current.map((cell) => {
        if (cell.id !== index || cell.revealed) {
          return cell;
        }

        return { ...cell, flagged: !cell.flagged };
      }),
    );
    setStatus((current) => current);
  };

  return (
    <section className="minesweeper-panel" aria-label="Minesweeper game">
      <div className="minesweeper-header">
        <div>
          <p className="eyebrow">Random board / classic rules</p>
          <h2>Minesweeper</h2>
        </div>
        <button type="button" onClick={() => resetGame()}>
          New board
        </button>
      </div>

      <div className="mine-controls" aria-label="Difficulty">
        {(Object.keys(minesweeperConfigs) as MinesweeperDifficulty[]).map((key) => (
          <button
            type="button"
            className={difficulty === key ? 'active' : ''}
            onClick={() => resetGame(key)}
            key={key}
          >
            {minesweeperConfigs[key].label}
          </button>
        ))}
      </div>

      <div className="mine-status" aria-live="polite">
        <span>Mines {config.mines}</span>
        <span>Flags {flags}</span>
        <span>Open {revealedSafeCells}/{totalSafeCells}</span>
        <strong>{status === 'won' ? 'Cleared' : status === 'lost' ? 'Exploded' : 'Live'}</strong>
      </div>

      <div className={`mine-board-shell ${status === 'won' || status === 'lost' ? 'ended' : ''}`}>
        <div
          className="mine-board"
          style={{ '--mine-cols': config.cols } as CSSProperties}
          aria-label={`${config.label} Minesweeper board`}
        >
          {board.map((cell) => (
            <button
              type="button"
              className={[
                'mine-cell',
                cell.revealed ? 'revealed' : '',
                cell.flagged ? 'flagged' : '',
                cell.mine && cell.revealed ? 'mine' : '',
                cell.revealed && !cell.mine && cell.adjacent > 0 ? `n-${cell.adjacent}` : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => revealCell(cell.id)}
              onContextMenu={(event) => {
                event.preventDefault();
                toggleFlag(cell.id);
              }}
              aria-label={`Cell ${cell.id + 1}`}
              key={cell.id}
            >
              {cell.flagged && !cell.revealed ? (
                <img className="mine-flag" src="/ctf-flag.png" alt="Flagged" draggable={false} />
              ) : null}
              {cell.revealed && cell.mine ? (
                <img className="mine-owl" src="/owl.png" alt="Mine" draggable={false} />
              ) : null}
              {cell.revealed && !cell.mine && cell.adjacent > 0 ? cell.adjacent : null}
            </button>
          ))}
        </div>

        {status === 'won' || status === 'lost' ? (
          <div className={`mine-end-screen ${status}`} aria-live="assertive">
            <img src={status === 'won' ? '/ctf-flag.png' : '/owl.png'} alt="" aria-hidden="true" />
            <div>
              <span>{status === 'won' ? 'Board cleared' : 'Owl field triggered'}</span>
              <strong>{status === 'won' ? 'You won' : 'You lost'}</strong>
              <p>{status === 'won' ? 'Every safe tile is open.' : 'The mine owls have been revealed.'}</p>
              <button type="button" onClick={() => resetGame()}>
                New board
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <p className="mine-note">Left click to reveal. Right click to flag.</p>
    </section>
  );
}

function Twenty48Content() {
  const [board, setBoard] = useState(() => createTwenty48Board());
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<Twenty48Status>('playing');

  const resetGame = () => {
    setBoard(createTwenty48Board());
    setScore(0);
    setStatus('playing');
  };

  const move = (direction: Twenty48Direction) => {
    if (status !== 'playing') {
      return;
    }

    const result = moveTwenty48Board(board, direction);
    if (!result.changed) {
      return;
    }

    const nextBoard = addTwenty48Tile(result.board);
    setBoard(nextBoard);
    setScore((current) => current + result.score);

    if (nextBoard.includes(2048)) {
      setStatus('won');
      return;
    }

    if (!canMoveTwenty48(nextBoard)) {
      setStatus('lost');
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const keyMap: Partial<Record<string, Twenty48Direction>> = {
      ArrowUp: 'up',
      w: 'up',
      W: 'up',
      ArrowDown: 'down',
      s: 'down',
      S: 'down',
      ArrowLeft: 'left',
      a: 'left',
      A: 'left',
      ArrowRight: 'right',
      d: 'right',
      D: 'right',
    };
    const direction = keyMap[event.key];

    if (direction) {
      event.preventDefault();
      move(direction);
    }
  };

  return (
    <section className="twenty48-panel" aria-label="2048 game">
      <div className="twenty48-header">
        <div>
          <p className="eyebrow">Merge tiles / reach 2048</p>
          <h2>2048</h2>
        </div>
        <div className="twenty48-score">
          <span>Score</span>
          <strong>{score}</strong>
        </div>
      </div>

      <div className="twenty48-shell">
        <div className="twenty48-board" tabIndex={0} onKeyDown={handleKeyDown} aria-label="2048 board">
          {board.map((value, index) => (
            <span className={`twenty48-cell ${getTwenty48ClassName(value)}`} key={`${index}-${value}`}>
              {value || ''}
            </span>
          ))}
        </div>

        {status !== 'playing' ? (
          <div className={`twenty48-end ${status}`} aria-live="assertive">
            <strong>{status === 'won' ? '2048 reached' : 'No moves left'}</strong>
            <button type="button" onClick={resetGame}>
              New game
            </button>
          </div>
        ) : null}
      </div>

      <div className="twenty48-controls" aria-label="2048 controls">
        <button type="button" onClick={() => move('up')}>
          Up
        </button>
        <button type="button" onClick={() => move('left')}>
          Left
        </button>
        <button type="button" onClick={() => move('down')}>
          Down
        </button>
        <button type="button" onClick={() => move('right')}>
          Right
        </button>
      </div>

      <p className="game-note">Use arrow keys, WASD, or the buttons.</p>
    </section>
  );
}

function TypingTestContent() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState(() => typingPrompts[Math.floor(Math.random() * typingPrompts.length)]);
  const [value, setValue] = useState('');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const cursorIndex = Math.min(value.length, prompt.length);

  const stats = useMemo(() => {
    const correctCharacters = value.split('').filter((character, index) => character === prompt[index]).length;
    const elapsedMs = (finishedAt ?? Date.now()) - (startedAt ?? Date.now());
    const minutes = Math.max(elapsedMs / 60_000, 1 / 60);
    const wpm = Math.round(correctCharacters / 5 / minutes);
    const accuracy = value.length ? Math.round((correctCharacters / value.length) * 100) : 100;
    const progress = Math.min(Math.round((value.length / prompt.length) * 100), 100);

    return { accuracy, progress, wpm };
  }, [finishedAt, prompt, startedAt, value]);

  const resetTest = () => {
    setPrompt(typingPrompts[Math.floor(Math.random() * typingPrompts.length)]);
    setValue('');
    setStartedAt(null);
    setFinishedAt(null);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const updateValue = (nextValue: string) => {
    if (finishedAt) {
      return;
    }

    const normalizedValue = nextValue.replace(/\n/g, ' ').slice(0, prompt.length);

    if (!startedAt && normalizedValue.length) {
      setStartedAt(Date.now());
    }

    setValue(normalizedValue);

    if (normalizedValue === prompt) {
      setFinishedAt(Date.now());
    }
  };

  const renderTypingPrompt = () => {
    let characterIndex = 0;

    return prompt
      .split(/(\s+)/)
      .filter(Boolean)
      .map((token, tokenIndex) => {
        const tokenStart = characterIndex;
        characterIndex += token.length;

        return (
          <span className={/^\s+$/.test(token) ? 'typing-space-run' : 'typing-word'} key={`${token}-${tokenIndex}`}>
            {token.split('').map((character, offset) => {
              const index = tokenStart + offset;
              const typedCharacter = value[index];
              const state =
                typedCharacter === undefined ? 'pending' : typedCharacter === character ? 'correct' : 'wrong';

              return (
                <span className="typing-char-wrap" key={`${character}-${index}`}>
                  {index === cursorIndex ? <span className="typing-cursor" /> : null}
                  <span className={`typing-char ${state}`}>{character === ' ' ? '\u00A0' : character}</span>
                </span>
              );
            })}
          </span>
        );
      });
  };

  return (
    <section className="typing-panel" aria-label="Typing test">
      <div className="typing-header">
        <div>
          <p className="eyebrow">Accuracy / speed drill</p>
          <h2>Typing Test</h2>
        </div>
        <button type="button" onClick={resetTest}>
          New prompt
        </button>
      </div>

      <div
        className={`typing-console ${finishedAt ? 'complete' : ''}`}
        onClick={() => inputRef.current?.focus()}
        role="group"
        aria-label="Typing prompt"
      >
        <div className="typing-prompt" aria-hidden="true">
          {renderTypingPrompt()}
          {cursorIndex === prompt.length ? <span className="typing-cursor end" /> : null}
        </div>
        <textarea
          ref={inputRef}
          className="typing-capture"
          value={value}
          onChange={(event) => updateValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Tab') {
              event.preventDefault();
            }
          }}
          spellCheck={false}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          aria-label="Typing test input"
        />
      </div>

      <div className="typing-stats">
        <span>
          <strong>{stats.wpm}</strong>
          WPM
        </span>
        <span>
          <strong>{stats.accuracy}%</strong>
          Accuracy
        </span>
        <span>
          <strong>{stats.progress}%</strong>
          Done
        </span>
        <span className={finishedAt ? 'complete' : ''}>
          <strong>{finishedAt ? 'Clear' : 'Live'}</strong>
          Status
        </span>
      </div>
    </section>
  );
}

function GamesContent() {
  const [activeGame, setActiveGame] = useState<GameSlug | null>(null);

  if (activeGame) {
    return (
      <section className="games-panel game-running" aria-label={gameTitles[activeGame]}>
        <div className="games-toolbar">
          <button type="button" onClick={() => setActiveGame(null)}>
            Back to Games
          </button>
          <span>Games / {gameTitles[activeGame]}</span>
        </div>
        {activeGame === 'minesweeper' ? <MinesweeperContent /> : null}
        {activeGame === 'twenty48' ? <Twenty48Content /> : null}
        {activeGame === 'typing' ? <TypingTestContent /> : null}
      </section>
    );
  }

  return (
    <section className="games-panel" aria-label="Games folder">
      <div className="games-heading">
        <div>
          <p className="eyebrow">Finder / playable files</p>
          <h2>Games</h2>
        </div>
        <span>3 games installed</span>
      </div>

      <div className="games-finder">
        <div className="games-sidebar" aria-hidden="true">
          <span className="active">Installed</span>
          <span>Favorites</span>
          <span>Archive</span>
        </div>

        <div className="games-library-wrap">
          <div className="games-library">
            {games.map((game) => {
              const Icon = game.icon;

              return (
                <button type="button" className="game-tile" onClick={() => setActiveGame(game.slug)} key={game.slug}>
                  <span className={`game-icon tone-${game.tone}`}>
                    <Icon size={26} strokeWidth={2.4} />
                  </span>
                  <strong>{game.title}</strong>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function BackgroundPickerWindow({
  selected,
  onSelect,
  onClose,
  position,
  onDragStart,
}: {
  selected: WallpaperSlug;
  onSelect: (wallpaper: WallpaperSlug) => void;
  onClose: () => void;
  position: Point;
  onDragStart: (event: PointerEvent<HTMLElement>, target: 'backgroundPicker') => void;
}) {
  return (
    <section
      className="background-picker-window"
      style={{ left: position.x, top: position.y }}
      aria-label="Change background"
    >
      <div className="background-picker-titlebar" onPointerDown={(event) => onDragStart(event, 'backgroundPicker')}>
        <div className="window-lights">
          <button
            type="button"
            className="light red"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={onClose}
            aria-label="Close backgrounds"
          />
          <span className="light yellow" aria-hidden="true" />
          <span className="light green" aria-hidden="true" />
        </div>
        <div className="window-path">
          <Archive size={15} strokeWidth={2.5} />
          <span>Users / Backgrounds</span>
        </div>
      </div>

      <div className="background-picker-content">
        <div className="wallpaper-grid">
          {desktopWallpapers.map((wallpaper) => (
            <button
              type="button"
              className={selected === wallpaper.slug ? 'active' : ''}
              onClick={() => onSelect(wallpaper.slug)}
              key={wallpaper.slug}
              aria-label={`Use ${wallpaper.label} background`}
            >
              <img src={wallpaper.src} alt="" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveContent() {
  return (
    <section className="archive-panel" aria-label="Archived neobrutalist version">
      <div className="archive-heading">
        <div>
          <p className="eyebrow">Archive / previous build</p>
          <h2>Neobrutalism Version</h2>
        </div>
        <a href="/archive/neobrutalismversion/index.html" target="_blank" rel="noreferrer">
          Open full archive
        </a>
      </div>

      <div className="archive-frame-shell">
        <iframe
          src="/archive/neobrutalismversion/index.html"
          title="Archived neobrutalist portfolio version"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function DesktopWindow({
  file,
  icon: Icon,
  tone,
  onClose,
}: {
  file: FileEntry;
  icon: LucideIcon;
  tone: string;
  onClose: () => void;
}) {
  const title = windowTitles[file.slug];

  return (
    <section
      className={`finder-window desktop-window tone-${tone} file-${file.slug}`}
      aria-label={`${title} window`}
    >
      <div className="window-titlebar">
        <div className="window-lights">
          <button type="button" className="light red" onClick={onClose} aria-label={`Close ${title} window`} />
          <span className="light yellow" aria-hidden="true" />
          <span className="light green" aria-hidden="true" />
        </div>
        <div className="window-path">
          <Icon size={15} strokeWidth={2.5} />
          <span>Users / {title}</span>
        </div>
      </div>

      <div className="window-content">
        {file.slug === 'about' ? <AboutContent /> : null}
        {file.slug === 'projects' ? <ProjectsContent /> : null}
        {file.slug === 'speaking' ? <SpeakingContent /> : null}
        {file.slug === 'mentor' ? <MentorContent /> : null}
        {file.slug === 'contact' ? <ContactContent /> : null}
        {file.slug === 'rubiks' ? <RubiksContent /> : null}
        {file.slug === 'games' ? <GamesContent /> : null}
        {file.slug === 'archive' ? <ArchiveContent /> : null}
      </div>
    </section>
  );
}

function SecretTerminal({
  lines,
  value,
  position,
  onChange,
  onAutocomplete,
  onSubmit,
  onClose,
  onDragStart,
}: {
  lines: TerminalLine[];
  value: string;
  position: Point;
  onChange: (value: string) => void;
  onAutocomplete: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  onDragStart: (event: PointerEvent<HTMLElement>, target: 'terminal') => void;
}) {
  return (
    <section className="secret-terminal" style={{ left: position.x, top: position.y }} aria-label="NQ hidden terminal">
      <div className="terminal-titlebar" onPointerDown={(event) => onDragStart(event, 'terminal')}>
        <div>
          <Terminal size={15} strokeWidth={2.5} />
          <span>vault.sh</span>
        </div>
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onClose}
          aria-label="Close terminal"
        >
          <X size={15} strokeWidth={2.5} />
        </button>
      </div>
      <div className="terminal-screen">
        {lines.map((line, index) => (
          <p className={`terminal-line ${line.kind}`} key={`${line.kind}-${line.text}-${index}`}>
            {line.kind === 'input' ? <span className="terminal-prompt">nq$</span> : null}
            <span>{line.text}</span>
          </p>
        ))}
        <form className="terminal-form" onSubmit={onSubmit}>
          <span className="terminal-prompt">nq$</span>
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event: ReactKeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Tab') {
                event.preventDefault();
                onAutocomplete();
              }
            }}
            autoFocus
            aria-label="Terminal command"
            spellCheck={false}
          />
        </form>
      </div>
    </section>
  );
}

function SecretCalculator({
  value,
  unlocked,
  position,
  onChange,
  onPress,
  onClose,
  onDragStart,
}: {
  value: string;
  unlocked: boolean;
  position: Point;
  onChange: (value: string) => void;
  onPress: (value: string) => void;
  onClose: () => void;
  onDragStart: (event: PointerEvent<HTMLElement>, target: 'calculator') => void;
}) {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '='];

  return (
    <section className={`secret-calculator ${unlocked ? 'unlocked' : ''}`} style={{ left: position.x, top: position.y }} aria-label="Vault calculator">
      <div className="calculator-titlebar" onPointerDown={(event) => onDragStart(event, 'calculator')}>
        <div>
          <Calculator size={15} strokeWidth={2.5} />
          <span>vault.calc</span>
        </div>
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onClose}
          aria-label="Close calculator"
        >
          <X size={15} strokeWidth={2.5} />
        </button>
      </div>
      <div className="calculator-display" aria-live="polite">
        {unlocked ? 'VAULT OPEN' : value || '0'}
      </div>
      <div className="calculator-grid">
        {keys.map((key) => (
          <button
            type="button"
            onClick={() => onPress(key)}
            key={key}
          >
            {key}
          </button>
        ))}
        <button type="button" className="wide" onClick={() => onChange('')}>
          clear
        </button>
      </div>
    </section>
  );
}

export function NeobrutalistHub() {
  const time = useClock();
  const stageRef = useRef<HTMLElement | null>(null);
  const suppressClickRef = useRef(false);
  const typedSequenceRef = useRef('');
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [overlayDragState, setOverlayDragState] = useState<OverlayDragState | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>(terminalIntro);
  const [terminalUnlocked, setTerminalUnlocked] = useState(false);
  const [flagCaptured, setFlagCaptured] = useState(false);
  const [terminalPosition, setTerminalPosition] = useState<Point>(getInitialTerminalPosition);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('');
  const [calculatorPosition, setCalculatorPosition] = useState<Point>(getInitialCalculatorPosition);
  const [owlNoteOpen, setOwlNoteOpen] = useState(false);
  const [owlNotePosition, setOwlNotePosition] = useState<Point>(getInitialNotePosition);
  const [archiveMenuOpen, setArchiveMenuOpen] = useState(false);
  const [nqMenuOpen, setNqMenuOpen] = useState(false);
  const [backgroundPickerOpen, setBackgroundPickerOpen] = useState(false);
  const [backgroundPickerPosition, setBackgroundPickerPosition] = useState<Point>(getInitialBackgroundPickerPosition);
  const [selectedWallpaper, setSelectedWallpaper] = useState<WallpaperSlug>(getInitialWallpaper);
  const [isMainWindowOpen, setIsMainWindowOpen] = useState(true);
  const [contextMenu, setContextMenu] = useState<DesktopContextMenuState | null>(null);
  const [folderPositions, setFolderPositions] = useState<Record<FileSlug, Point>>(getDefaultFolderPositions);
  const [activeSlug, setActiveSlug] = useState<FileSlug>('about');

  const filesBySlug = useMemo(
    () => Object.fromEntries(FILES.map((file) => [file.slug, file])) as Record<FileSlug, FileEntry>,
    [],
  );
  const desktopFiles = useMemo(() => FILES.filter((file) => file.slug !== 'archive'), []);
  const activeWallpaper = desktopWallpapers.find((wallpaper) => wallpaper.slug === selectedWallpaper) ?? desktopWallpapers[0];

  const openFile = (file: FileEntry) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    setContextMenu(null);
    setActiveSlug(file.slug);
    setIsMainWindowOpen(true);

    if (isCompactLayout()) {
      const resetScroll = () => {
        document.querySelector('.hub-page')?.scrollTo({ top: 0, behavior: 'auto' });
        document.scrollingElement?.scrollTo({ top: 0, behavior: 'auto' });
      };

      window.requestAnimationFrame(resetScroll);
      window.setTimeout(resetScroll, 80);
    }
  };

  const selectWallpaper = (wallpaper: WallpaperSlug) => {
    setContextMenu(null);
    setSelectedWallpaper(wallpaper);
    window.localStorage.setItem('nq-wallpaper', wallpaper);
  };

  const arrangeFoldersByName = () => {
    const sortedFiles = [...desktopFiles].sort((left, right) => left.label.localeCompare(right.label));
    setFolderPositions(createSortedFolderPositions(sortedFiles));
    setContextMenu(null);
  };

  const arrangeFoldersByKind = () => {
    const kindOrder: Record<string, number> = {
      blue: 1,
      yellow: 2,
      orange: 3,
      green: 4,
      black: 5,
      pink: 6,
    };
    const sortedFiles = [...desktopFiles].sort((left, right) => {
      const leftTone = folderMeta[left.slug].tone;
      const rightTone = folderMeta[right.slug].tone;
      return kindOrder[leftTone] - kindOrder[rightTone] || left.label.localeCompare(right.label);
    });
    setFolderPositions(createSortedFolderPositions(sortedFiles));
    setContextMenu(null);
  };

  const resetFolderLayout = () => {
    setFolderPositions(getDefaultFolderPositions());
    setContextMenu(null);
  };

  const openDesktopContextMenu = (event: ReactMouseEvent<HTMLElement>) => {
    if (isCompactLayout()) {
      return;
    }

    event.preventDefault();
    const bounds = stageRef.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }

    setArchiveMenuOpen(false);
    setNqMenuOpen(false);
    setContextMenu({
      x: clamp(event.clientX - bounds.left, 12, bounds.width - 230),
      y: clamp(event.clientY - bounds.top, 12, bounds.height - 220),
    });
  };

  const runTerminalCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rawCommand = terminalInput.trim();
    const command = rawCommand.toLowerCase();

    if (!rawCommand) {
      return;
    }

    if (command === 'clear') {
      setTerminalLines(terminalIntro);
      setTerminalInput('');
      return;
    }

    let response: string[];

    if (command === 'help') {
      response = ['Goal: recover flag.txt.', 'Use `cat vault.calc` to open the vault calculator.'];
    } else if (command === 'ls') {
      response = ['README.md  hint.txt  vault.lock  flag.txt  vault.calc'];
    } else if (command === 'calc' || command === 'open calculator' || command === 'cat vault.calc') {
      setCalculatorOpen(true);
      response = ['vault.calc opened.'];
    } else if (command === 'cat readme.md') {
      response = ['One lock protects the flag. A small calculator is wired to the vault.'];
    } else if (command === 'cat hint.txt') {
      response = ['Find the fastest Rubik\'s cube time.', 'Open vault.calc, enter that number, then press =.'];
    } else if (command === 'cat vault.lock') {
      response = [terminalUnlocked ? 'vault.lock: open' : 'vault.lock: locked'];
    } else if (command === 'cat flag.txt') {
      if (terminalUnlocked) {
        setFlagCaptured(true);
        response = ['FLAG{patterns_ship_systems}', 'capture complete. desktop badge unlocked.'];
      } else {
        response = ['flag.txt: permission denied. Unlock the vault first.'];
      }
    } else if (command.startsWith('unlock ')) {
      response = ['vault rejects terminal input. Use vault.calc.'];
    } else {
      response = [`Command not found: ${rawCommand}. Type \`help\`.`];
    }

    setTerminalLines((current) => [
      ...current,
      { kind: 'input', text: rawCommand },
      ...response.map((text) => ({ kind: 'output' as const, text })),
    ]);
    setTerminalInput('');
  };

  const pressCalculatorKey = (key: string) => {
    if (key === '=') {
      if (calculatorValue === '12.43') {
        setTerminalUnlocked(true);
        setCalculatorValue('');
        setTerminalLines((current) => [
          ...current,
          { kind: 'system', text: 'vault.calc accepted 12.43.' },
          { kind: 'output', text: 'vault.lock: open. Run `cat flag.txt`.' },
        ]);
      } else {
        setCalculatorValue('ERR');
      }
      return;
    }

    setCalculatorValue((current) => {
      const normalized = current === 'ERR' ? '' : current;
      if (key === '.' && normalized.includes('.')) {
        return normalized;
      }

      return `${normalized}${key}`.slice(0, 8);
    });
  };

  const startOverlayDrag = (event: PointerEvent<HTMLElement>, target: OverlayDragState['target']) => {
    if (isCompactLayout()) {
      return;
    }

    const selector =
      target === 'terminal'
        ? '.secret-terminal'
        : target === 'calculator'
          ? '.secret-calculator'
          : target === 'backgroundPicker'
            ? '.background-picker-window'
            : '.owl-note';
    const element = event.currentTarget.closest(selector);
    const rect = element?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setOverlayDragState({
      target,
      startX: event.clientX,
      startY: event.clientY,
      origin:
        target === 'terminal'
          ? terminalPosition
          : target === 'calculator'
            ? calculatorPosition
            : target === 'backgroundPicker'
              ? backgroundPickerPosition
              : owlNotePosition,
      width: rect.width,
      height: rect.height,
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setTerminalOpen(true);
        setOwlNoteOpen(false);
        return;
      }

      if (isTypingTarget || event.metaKey || event.ctrlKey || event.altKey || event.key.length !== 1) {
        return;
      }

      typedSequenceRef.current = `${typedSequenceRef.current}${event.key.toLowerCase()}`.slice(-2);
      if (typedSequenceRef.current === 'nq') {
        setTerminalOpen(true);
        setOwlNoteOpen(false);
        typedSequenceRef.current = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!contextMenu) {
      return undefined;
    }

    const closeMenu = () => setContextMenu(null);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('pointerdown', closeMenu);
    window.addEventListener('resize', closeMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', closeMenu);
      window.removeEventListener('resize', closeMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contextMenu]);

  useEffect(() => {
    if (!overlayDragState) {
      return undefined;
    }

    const handleMove = (event: globalThis.PointerEvent) => {
      const x = clamp(
        overlayDragState.origin.x + event.clientX - overlayDragState.startX,
        8,
        window.innerWidth - overlayDragState.width - 8,
      );
      const y = clamp(
        overlayDragState.origin.y + event.clientY - overlayDragState.startY,
        42,
        window.innerHeight - overlayDragState.height - 8,
      );

      if (overlayDragState.target === 'terminal') {
        setTerminalPosition({ x, y });
      } else if (overlayDragState.target === 'calculator') {
        setCalculatorPosition({ x, y });
      } else if (overlayDragState.target === 'backgroundPicker') {
        setBackgroundPickerPosition({ x, y });
      } else {
        setOwlNotePosition({ x, y });
      }
    };

    const handleUp = () => setOverlayDragState(null);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp, { once: true });

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [overlayDragState]);

  const startFolderDrag = (event: PointerEvent<HTMLButtonElement>, slug: FileSlug) => {
    if (isCompactLayout()) {
      return;
    }

    const bounds = stageRef.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      slug,
      startX: event.clientX,
      startY: event.clientY,
      origin: folderPositions[slug],
      moved: false,
      bounds,
    });
  };

  useEffect(() => {
    if (!dragState) {
      return undefined;
    }

    const handleMove = (event: globalThis.PointerEvent) => {
      const dx = event.clientX - dragState.startX;
      const dy = event.clientY - dragState.startY;
      const moved = dragState.moved || Math.abs(dx) > 4 || Math.abs(dy) > 4;

      const x = clamp(dragState.origin.x + (dx / dragState.bounds.width) * 100, 4, 96);
      const y = clamp(dragState.origin.y + (dy / dragState.bounds.height) * 100, 11, 88);
      setFolderPositions((current) => ({ ...current, [dragState.slug]: { x, y } }));

      setDragState({ ...dragState, moved });
    };

    const handleUp = () => {
      if (dragState.moved) {
        suppressClickRef.current = true;
      }
      setDragState(null);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp, { once: true });

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [dragState]);

  return (
    <div className="hub-page">
      <div
        className={`desktop-wallpaper wallpaper-${selectedWallpaper}`}
        style={{ '--wallpaper-image': `url("${activeWallpaper.src}")` } as CSSProperties}
        aria-hidden="true"
      />

      {owlNoteOpen ? (
        <aside className="owl-note" style={{ left: owlNotePosition.x, top: owlNotePosition.y }} aria-label="Owl note">
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setOwlNoteOpen(false)}
            aria-label="Close owl note"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
          <span
            className="owl-note-handle"
            onPointerDown={(event) => startOverlayDrag(event, 'note')}
            aria-label="Move note"
          />
          <p>Open terminal with Command K. Try help.</p>
        </aside>
      ) : null}

      {terminalOpen ? (
        <SecretTerminal
          lines={terminalLines}
          value={terminalInput}
          position={terminalPosition}
          onChange={setTerminalInput}
          onAutocomplete={() => setTerminalInput((current) => getTerminalCompletion(current))}
          onSubmit={runTerminalCommand}
          onClose={() => setTerminalOpen(false)}
          onDragStart={startOverlayDrag}
        />
      ) : null}

      {calculatorOpen ? (
        <SecretCalculator
          value={calculatorValue}
          unlocked={terminalUnlocked}
          position={calculatorPosition}
          onChange={setCalculatorValue}
          onPress={pressCalculatorKey}
          onClose={() => setCalculatorOpen(false)}
          onDragStart={startOverlayDrag}
        />
      ) : null}

      {flagCaptured ? (
        <aside className="ctf-badge" aria-label="CTF complete">
          <img src="/ctf-flag.png" alt="" aria-hidden="true" />
          <div>
            <span>CTF CAPTURED</span>
            <strong>{'FLAG{patterns_ship_systems}'}</strong>
          </div>
        </aside>
      ) : null}

      <header className="mac-menu">
        <div className="menu-cluster">
          <div className="nq-menu-wrap">
            <button
              type="button"
              className="menu-brand-button"
              onClick={() => {
                setNqMenuOpen((current) => !current);
                setArchiveMenuOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={nqMenuOpen}
            >
              NQ
            </button>
            {nqMenuOpen ? (
              <div className="nq-menu-popover" role="menu" aria-label="NQ menu">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setBackgroundPickerOpen(true);
                    setNqMenuOpen(false);
                  }}
                >
                  <strong>Change Background</strong>
                  <span>{activeWallpaper.label}</span>
                </button>
              </div>
            ) : null}
          </div>
          <span>Folders</span>
          <span>Arrange</span>
          <div className="archive-menu-wrap">
            <button
              type="button"
              className="menu-word-button"
              onClick={() => {
                setArchiveMenuOpen((current) => !current);
                setNqMenuOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={archiveMenuOpen}
            >
              Archive
            </button>
            {archiveMenuOpen ? (
              <div className="archive-menu-popover" role="menu" aria-label="Archive versions">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setActiveSlug('about');
                    setIsMainWindowOpen(true);
                    setArchiveMenuOpen(false);
                  }}
                >
                  <strong>Version 2.0</strong>
                  <span>Current NQ desktop</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    window.location.href = '/archive/neobrutalismversion/index.html';
                  }}
                >
                  <strong>Version 1.0</strong>
                  <span>Neobrutalism Version</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="menu-cluster right">
          <Search size={15} strokeWidth={2.4} />
          <Wifi size={15} strokeWidth={2.4} />
          <BatteryFull size={16} strokeWidth={2.4} />
          <span>{time}</span>
        </div>
      </header>

      <main
        ref={stageRef}
        className="desktop-stage"
        onContextMenu={openDesktopContextMenu}
        aria-label="Noora Qasim desktop portfolio"
      >
        {contextMenu ? (
          <div
            className="desktop-context-menu"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onPointerDown={(event) => event.stopPropagation()}
            onContextMenu={(event) => event.preventDefault()}
            role="menu"
            aria-label="Desktop actions"
          >
            <button type="button" role="menuitem" onClick={arrangeFoldersByName}>
              Sort by Name
            </button>
            <button type="button" role="menuitem" onClick={arrangeFoldersByKind}>
              Sort by Folder Type
            </button>
            <button type="button" role="menuitem" onClick={resetFolderLayout}>
              Reset Layout
            </button>
            <span aria-hidden="true" />
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsMainWindowOpen((current) => !current);
                setContextMenu(null);
              }}
            >
              {isMainWindowOpen ? 'Close Main Tab' : 'Reopen Main Tab'}
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setBackgroundPickerOpen(true);
                setContextMenu(null);
              }}
            >
              Change Background
            </button>
          </div>
        ) : null}

        {backgroundPickerOpen ? (
          <BackgroundPickerWindow
            selected={selectedWallpaper}
            onSelect={selectWallpaper}
            onClose={() => setBackgroundPickerOpen(false)}
            position={backgroundPickerPosition}
            onDragStart={startOverlayDrag}
          />
        ) : null}

        <button
          className="desktop-owl"
          type="button"
          onDoubleClick={() => setOwlNoteOpen(true)}
          aria-label="Double click desk owl"
        >
          <img src="/owl-sitting.png" alt="" />
        </button>

        {desktopFiles.map((file) => {
          const meta = folderMeta[file.slug];
          return (
            <DesktopFolder
              key={file.slug}
              file={file}
              icon={meta.icon}
              position={folderPositions[file.slug]}
              tone={meta.tone}
              onOpen={openFile}
              onDragStart={startFolderDrag}
            />
          );
        })}

        {isMainWindowOpen ? (
          <DesktopWindow
            file={filesBySlug[activeSlug]}
            icon={folderMeta[activeSlug].icon}
            tone={folderMeta[activeSlug].tone}
            onClose={() => setIsMainWindowOpen(false)}
          />
        ) : null}
      </main>
    </div>
  );
}
