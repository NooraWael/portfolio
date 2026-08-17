# THE NOORA FILES
## R3F Walkthrough Portfolio — Build Plan

**Aesthetic direction:** photoreal 3D noir rooms as the stage, neobrutalist 2D overlays as the UI. You walk through real spaces (interrogation room, police lineup, witness stand) rendered in WebGL, while case file numbers, badges, tags, and transition overlays pop in loud flat colors with thick black borders. Cinematic set + video game HUD. This document is the full architecture and component-by-component breakdown for Claude Code or Cursor to implement against your existing `portfolio/` Vite + React codebase.

---

## 1 — Core Concept

### The narrative spine

The visitor is a detective walking through a case file. Every page is a room in a noir police procedural. The 3D renders the environment; the neobrutalist HUD renders the metadata (who, what, which file number, how to navigate).

### The hub

A single establishing scene: the detective's office at 2am. The corkboard is on the wall but evidence pieces are now **physical doors**. Click "PROJECTS" → camera dollies toward that evidence → crossfade → you arrive in the police lineup room. Every section is its own physical space, connected through the hub.

### Why this works as a portfolio

- Mobile dev is spatial work (layouts, screens, flows) — a 3D walkthrough proves you think spatially
- React Three Fiber on the CV is a differentiator — most "creative" portfolios use Framer motion demos
- The consistent narrative (case files, evidence, interrogations) ties disparate content (projects, speaking, mentoring) together in a way a generic portfolio doesn't

### The five rooms

| Room | File # | Content |
|------|--------|---------|
| Office (Hub) | — | Establishing scene, corkboard with interactive evidence |
| Interrogation room | 01 | About / bio / education / experience |
| Police lineup | 02 | Projects as "suspects" at height chart |
| Witness stand | 03 | Speaking engagements as testimony |
| Classroom | 04 | Tech mentoring (chalkboard with curriculum) |
| Phone booth | 05 | Contact info as dispatch radio / rolodex |
| Evidence locker | 06 | Rubik's cube on pedestal (unusual talents) |

---

## 2 — Tech Stack (what to add to your existing setup)

Your existing `package.json` already has:
- `@react-three/fiber ^8.17.12`
- `@react-three/drei ^9.121.2`
- `three ^0.172.0`
- `gsap ^3.12.7`, `@gsap/react ^2.1.2`
- `framer-motion ^11.18.1`
- `react-router-dom ^7.1.3`

**Add:**
- `leva` — dev-time debug panel for tweaking lights/camera positions during dev
- `@react-three/postprocessing` — bloom, chromatic aberration, film grain, depth of field
- `three-stdlib` (already a transitive dep via drei) — confirm for loaders

**Install command:**
```bash
npm install leva @react-three/postprocessing
```

**Do not add:**
- `@react-three/rapier` (physics) — overkill, no benefit here
- `@react-three/xr` — no VR/AR need
- Any model management SDKs — static glb files via drei's `useGLTF` is enough

### Assets strategy

All 3D models as `.glb` files in `/public/models/`. Sources:
- **Free**: Sketchfab CC-BY models, Poly Pizza, Quaternius, Kenney.nl
- **Paid/quality**: CGTrader noir/interrogation room packs ($5-30)
- **Custom**: Blender → export glb (if a particular piece is missing)

All textures as webp in `/public/textures/` where possible, fallback to jpg.

---

## 3 — File Structure

Here's the complete restructure of your existing `portfolio/src/`:

```
portfolio/
├── public/
│   ├── models/                         # GLB files
│   │   ├── office-hub.glb
│   │   ├── interrogation-room.glb
│   │   ├── lineup-room.glb
│   │   ├── witness-stand.glb
│   │   ├── classroom.glb
│   │   ├── phone-booth.glb
│   │   ├── evidence-locker.glb
│   │   └── props/
│   │       ├── rubiks-cube.glb
│   │       ├── case-folder.glb
│   │       ├── desk-lamp.glb
│   │       └── phone.glb
│   ├── textures/
│   │   ├── wall-plaster.webp
│   │   ├── wood-floor.webp
│   │   ├── cork.webp
│   │   ├── paper-normal.webp
│   │   └── environment.hdr            # for PBR lighting
│   ├── images/
│   │   ├── noora.jpg                  # Your portrait
│   │   ├── project-foremarket.jpg
│   │   └── ...
│   └── fonts/                         # optional self-hosted neobrutalism fonts
│
├── src/
│   ├── App.tsx                        # Router + transition manager
│   ├── main.tsx                       # Entry (unchanged)
│   ├── index.css                      # Global neobrutalism tokens + reset
│   │
│   ├── constants/
│   │   ├── tokens.ts                  # Colors, shadows, spacing, fonts
│   │   ├── files.ts                   # FILE registry (all 7 files + metadata)
│   │   └── projects.ts                # Your 6 projects data (migrated)
│   │
│   ├── hooks/
│   │   ├── useTransition.ts           # Camera fly-through between rooms
│   │   ├── useCursor.ts               # Custom cursor (flashlight in 3D)
│   │   └── useAudio.ts                # Ambient sound manager
│   │
│   ├── scenes/                        # One folder per room
│   │   ├── OfficeHub/
│   │   │   ├── index.tsx              # Scene entry, camera, lighting
│   │   │   ├── Room.tsx               # Static geometry (walls, floor, desk)
│   │   │   ├── Corkboard.tsx          # Interactive board + pins + yarn
│   │   │   ├── EvidenceItem.tsx       # Single evidence (door to other room)
│   │   │   ├── DeskProps.tsx          # Cigarette, mug, lamp, phone (decorative)
│   │   │   └── hub.config.ts          # Camera path + hotspot positions
│   │   ├── Interrogation/
│   │   │   ├── index.tsx
│   │   │   ├── Room.tsx
│   │   │   ├── BioTable.tsx           # Interactive documents on the table
│   │   │   └── SpotlightRig.tsx       # Dramatic single-light setup
│   │   ├── Lineup/
│   │   │   ├── index.tsx
│   │   │   ├── Room.tsx               # Height chart wall, floor tape
│   │   │   ├── Suspect.tsx            # Single "suspect" (a project)
│   │   │   └── NumberCard.tsx         # The card each suspect holds
│   │   ├── WitnessStand/
│   │   │   ├── index.tsx
│   │   │   ├── Room.tsx               # Courtroom bench, flag, gallery
│   │   │   └── TestimonyCard.tsx      # Speaking engagement card
│   │   ├── Classroom/
│   │   │   ├── index.tsx
│   │   │   ├── Room.tsx
│   │   │   └── Chalkboard.tsx         # Writable curriculum
│   │   ├── PhoneBooth/
│   │   │   ├── index.tsx
│   │   │   ├── Room.tsx               # Old booth or dispatch desk
│   │   │   └── Rolodex.tsx            # Spinnable contact card stack
│   │   └── EvidenceLocker/
│   │       ├── index.tsx
│   │       ├── Room.tsx
│   │       └── Pedestal.tsx           # Cube on pedestal under one light
│   │
│   ├── hud/                            # 2D neobrutalist overlays
│   │   ├── CaseHeader.tsx              # Top: FILE 02 / EXHIBIT A badge
│   │   ├── BackToHub.tsx               # "✕ CLOSE FILE" button
│   │   ├── Marquee.tsx                 # Scrolling top strip
│   │   ├── StatusBar.tsx               # Bottom strip
│   │   ├── TransitionOverlay.tsx       # Black wipe between scenes
│   │   ├── EvidenceLabel.tsx           # 2D tag that hovers over a 3D object
│   │   ├── CaseFileModal.tsx           # The file-opens-here modal (current v6 style)
│   │   ├── StickerBadge.tsx            # The rotated ★ NEW CASE stickers
│   │   └── Cursor.tsx                  # Custom crosshair / flashlight cursor
│   │
│   ├── components/
│   │   ├── shared/
│   │   │   ├── CameraRig.tsx           # Reusable camera + controls
│   │   │   ├── LoadingScreen.tsx       # Neobrutalist loading state
│   │   │   ├── PostProcessing.tsx      # Bloom + grain + vignette stack
│   │   │   └── SceneBoundary.tsx       # Error boundary for 3D
│   │   └── 3d/
│   │       ├── InteractiveObject.tsx   # Base hoverable 3D object with HUD label
│   │       ├── AmbientDust.tsx         # Floating dust particles
│   │       └── CigSmoke.tsx            # Shader-based smoke trail
│   │
│   └── lib/
│       ├── store.ts                    # Zustand: current scene, audio state, settings
│       └── transitions.ts              # GSAP timeline presets
│
├── package.json
└── vite.config.ts
```

### Key architectural decisions

**One Canvas, swappable scenes.** There is a single `<Canvas>` mounted at the root of `App.tsx`. Scene components are swapped based on route. This avoids rebuilding the WebGL context on every navigation and enables seamless cross-scene camera transitions.

**Scenes live in `/scenes/` not `/pages/`.** Your current codebase calls them "sections" (`Hero.tsx`, `About.tsx`). This convention signals: these are 3D scenes, not 2D pages.

**HUD is in `/hud/`, cleanly separated.** Everything neobrutalist and 2D lives here. This folder defines "the show" visually — colors, badges, transitions. It can be themed independently of the 3D work.

**`files.ts` is the single source of truth for section metadata.** Every scene pulls its title, case number, colors, transition duration from here. One edit updates everywhere.

---

## 4 — Component Breakdown (details that matter)

### 4.1 `src/constants/tokens.ts`

Copy your v6 CSS variables into a TS object. Import from there everywhere for consistency.

```ts
export const tokens = {
  colors: {
    bg: '#fff3d4',
    ink: '#0a0a0a',
    accentRed: '#e63946',
    accentBlue: '#4361ee',
    accentYellow: '#ffd60a',
    accentGreen: '#06a77d',
    accentPink: '#ff6bb5',
  },
  shadows: {
    sm: '4px 4px 0 #0a0a0a',
    md: '8px 8px 0 #0a0a0a',
    lg: '12px 12px 0 #0a0a0a',
  },
  border: '4px solid #0a0a0a',
  fonts: {
    display: '"Archivo Black", sans-serif',
    mono: '"Space Mono", monospace',
    body: '"Space Grotesk", sans-serif',
  },
} as const;
```

### 4.2 `src/constants/files.ts`

```ts
import { tokens } from './tokens';

export type FileSlug = 'about' | 'projects' | 'speaking' | 'mentor' | 'contact' | 'rubiks';

export interface FileEntry {
  slug: FileSlug;
  number: string;         // 'FILE 01'
  label: string;          // 'WHO IS SHE?'
  subtitle: string;       // 'THE SUBJECT DOSSIER'
  color: string;          // accent color for HUD on this page
  scenePath: string;      // route
  sceneTitle: string;     // 'Interrogation Room'
  transitionDuration: number; // ms
}

export const FILES: FileEntry[] = [
  { slug: 'about', number: 'FILE 01', label: 'WHO IS SHE?', subtitle: 'THE SUBJECT DOSSIER', color: tokens.colors.accentBlue, scenePath: '/files/about', sceneTitle: 'Interrogation Room', transitionDuration: 1400 },
  { slug: 'projects', number: 'FILE 02 / EXHIBIT A', label: 'PROJECTS × 06', subtitle: 'CASES CLOSED', color: tokens.colors.accentRed, scenePath: '/files/projects', sceneTitle: 'Police Lineup', transitionDuration: 1600 },
  { slug: 'speaking', number: 'FILE 03', label: 'THE VOICE', subtitle: 'WITNESS TESTIMONY', color: tokens.colors.accentYellow, scenePath: '/files/speaking', sceneTitle: 'Witness Stand', transitionDuration: 1400 },
  { slug: 'mentor', number: 'FILE 04', label: 'TECH MENTOR', subtitle: 'KNOWN ASSOCIATES', color: tokens.colors.accentGreen, scenePath: '/files/mentor', sceneTitle: 'Classroom', transitionDuration: 1400 },
  { slug: 'contact', number: 'FILE 05', label: 'CONTACT FILE', subtitle: 'OPEN A CHANNEL', color: tokens.colors.ink, scenePath: '/files/contact', sceneTitle: 'Dispatch', transitionDuration: 1400 },
  { slug: 'rubiks', number: 'FILE 06', label: 'UNUSUAL TALENT', subtitle: '0:24 / BEST TIME', color: tokens.colors.accentPink, scenePath: '/files/rubiks', sceneTitle: 'Evidence Locker', transitionDuration: 1200 },
];
```

### 4.3 `src/App.tsx` — the transition manager

```tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import { Suspense, useState } from 'react';
import { OfficeHub } from './scenes/OfficeHub';
import { Interrogation } from './scenes/Interrogation';
// ... etc
import { PostProcessing } from './components/shared/PostProcessing';
import { LoadingScreen } from './components/shared/LoadingScreen';
import { Marquee } from './hud/Marquee';
import { StatusBar } from './hud/StatusBar';
import { TransitionOverlay } from './hud/TransitionOverlay';

function SceneRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<OfficeHub />} />
      <Route path="/files/about" element={<Interrogation />} />
      <Route path="/files/projects" element={<Lineup />} />
      {/* etc */}
    </Routes>
  );
}

export default function App() {
  const [transitioning, setTransitioning] = useState(false);
  return (
    <BrowserRouter>
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <SceneRoutes />
          <PostProcessing />
        </Suspense>
      </Canvas>
      <Marquee />
      <StatusBar />
      <AnimatePresence>
        {transitioning && <TransitionOverlay />}
      </AnimatePresence>
    </BrowserRouter>
  );
}
```

Notice: `<Canvas>` sits **outside** the router. Scenes swap inside. Camera rigs inside each scene subscribe to the route to know when they're "active" and should fire their entrance animation.

### 4.4 Scene pattern: `src/scenes/OfficeHub/index.tsx`

Every scene follows the same shape:

```tsx
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { Room } from './Room';
import { Corkboard } from './Corkboard';
import { DeskProps } from './DeskProps';
import { CaseHeader } from '../../hud/CaseHeader';

export function OfficeHub() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.6, 4]} fov={50} />
      <Environment preset="night" />
      <pointLight position={[-2, 3, 0]} intensity={3} color="#ffc878" castShadow />
      <ambientLight intensity={0.1} />

      <Room />
      <Corkboard />
      <DeskProps />

      {/* HUD renders as siblings — React Portal to top-level DOM */}
      <Hud>
        <CaseHeader file="hub" />
        <HubInstructions />
      </Hud>
    </>
  );
}
```

The `<Hud>` component is a portal that renders its children to a `<div id="hud-root">` outside the Canvas. This is critical — HTML can't live inside a WebGL canvas, so we portal neobrutalist overlays on top.

### 4.5 `src/scenes/OfficeHub/Corkboard.tsx` — the key interaction

The corkboard is where hub interactivity lives. Each evidence piece is a flat plane with a texture (pinned paper) and a clickable region. On click:

1. Camera GSAP-tweens toward the evidence piece (60fps, 800ms)
2. At 80% of the tween, the `<TransitionOverlay>` starts wiping in from the right (neobrutalist: a solid red rectangle with the file number stamp slamming down)
3. At 100%, navigate(`/files/projects`) fires
4. New scene mounts, camera starts at an "offscreen" position
5. Overlay wipes out to the left, revealing the new scene mid-camera-move into its final position

That sequence is ~1.6 seconds and is the money shot. It's worth getting right.

```tsx
function Corkboard() {
  const navigate = useNavigate();
  const { camera } = useThree();

  const handleClick = (file: FileEntry) => {
    // 1. Move camera toward evidence
    gsap.to(camera.position, {
      x: file.evidencePos.x,
      y: file.evidencePos.y,
      z: file.evidencePos.z + 0.3,
      duration: 0.8,
      ease: 'power3.inOut',
    });
    // 2. Fire HUD transition (via Zustand store)
    useTransitionStore.getState().start(file);
    // 3. Navigate after wipe covers screen
    setTimeout(() => navigate(file.scenePath), 1200);
  };

  return (
    <group position={[0, 1.4, -0.9]}>
      <mesh>
        <planeGeometry args={[2.2, 1.4]} />
        <meshStandardMaterial map={corkTexture} roughness={0.9} />
      </mesh>
      {FILES.map(file => (
        <EvidenceItem key={file.slug} file={file} onClick={() => handleClick(file)} />
      ))}
      {/* Yarn rendered as TubeGeometry */}
      <YarnConnections />
    </group>
  );
}
```

### 4.6 `src/hud/TransitionOverlay.tsx` — the neobrutalist wipe

This is what makes the scene transitions feel like *your* portfolio and not generic R3F.

Uses framer-motion. Full-screen, z-index above Canvas. On activation:
1. A thick solid-colored block (the file's accent color) slams in from the right at 0.3s
2. A "FILE 02 / EXHIBIT A" badge in Archivo Black slams down from the top with a hard stop
3. Sub-label fades in underneath in monospace
4. Hold 200ms
5. Wipe out to the left, revealing new scene

```tsx
export function TransitionOverlay() {
  const { activeFile } = useTransitionStore();
  if (!activeFile) return null;
  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      exit={{ clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      style={{ background: activeFile.color }}
    >
      <motion.div /* the stamp */>
        {activeFile.number}
      </motion.div>
    </motion.div>
  );
}
```

### 4.7 `src/scenes/Lineup/Suspect.tsx` — the key interaction for projects

Each project is a tall plane (a "suspect") standing at the height-chart wall. On hover, the HUD slides in their number card ("#1 — FOREMARKET"). On click, a neobrutalist modal (same style as v6) opens with the full project details.

```tsx
export function Suspect({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <group
      position={[(index - 2.5) * 1.2, 0, -2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => openProjectModal(project)}
    >
      {/* Suspect silhouette — could be a screenshot of the app or a glb figure */}
      <mesh>
        <planeGeometry args={[0.8, 2]} />
        <meshStandardMaterial map={project.image} />
      </mesh>
      {/* Floor tape with their number */}
      <Html position={[0, -1, 0]} center>
        <NumberCard number={`#${index + 1}`} name={project.name} />
      </Html>
    </group>
  );
}
```

`NumberCard` is a neobrutalist card — bold black border, `#01 — FOREMARKET` in Archivo Black.

### 4.8 `src/components/shared/PostProcessing.tsx` — the noir grade

This is what sells "photoreal noir" over "just a WebGL scene":

```tsx
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.9} intensity={0.3} />
      <Vignette eskil={false} offset={0.2} darkness={0.65} />
      <Noise opacity={0.08} />
      <ChromaticAberration offset={[0.0005, 0.0005]} />
    </EffectComposer>
  );
}
```

Tuning:
- Bloom: only the lamp bulbs should bloom. Threshold 0.9 stops papers/walls from glowing.
- Vignette: darkens corners, subtle
- Noise: film grain, 8% opacity — nostalgic but not distracting
- Chromatic aberration: very minor, adds cinematic feel

---

## 5 — Build Order (what to tell Claude Code)

Don't try to build all 7 rooms at once. Build in this order so you always have something working:

**Phase 1 — Infrastructure (1-2 days)**
1. Add deps (`leva`, `@react-three/postprocessing`)
2. Create `/constants`, `/hud`, `/scenes`, `/lib` folder structure
3. Migrate v6 HTML into `hud/` components (CaseHeader, Marquee, StatusBar, CaseFileModal, TransitionOverlay)
4. Set up `App.tsx` with router + single `<Canvas>` + HUD portal
5. Create a placeholder scene that just shows a box so you can verify routing + HUD work together

**Phase 2 — The hub (2-3 days)**
6. Build `OfficeHub/Room.tsx` — walls, floor, ceiling, basic lighting (cork wall, wood floor, hanging bulb)
7. Build `OfficeHub/Corkboard.tsx` — textured plane with 6 evidence items as interactive regions
8. Wire click → camera tween → transition overlay → route change
9. Add `PostProcessing` stack and tune until it looks cinematic

**Phase 3 — First two rooms (3-4 days)**
10. Build `Interrogation/` — single chair, table, spotlight. About content as interactive documents on the table.
11. Build `Lineup/` — height chart wall, floor tape, 6 "suspects" with project art
12. Test transitions between hub → these two rooms until they feel seamless

**Phase 4 — Remaining rooms (4-6 days)**
13. Witness stand, Classroom, Phone booth, Evidence locker
14. Polish lighting and camera paths per room

**Phase 5 — Polish (2-3 days)**
15. Loading states (neobrutalist progress bar while glb files load)
16. Ambient audio (optional — typewriter clacks on modal open, light jazz loop)
17. Mobile fallback (on <768px, swap to 2D v6-style hub with links to simpler 2D pages instead of 3D scenes — WebGL is still render-heavy on low-end mobile)

---

## 6 — Gotchas and recommendations

**Performance budget.** Target: 60fps on M1 MacBook, 30fps on a mid-range laptop. Use `dpr={[1, 2]}` on `<Canvas>` — clamps pixel density so high-DPI screens don't murder your GPU. Use `<Suspense>` and lazy-load glb files per route.

**Don't model everything.** The human eye doesn't care about the floor plank on the far side of the room. Use fog (`<fog attach="fog" args={['#0a0604', 3, 10]} />`) to hide distant geometry. Bake lighting into textures where possible instead of using real-time lights for secondary illumination.

**Keep the HUD king.** The 3D is the stage; the HUD is what the visitor reads. When in doubt, make HUD elements more prominent, not less. A blurry lamp in the 3D is fine. A blurry FILE 02 badge in the HUD is not.

**Custom cursor.** A subtle flashlight beam following the cursor in 3D scenes (a soft circular spotlight rendered as a ShaderMaterial on a plane in front of the camera) sells the detective feel without being gimmicky. Skip it in HUD-only screens.

**Mobile is a separate design.** Don't try to make the 3D scenes work on phones — the models + textures + shaders will cost 20MB+ to download. Detect mobile, serve the v6 neobrutalist hub directly with modal case files. You keep the aesthetic; they get fast load times.

**Accessibility.** 3D portfolios can be hostile. Always provide a "SKIP TO 2D" button in the intro screen that routes to a v6-style static hub. Users with motion sensitivity, screen readers, or low-end devices need this path.

**Asset attribution.** If you use CC-BY Sketchfab models, add a credits page (make it a "CASE CREDITS" file, keep the metaphor).

---

## 7 — Handoff to implementation

**To implement this with Claude Code, give it this document plus:**
1. Your v6 HTML file (`noora-neobrutalism-v6.html`) for the HUD reference
2. Your current `portfolio/` folder (so it can see existing structure)
3. This instruction:
   > "Implement the R3F walkthrough portfolio per PLAN.md. Start with Phase 1 (infrastructure) and Phase 2 (hub). Do not model rooms yet — use placeholder primitives. Focus on getting routing + HUD + camera transitions working end-to-end, using colored boxes for rooms. I will supply glb models in a later step."

This gets you a working transition demo in 2-3 days. Once that's solid, hand off Phase 3 with actual room models.

**Budget estimate (your time with Claude Code):**
- Phase 1-2: ~10 hours active dev
- Phase 3-4: ~25 hours (depends heavily on whether you can source/commission glb models or build them in Blender)
- Phase 5: ~10 hours
- **Total: ~45 hours** of your active driving time over 3-5 weeks part-time

---

## 8 — One-line summary

You're building a detective's case walkthrough in WebGL with a neobrutalist HUD on top, where every portfolio section is a room you physically travel to, and the navigation between rooms is a cinematic 1.6-second slam-cut transition. The hub is photoreal noir, the HUD is loud flat neobrutalism, and the two speak to each other through shared narrative (FILE 01, FILE 02, CASE CLOSED).

That's the thing that makes this portfolio memorable. Ship it.