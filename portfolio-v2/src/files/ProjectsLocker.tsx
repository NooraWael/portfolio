import { BackToHub } from '../hud/BackToHub';
import './projects-locker.css';

export function ProjectsLocker() {
  return (
    <div className="projects-file-screen">
      <div className="file-header">
        <div className="case-title-block">
          <h1>PROJECTS × 06</h1>
          <div className="sub">FILE 02 / EVIDENCE LOCKER</div>
        </div>
        <div className="exhibit-tag">EXHIBIT HALL</div>
      </div>

      <BackToHub />

      <div className="sticker sticker-1">★ 6 EXHIBITS</div>
      <div className="sticker sticker-2">ALL CHECKED IN</div>

      <div className="locker-intro">
        <div className="big-num">06</div>
        <div className="mid">
          <h2>EVIDENCE LOCKER — LEVEL 07</h2>
          <p>
            Items recovered from the subject&apos;s workspace. Each artifact represents one shipped
            case. Handle with care. Do not remove from premises without clearance.
          </p>
        </div>
        <div className="meta">
          <span>LOGGED: 2023 — 2026</span>
          <span className="live">● CHAIN VERIFIED</span>
          <span>INTEGRITY: 100%</span>
        </div>
      </div>

      <div className="hero-evidence">
        <div className="evidence-bag-hero">
          <div className="locker-num-tag">EXHIBIT A</div>
          <div className="evidence-label">
            <div className="evidence-label-row"><span className="k">CASE NO.</span><span>2026-FM-001</span></div>
            <div className="evidence-label-row"><span className="k">ITEM</span><span>Foremarket</span></div>
            <div className="evidence-label-row"><span className="k">TYPE</span><span>Mobile Application — iOS / Android</span></div>
            <div className="evidence-label-row"><span className="k">RECOVERED</span><span>Jan 2025 — Ongoing</span></div>
            <div className="evidence-label-row"><span className="k">STATUS</span><span className="status-live">● ACTIVE / SHIPPED</span></div>
            <div className="evidence-label-row"><span className="k">ROLE</span><span>Mobile Team Lead</span></div>
            <div className="evidence-label-row"><span className="k">STACK</span><span>React Native · Expo · TypeScript · Stripe · Firebase</span></div>
            <div className="evidence-label-row"><span className="k">NOTES</span><span className="notes">Sweden&apos;s leading marketplace for second-hand golf equipment. Full RN/Expo build. Subject led the 3-dev team, shipped the app to production, currently expanding into the Nordics and the Americas.</span></div>
          </div>
        </div>

        <div className="hero-showcase">
          <div className="hero-phone">
            <div className="phone-screen">
              <h3>FOREMARKET</h3>
              <div className="sub">Golf · Pre-owned</div>
              <div className="grid">
                <div className="tile"><div>DRIVER</div><div className="price">€420</div></div>
                <div className="tile"><div>IRONS SET</div><div className="price">€750</div></div>
                <div className="tile"><div>PUTTER</div><div className="price">€180</div></div>
                <div className="tile"><div>WEDGES</div><div className="price">€220</div></div>
              </div>
              <div className="nav">
                <span>HOME</span>
                <span>SEARCH</span>
                <span>SELL</span>
                <span>ME</span>
              </div>
            </div>
          </div>
          <div className="hero-links">
            <a className="link-btn live" href="https://foremarket.se" target="_blank" rel="noreferrer">↗ VISIT LIVE</a>
          </div>
        </div>
      </div>

      <div className="shelves-heading">
        <h2>ADDITIONAL EXHIBITS</h2>
        <div className="line" />
        <div className="count">05 / ON RECORD</div>
      </div>

      <div className="coffee-stain coffee-stain-1" />

      <div className="shelf">
        <div className="shelf-label">SHELF 01 / GAMES & INTERACTIVE</div>
        <div className="shelf-grid">
          <div className="evidence-bag">
            <div className="bag-status hot">PLAYABLE</div>
            <div className="tag">
              <div className="tag-corner">EXHIBIT B</div>
              <div className="exhibit-num">Case № 2024-CP-002</div>
              <h3>Cryptic Portal</h3>
              <div className="stack">
                <span className="chip alt">Unity</span>
                <span className="chip alt-2">C#</span>
                <span className="chip alt-3">LLM</span>
                <span className="chip alt-4">Blender</span>
              </div>
              <p className="desc">An escape-room game built in Unity. Players solve cryptic puzzles with an AI guide — an LLM-powered NPC who gives hints in character. Full 3D environment modeled in Blender. Senior project piece.</p>
              <div className="links">
                <a className="mini-link download" href="https://dj96u9m908mjo.cloudfront.net/Cryptic.zip" target="_blank" rel="noreferrer">▼ DOWNLOAD</a>
              </div>
            </div>
          </div>

          <div className="evidence-bag">
            <div className="bag-status archived">ARCHIVED</div>
            <div className="tag">
              <div className="tag-corner">EXHIBIT C</div>
              <div className="exhibit-num">Case № 2024-MW-003</div>
              <h3>Maze Wars</h3>
              <div className="stack">
                <span className="chip alt-2">Rust</span>
                <span className="chip">SDL2</span>
                <span className="chip alt">Systems</span>
              </div>
              <p className="desc">A from-scratch 2D maze battler written in pure Rust with SDL2. No engine, no shortcuts. Hand-rolled game loop, collision detection, and procedural maze generation. Built to understand systems.</p>
              <div className="links">
                <a className="mini-link github" href="https://github.com/NooraWael/maze-wars" target="_blank" rel="noreferrer">◆ CODE</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shelf">
        <div className="shelf-label">SHELF 02 / WEB & DOCUMENTATION</div>
        <div className="shelf-grid">
          <div className="evidence-bag">
            <div className="bag-status">LIVE</div>
            <div className="tag">
              <div className="tag-corner">EXHIBIT D</div>
              <div className="exhibit-num">Case № 2024-BG-004</div>
              <h3>Bevy Guide</h3>
              <div className="stack">
                <span className="chip alt-3">Next.js</span>
                <span className="chip alt-2">Rust</span>
                <span className="chip">MDX</span>
              </div>
              <p className="desc">A learning resource for the Bevy game engine (Rust). Built with Next.js, MDX, and a custom component system for embedded code examples. Open-source documentation project.</p>
              <div className="links">
                <a className="mini-link live" href="https://bevy-guide.vercel.app" target="_blank" rel="noreferrer">↗ VISIT</a>
                <a className="mini-link github" href="https://github.com/NooraWael/bevy-guide" target="_blank" rel="noreferrer">◆ CODE</a>
              </div>
            </div>
          </div>

          <div className="evidence-bag">
            <div className="bag-status archived">ARCHIVED</div>
            <div className="tag">
              <div className="tag-corner">EXHIBIT E</div>
              <div className="exhibit-num">Case № 2023-WG-005</div>
              <h3>W-get Replica</h3>
              <div className="stack">
                <span className="chip alt-4">Go</span>
                <span className="chip">Gin</span>
                <span className="chip">CLI</span>
              </div>
              <p className="desc">A re-implementation of the Unix <span className="inline-code">wget</span> utility in Go. Handles HTTP/HTTPS downloads, recursive mirroring, rate limiting, and concurrent fetching. Built to learn the Go concurrency model.</p>
              <div className="links">
                <a className="mini-link github" href="https://github.com/NooraWael/get-with-a-w" target="_blank" rel="noreferrer">◆ CODE</a>
              </div>
            </div>
          </div>

          <div className="evidence-bag">
            <div className="bag-status">LIVE × 2</div>
            <div className="tag">
              <div className="tag-corner">EXHIBIT F</div>
              <div className="exhibit-num">Case № 2024-RC-006</div>
              <h3>Raincode Sites</h3>
              <div className="stack">
                <span className="chip alt">WordPress</span>
                <span className="chip alt-3">PHP</span>
                <span className="chip">Design</span>
              </div>
              <p className="desc">Two client sites shipped during internship at Raincode. Custom WordPress builds with bespoke templates and theming. Raincode.tech and Raincode.bh — both live in production.</p>
              <div className="links">
                <a className="mini-link live" href="https://raincode.tech" target="_blank" rel="noreferrer">↗ .TECH</a>
                <a className="mini-link live" href="https://raincode.bh" target="_blank" rel="noreferrer">↗ .BH</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="coffee-stain coffee-stain-2" />

      <div className="footer-note">
        <div className="left">ALL ARTIFACTS <span className="highlight">DOCUMENTED</span> & <span className="highlight">FILED</span></div>
        <div className="right">END OF EVIDENCE LOCKER / FILE 02 / 06 EXHIBITS ON RECORD</div>
      </div>
    </div>
  );
}
