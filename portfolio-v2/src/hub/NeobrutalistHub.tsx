import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent,
} from 'react';
import {
  BatteryFull,
  BookOpenText,
  Bomb,
  BriefcaseBusiness,
  Calculator,
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
  target: 'terminal' | 'note' | 'calculator';
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
  minesweeper: { icon: Bomb, x: 10, y: 71, tone: 'green' },
};

const windowTitles: Record<FileSlug, string> = {
  about: 'Noora Qasim',
  projects: 'Projects',
  speaking: 'Speaking',
  mentor: 'Mentor',
  contact: 'Contact',
  rubiks: 'Rubik\'s',
  minesweeper: 'Minesweeper',
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

function WindowTrafficLights() {
  return (
    <div className="window-lights" aria-hidden="true">
      <span className="light red" />
      <span className="light yellow" />
      <span className="light green" />
    </div>
  );
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
        <Icon size={28} strokeWidth={2.35} />
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

function DesktopWindow({
  file,
  icon: Icon,
  tone,
}: {
  file: FileEntry;
  icon: LucideIcon;
  tone: string;
}) {
  const title = windowTitles[file.slug];

  return (
    <section
      className={`finder-window desktop-window tone-${tone} file-${file.slug}`}
      aria-label={`${title} window`}
    >
      <div className="window-titlebar">
        <WindowTrafficLights />
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
        {file.slug === 'minesweeper' ? <MinesweeperContent /> : null}
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
  const [folderPositions, setFolderPositions] = useState<Record<FileSlug, Point>>(() => {
    return Object.fromEntries(
      FILES.map((file) => [file.slug, { x: folderMeta[file.slug].x, y: folderMeta[file.slug].y }]),
    ) as Record<FileSlug, Point>;
  });
  const [activeSlug, setActiveSlug] = useState<FileSlug>('about');

  const filesBySlug = useMemo(
    () => Object.fromEntries(FILES.map((file) => [file.slug, file])) as Record<FileSlug, FileEntry>,
    [],
  );

  const openFile = (file: FileEntry) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    setActiveSlug(file.slug);

    if (isCompactLayout()) {
      const resetScroll = () => {
        document.querySelector('.hub-page')?.scrollTo({ top: 0, behavior: 'auto' });
        document.scrollingElement?.scrollTo({ top: 0, behavior: 'auto' });
      };

      window.requestAnimationFrame(resetScroll);
      window.setTimeout(resetScroll, 80);
    }
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

  const startOverlayDrag = (event: PointerEvent<HTMLElement>, target: 'terminal' | 'note' | 'calculator') => {
    if (isCompactLayout()) {
      return;
    }

    const selector =
      target === 'terminal' ? '.secret-terminal' : target === 'calculator' ? '.secret-calculator' : '.owl-note';
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
      origin: target === 'terminal' ? terminalPosition : target === 'calculator' ? calculatorPosition : owlNotePosition,
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
      <div className="desktop-wallpaper" aria-hidden="true" />

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
          <strong>NQ</strong>
          <span>Folders</span>
          <span>Arrange</span>
        </div>
        <div className="menu-cluster right">
          <Search size={15} strokeWidth={2.4} />
          <Wifi size={15} strokeWidth={2.4} />
          <BatteryFull size={16} strokeWidth={2.4} />
          <span>{time}</span>
        </div>
      </header>

      <main ref={stageRef} className="desktop-stage" aria-label="Noora Qasim desktop portfolio">
        <button
          className="desktop-owl"
          type="button"
          onDoubleClick={() => setOwlNoteOpen(true)}
          aria-label="Double click desk owl"
        >
          <img src="/owl-sitting.png" alt="" />
        </button>

        {FILES.map((file) => {
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

        <DesktopWindow
          file={filesBySlug[activeSlug]}
          icon={folderMeta[activeSlug].icon}
          tone={folderMeta[activeSlug].tone}
        />
      </main>
    </div>
  );
}
