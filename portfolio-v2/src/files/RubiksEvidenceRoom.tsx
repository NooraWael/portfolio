import { BackToHub } from '../hud/BackToHub';
import './rubiks-evidence-room.css';

type FaceKey = 'front' | 'back' | 'right' | 'left' | 'top' | 'bottom';

const solvedFaces: Record<FaceKey, string[]> = {
  front: Array(9).fill('r'),
  back: Array(9).fill('o'),
  right: Array(9).fill('b'),
  left: Array(9).fill('g'),
  top: Array(9).fill('w'),
  bottom: Array(9).fill('y'),
};

const scrambledFaces: Record<FaceKey, string[]> = {
  front: ['r', 'b', 'y', 'g', 'r', 'o', 'w', 'r', 'g'],
  back: ['o', 'w', 'r', 'b', 'o', 'g', 'y', 'o', 'b'],
  right: ['b', 'g', 'y', 'w', 'b', 'r', 'g', 'y', 'b'],
  left: ['g', 'y', 'w', 'r', 'g', 'b', 'o', 'w', 'g'],
  top: ['w', 'o', 'g', 'y', 'w', 'b', 'r', 'g', 'w'],
  bottom: ['y', 'r', 'b', 'o', 'y', 'w', 'b', 'r', 'y'],
};

const midSolveFaces: Record<FaceKey, string[]> = {
  front: ['r', 'r', 'r', 'r', 'r', 'g', 'r', 'r', 'b'],
  back: ['o', 'o', 'g', 'o', 'o', 'o', 'w', 'o', 'y'],
  right: ['b', 'b', 'o', 'b', 'b', 'b', 'r', 'b', 'w'],
  left: ['g', 'g', 'y', 'g', 'g', 'g', 'o', 'g', 'r'],
  top: Array(9).fill('w'),
  bottom: ['y', 'y', 'y', 'y', 'y', 'y', 'r', 'g', 'b'],
};

const fourByFourFaces: Record<FaceKey, string[]> = {
  front: ['r', 'r', 'g', 'b', 'r', 'r', 'r', 'y', 'o', 'r', 'r', 'r', 'w', 'g', 'r', 'r'],
  back: ['o', 'w', 'o', 'o', 'o', 'o', 'o', 'g', 'b', 'o', 'o', 'o', 'o', 'o', 'y', 'o'],
  right: ['b', 'b', 'r', 'b', 'b', 'b', 'b', 'b', 'y', 'b', 'b', 'w', 'b', 'o', 'b', 'b'],
  left: ['g', 'g', 'g', 'g', 'y', 'g', 'g', 'r', 'g', 'g', 'w', 'g', 'g', 'b', 'g', 'g'],
  top: Array(16).fill('w'),
  bottom: Array(16).fill('y'),
};

const mirrorFaces: Record<FaceKey, string[]> = {
  front: Array(9).fill('mirror'),
  back: Array(9).fill('mirror'),
  right: Array(9).fill('mirror'),
  left: Array(9).fill('mirror'),
  top: Array(9).fill('mirror'),
  bottom: Array(9).fill('mirror'),
};

const twoByTwoFaces: Record<FaceKey, string[]> = {
  front: ['r', 'g', 'b', 'r'],
  back: ['o', 'w', 'y', 'o'],
  right: ['b', 'r', 'g', 'b'],
  left: ['g', 'y', 'o', 'g'],
  top: Array(4).fill('w'),
  bottom: Array(4).fill('y'),
};

function Cube({
  className = '',
  faces,
}: {
  className?: string;
  faces: Record<FaceKey, string[]>;
}) {
  return (
    <div className={`cube ${className}`}>
      {(Object.keys(faces) as FaceKey[]).map((face) => (
        <div className={`face ${face}`} key={face}>
          {faces[face].map((color, index) => (
            <div className={`sq ${color}`} key={`${face}-${index}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function RubiksEvidenceRoom() {
  return (
    <div className="rubiks-file-screen">
      <div className="sticker sticker-1">★ SECRET FILE</div>
      <div className="sticker sticker-2">DO NOT TOUCH</div>

      <div className="file-header">
        <div className="case-title-block">
          <h1>UNUSUAL TALENT</h1>
          <div className="sub">FILE 06 / EVIDENCE ROOM B</div>
        </div>
        <div className="tag-badge">NOT IN JOB DESCRIPTION</div>
      </div>

      <BackToHub />

      <div className="scene-corner tl">EVIDENCE ROOM B / <span>ACCESS: CLEARED</span></div>
      <div className="scene-corner tr">PHOTO: 01 OF 01</div>
      <div className="scene-corner bl">ITEMS RECOVERED: MULTIPLE</div>
      <div className="scene-corner br"><span>● LOGGED</span> / 2026</div>

      <div className="intro-callout">
        <h2>SHE SOLVES <span>THE CUBE</span> IN <em>under 13 seconds</em></h2>
      </div>

      <div className="stain s1" />
      <div className="stain s2" />
      <div className="stain s3" />

      <div className="float-item fi-1">
        <div className="sticky-note-sm">"...saw her solve it in the elevator. I have questions." - witness</div>
      </div>
      <div className="float-item fi-2">
        <div className="sticky-note-sm yellow">Suspect solves while in conversation. Without looking.</div>
      </div>
      <div className="float-item fi-3">
        <div className="sticky-note-sm green">verified ★ on camera ★ no assist</div>
      </div>

      <div className="scrap sc-1">
        <div className="title">scramble #04</div>
        R U R&apos; U&apos;
        <br />
        R&apos; F R2 U&apos;
        <br />
        R&apos; U&apos; R U R&apos;
      </div>

      <div className="polaroid-small pol-1">
        <div className="img">◆</div>
        <div className="cap">first cube, age 10</div>
      </div>

      <div className="stopwatch-drop">
        <div className="stopwatch-body">
          <div className="time-face">12.43</div>
          <div className="hand" />
          <div className="pin" />
        </div>
      </div>

      <div className="time-finding">
        <div className="label">◆ 3x3 PERSONAL BEST ◆</div>
        <div className="big">12.43<span>s</span></div>
        <div className="detail"><strong>● VERIFIED</strong> / ON RECORD</div>
        <div className="sub">"she gets faster when you&apos;re watching"</div>
      </div>

      <div className="cube-drop cd-1 tilt-a">
        <Cube className="big hero" faces={solvedFaces} />
        <div className="shadow-blob" />
        <span className="tiny-label">solved</span>
      </div>

      <div className="cube-drop cd-2 tilt-b">
        <Cube faces={scrambledFaces} />
        <div className="shadow-blob" />
        <span className="tiny-label">scrambled</span>
      </div>

      <div className="cube-drop cd-3 tilt-c">
        <Cube className="small" faces={midSolveFaces} />
        <div className="shadow-blob" />
        <span className="tiny-label">mid-solve</span>
      </div>

      <div className="cube-drop cd-4 tilt-d">
        <Cube className="big fourbyfour" faces={fourByFourFaces} />
        <div className="shadow-blob" />
        <span className="tiny-label">4x4</span>
      </div>

      <div className="cube-drop cd-5 tilt-e">
        <Cube className="small mirror" faces={mirrorFaces} />
        <div className="shadow-blob" />
        <span className="tiny-label">mirror (gold)</span>
      </div>

      <div className="cube-drop cd-6 tilt-f">
        <Cube className="tiny twobytwo" faces={twoByTwoFaces} />
        <div className="shadow-blob" />
        <span className="tiny-label">2x2 pocket</span>
      </div>

      <div className="pyraminx-drop cd-7">
        <div className="pyraminx">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon points="50,15 15,80 85,80" fill="#e63946" stroke="#0a0a0a" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="50,15 32,46 68,46" fill="#c42a38" stroke="#0a0a0a" strokeWidth="1.5" />
            <polygon points="32,46 15,80 50,80" fill="#d13644" stroke="#0a0a0a" strokeWidth="1.5" />
            <polygon points="68,46 50,80 85,80" fill="#d13644" stroke="#0a0a0a" strokeWidth="1.5" />
            <polygon points="32,46 68,46 50,80" fill="#4361ee" stroke="#0a0a0a" strokeWidth="1.5" />
            <polygon points="85,80 95,68 50,15" fill="#06a77d" stroke="#0a0a0a" strokeWidth="2.5" strokeLinejoin="round" opacity="0.88" />
            <polygon points="15,80 85,80 80,92 20,92" fill="#ffd60a" stroke="#0a0a0a" strokeWidth="2.5" strokeLinejoin="round" opacity="0.9" />
          </svg>
        </div>
        <span className="tiny-label">pyraminx</span>
      </div>
    </div>
  );
}
