import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { getFileByPath } from './constants/files';
import { PostProcessing } from './components/shared/PostProcessing';
import { AboutDossier } from './files/AboutDossier';
import { ContactDispatch } from './files/ContactDispatch';
import { MentorTrainingGround } from './files/MentorTrainingGround';
import { ProjectsLocker } from './files/ProjectsLocker';
import { RubiksEvidenceRoom } from './files/RubiksEvidenceRoom';
import { SpeakingArchive } from './files/SpeakingArchive';
import { NeobrutalistHub } from './hub/NeobrutalistHub';
import { BackToHub } from './hud/BackToHub';
import { CaseHeader } from './hud/CaseHeader';
import { HudPortal } from './hud/HudPortal';
import { Marquee } from './hud/Marquee';
import { StatusBar } from './hud/StatusBar';
import { TransitionOverlay } from './hud/TransitionOverlay';
import { SeoManager } from './lib/SeoManager';
import { TransitionStoreProvider } from './lib/store';
import { FileRoom } from './scenes/FileRoom';

function FileRouteScene() {
  const { slug } = useParams<{ slug: string }>();
  const isAbout = slug === 'about';
  const isMentor = slug === 'mentor';
  const isProjects = slug === 'projects';
  const isSpeaking = slug === 'speaking';
  const isRubiks = slug === 'rubiks';
  const isContact = slug === 'contact';

  return (
    <div className="file-route-shell">
      <div className="canvas-shell">
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <FileRoom />
            <PostProcessing />
          </Suspense>
        </Canvas>
      </div>
      {isAbout ? <AboutDossier /> : null}
      {isMentor ? <MentorTrainingGround /> : null}
      {isProjects ? <ProjectsLocker /> : null}
      {isSpeaking ? <SpeakingArchive /> : null}
      {isRubiks ? <RubiksEvidenceRoom /> : null}
      {isContact ? <ContactDispatch /> : null}
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NeobrutalistHub />} />
      <Route path="/files/:slug" element={<FileRouteScene />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function HudLayer() {
  const location = useLocation();
  const currentFile = getFileByPath(location.pathname);
  const isAboutFile = currentFile?.slug === 'about';
  const isMentorFile = currentFile?.slug === 'mentor';
  const isProjectsFile = currentFile?.slug === 'projects';
  const isSpeakingFile = currentFile?.slug === 'speaking';
  const isRubiksFile = currentFile?.slug === 'rubiks';
  const isContactFile = currentFile?.slug === 'contact';
  const hasCustomFileLayout = isAboutFile || isMentorFile || isProjectsFile || isSpeakingFile || isRubiksFile || isContactFile;

  if (!currentFile) {
    return (
      <HudPortal>
        <TransitionOverlay />
      </HudPortal>
    );
  }

  const marqueeItems = isAboutFile
    ? ['FILE 01 OPEN', 'SUBJECT UNDER REVIEW', 'CLEARANCE: CLASSIFIED', 'CASE FILE 2026', 'STATUS — REACHABLE', 'LAST SEEN: MANAMA, BH']
    : isMentorFile
      ? ['FILE 04 OPEN', 'TRAINING GROUND ACTIVE', 'REBOOT CODING INSTITUTE', 'BUILDERS IN PROGRESS', 'TECH + EDUCATION', 'IMPACT LOGGED']
    : isProjectsFile
      ? ['FILE 02 OPEN', 'EVIDENCE LOCKER ACCESSED', '06 ARTIFACTS ON RECORD', 'EXHIBIT A — FOREMARKET', 'CHAIN OF CUSTODY VERIFIED', 'ALL PROJECTS DOCUMENTED']
    : isSpeakingFile
      ? ['FILE 03 OPEN', 'AUDIO ARCHIVE ACCESSED', 'RECORDED STATEMENTS ON FILE', 'WITNESS TESTIMONY — THE VOICE', 'PLAYBACK AUTHORIZED', 'TAPES ROLLING']
    : isRubiksFile
      ? ['FILE 06 CLASSIFIED', 'UNUSUAL TALENT DETECTED', 'SUB-15 TIME ON RECORD', 'PATTERN RECOGNITION: ELEVATED', 'EVIDENCE ROOM B', 'FILE 06 CLASSIFIED']
    : isContactFile
      ? ['FILE 05 OPEN', 'DISPATCH BOOTH LIVE', 'SIGNAL VERIFIED', 'EMAIL CHANNEL READY', 'GITHUB TRACE AVAILABLE', 'LINKEDIN RECORD FOUND']
      : undefined;

  return (
    <HudPortal>
      <Marquee items={marqueeItems} />
      <StatusBar
        left={
          isAboutFile
            ? 'SYSTEM ONLINE / FILE 01 OPEN'
            : isMentorFile
              ? 'SYSTEM ONLINE / FILE 04 OPEN'
            : isProjectsFile
              ? 'SYSTEM ONLINE / FILE 02 OPEN'
            : isSpeakingFile
              ? 'SYSTEM ONLINE / FILE 03 OPEN'
            : isRubiksFile
              ? 'SYSTEM ONLINE / FILE 06 OPEN'
            : isContactFile
              ? 'SYSTEM ONLINE / FILE 05 OPEN'
              : undefined
        }
        middle={
          isSpeakingFile
            ? 'NOORA.QASIM / THE VOICE'
            : isRubiksFile
              ? 'NOORA.QASIM / SIDE COMPETENCY'
            : isContactFile
              ? 'NOORA.QASIM / DISPATCH'
            : isAboutFile || isMentorFile || isProjectsFile
              ? 'NOORA.QASIM / DEV / MENTOR'
              : undefined
        }
        right={
          isAboutFile
            ? 'CLEARANCE: LEVEL 07'
            : isMentorFile
              ? 'MISSION: BUILDERS IN PROGRESS'
            : isProjectsFile
              ? 'EXHIBITS: 06 / LOGGED'
            : isSpeakingFile
              ? 'TAPES: 04 / PLAYING'
            : isRubiksFile
              ? 'RECORD: 12.43s'
            : isContactFile
              ? 'SIGNAL: OPEN / REACHABLE'
              : undefined
        }
      />

      {currentFile && !hasCustomFileLayout ? (
        <>
          <div className="sticker sticker-1">★ NEW CASE</div>
          <div className="sticker sticker-2">EVIDENCE READY</div>
        </>
      ) : null}

      {currentFile && !hasCustomFileLayout ? (
        <div className="hud-stage">
          <CaseHeader file={currentFile} />
          <BackToHub />
        </div>
      ) : null}

      <TransitionOverlay />
    </HudPortal>
  );
}

function AppShell() {
  return (
    <>
      <SeoManager />
      <AppRoutes />
      <div id="hud-root" />
      <HudLayer />
      <Leva collapsed hidden={!import.meta.env.DEV} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TransitionStoreProvider>
        <AppShell />
      </TransitionStoreProvider>
    </BrowserRouter>
  );
}

export default App;
