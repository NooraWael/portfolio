import { useState } from 'react';
import { BackToHub } from '../hud/BackToHub';
import profilePhoto from '../assets/photo.png';
import './about-dossier.css';

function RedactedField({ value }: { value: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      className={`redacted ${revealed ? 'revealed' : ''}`}
      onClick={() => setRevealed((current) => !current)}
    >
      <span className="real-value">{value}</span>
    </button>
  );
}

interface RecordCardProps {
  date: string;
  title: string;
  org: string;
  desc: string;
  accent: 'blue' | 'green' | 'red' | 'yellow';
  mark: string;
}

function RecordCard({ date, title, org, desc, accent, mark }: RecordCardProps) {
  return (
    <div className={`record ${accent}`}>
      <span className="corner-mark">{mark}</span>
      <div className="date-stamp">{date}</div>
      <div className="title">{title}</div>
      <div className="org">{org}</div>
      <div className="desc">{desc}</div>
    </div>
  );
}

export function AboutDossier() {
  return (
    <div className="about-file-screen">
      <div className="file-header">
        <div className="case-title-block">
          <h1>WHO IS SHE?</h1>
          <div className="sub">FILE 01 / INTERROGATION ROOM</div>
        </div>
        <div className="subject-dossier-tag">THE SUBJECT DOSSIER</div>
      </div>

      <BackToHub />

      <div className="sticker sticker-1">★ NEW CASE</div>
      <div className="sticker sticker-2">EVIDENCE READY</div>

      <div className="stamp-approved">APPROVED</div>

      <div className="dossier">
        <div className="left-col">
          <div className="photo-card">
            <div className="photo-frame has-image">
              <img src={profilePhoto} alt="Noora Qasim" />
              <div className="photo-redaction">▓▓ REDACTED ▓▓</div>
              <div className="classified-stamp">CLASSIFIED</div>
            </div>
            <div className="photo-caption">★ SUBJECT #2026 / ON FILE ★</div>
          </div>

          <div className="vital-stats">
            <div className="row">
              <span className="label">NAME</span>
              <span className="value">Noora Qasim</span>
            </div>
            <div className="row">
              <span className="label">ALIAS</span>
              <span className="value">
                <RedactedField value="@NooraWael" />
              </span>
            </div>
            <div className="row">
              <span className="label">D.O.B.</span>
              <span className="value">
                <RedactedField value="XX / XX / 20XX" />
              </span>
            </div>
            <div className="row">
              <span className="label">OCCUPATION</span>
              <span className="value">Software Engineer / Mentor</span>
            </div>
            <div className="row">
              <span className="label">LOCATION</span>
              <span className="value">Manama, BH</span>
            </div>
            <div className="row">
              <span className="label">OPS AREA</span>
              <span className="value">Manama, BH</span>
            </div>
            <div className="row">
              <span className="label">STATUS</span>
              <span className="value status-active">● ACTIVE / REACHABLE</span>
            </div>
            <div className="row">
              <span className="label">THREAT</span>
              <span className="value">
                <RedactedField value="Only to production bugs" />
              </span>
            </div>

            <div className="clearance">
              <div className="label">CLEARANCE LEVEL</div>
              <div className="clearance-bar">
                <div className="blocks">
                  <div className="block" />
                  <div className="block" />
                  <div className="block" />
                  <div className="block" />
                  <div className="block" />
                  <div className="block" />
                  <div className="block off" />
                  <div className="block off" />
                </div>
                <span className="pct">75%</span>
              </div>
            </div>
          </div>

          <div className="fingerprint">
            <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round">
                <path d="M 50 10 C 25 12, 12 35, 15 65 C 17 90, 28 110, 45 120" />
                <path d="M 50 15 C 30 18, 18 38, 22 65 C 24 85, 32 105, 47 115" />
                <path d="M 50 22 C 35 24, 25 42, 28 65 C 30 82, 36 100, 48 110" />
                <path d="M 50 30 C 40 32, 32 46, 34 65 C 36 78, 40 92, 50 102" />
                <path d="M 50 40 C 45 42, 40 52, 40 65 C 41 75, 44 85, 52 93" />
                <path d="M 50 50 C 48 54, 46 60, 46 65 C 47 70, 49 76, 54 82" />
                <circle cx="50" cy="65" r="4" />
                <path d="M 50 70 C 55 72, 58 78, 58 85" />
                <path d="M 55 60 C 62 60, 70 65, 72 75 C 74 88, 68 100, 56 108" />
                <path d="M 60 52 C 70 52, 80 60, 82 75 C 84 95, 72 112, 58 118" />
                <path d="M 65 42 C 78 42, 88 58, 88 78 C 88 100, 75 118, 60 122" />
              </g>
            </svg>
            <div className="label">PRINT ON FILE</div>
          </div>

          <div className="stamp-scrum">
            <div className="top">CERTIFIED</div>
            <div className="big">
              SCRUM
              <br />
              MASTER
            </div>
            <div className="bottom">2025</div>
          </div>
        </div>

        <div className="right-col">
          <section>
            <h2 className="section-header">
              <span>SUBJECT BACKGROUND</span>
              <span className="num">§ 1.0</span>
            </h2>
            <div className="bio-doc">
              <p>
                The subject is known to operate primarily in <strong>mobile development</strong>, with
                credentials spanning React Native, Expo, and native platforms. Known affiliations:
                Raincode, Foremarket, and Reboot Coding Institute.
              </p>
              <p>
                Recent intel confirms a shift into <strong>tech mentorship and software engineering</strong>
                at Reboot Coding Institute. The subject builds systems, helps students learn Go,
                JavaScript, Rust, mobile development, and more, while hosting hackathons and events
                built to leave a real mark on the local developer ecosystem.
              </p>
              <p>
                Notable: exhibits high-speed pattern recognition. Solves 3×3 Rubik's cubes in under
                30 seconds. Pursues mysteries recreationally. Cases remain open.
              </p>
            </div>
          </section>

          <div className="coffee-stain coffee-stain-1" />

          <section>
            <h2 className="section-header">
              <span>EDUCATION</span>
              <span className="num">§ 2.0</span>
            </h2>
            <div className="record-list">
              <RecordCard
                date="2021 — 2025"
                title="B.Sc. ICT / Programming"
                org="Bahrain Polytechnic"
                desc="Foundations laid. Java, C#, HTML, CSS, JavaScript. First sightings of collaborative production code. Graduated with honors in the programming major."
                accent="blue"
                mark="REC / ED-01"
              />
              <RecordCard
                date="2023 — 2025"
                title="Full-Stack Diploma"
                org="Reboot Coding Institute"
                desc="Deep systems, algorithms, cloud infrastructure. Specialized in DevOps and mobile development with hands-on project work across the Nordic ecosystem."
                accent="green"
                mark="REC / ED-02"
              />
              <RecordCard
                date="2025"
                title="Professional Scrum Master"
                org="Scrum.org — Certification"
                desc="Agile and Scrum methodology validated. Can run a sprint, unblock a team, and turn standups into something people actually look forward to."
                accent="yellow"
                mark="REC / ED-03"
              />
            </div>
          </section>

          <section>
            <h2 className="section-header">
              <span>WORK HISTORY</span>
              <span className="num">§ 3.0</span>
            </h2>
            <div className="record-list">
              <RecordCard
                date="2024 / 6 MONTHS"
                title="Web Development Intern"
                org="Raincode — Manama"
                desc="Built WordPress-based client sites in a team of four. Learned Agile practice on the floor. Shipped Raincode.tech and Raincode.bh — both live."
                accent="red"
                mark="REC / WH-01"
              />
              <RecordCard
                date="JAN 2025 — MAR 2026"
                title="Mobile Team Lead"
                org="Raincode × Foremarket"
                desc="Led React Native / Expo development for Foremarket — Sweden's top second-hand golf marketplace. Directed a 3-developer mobile team, shipped production features, and helped expand the app beyond its original market."
                accent="blue"
                mark="REC / WH-02"
              />
              <RecordCard
                date="MAR 2026 — PRESENT"
                title="Tech Mentor / Software Engineer"
                org="Reboot Coding Institute"
                desc="Builds internal systems and learning tools while mentoring students across Go, JavaScript, Rust, mobile development, and more. Hosts hackathons, runs events, teaches practical engineering, and keeps shipping cool things in the meantime."
                accent="green"
                mark="REC / WH-03"
              />
            </div>
          </section>

          <section>
            <div className="associates">
              <h2 className="section-header">
                <span>KNOWN ASSOCIATES</span>
                <span className="num">§ 4.0</span>
              </h2>
              <div className="associates-note">Frequently seen operating with:</div>
              <div className="associates-tags">
                <span className="assoc-tag primary">React Native</span>
                <span className="assoc-tag primary">Expo</span>
                <span className="assoc-tag secondary">TypeScript</span>
                <span className="assoc-tag secondary">JavaScript</span>
                <span className="assoc-tag secondary">Next.js</span>
                <span className="assoc-tag">Node.js</span>
                <span className="assoc-tag">Go</span>
                <span className="assoc-tag">Rust</span>
                <span className="assoc-tag tertiary">Unity</span>
                <span className="assoc-tag tertiary">C#</span>
                <span className="assoc-tag">MongoDB</span>
                <span className="assoc-tag">PostgreSQL</span>
                <span className="assoc-tag">AWS</span>
                <span className="assoc-tag">Docker</span>
                <span className="assoc-tag">Git</span>
                <span className="assoc-tag">Blender</span>
                <span className="assoc-tag">Scrum / Agile</span>
              </div>
            </div>
          </section>

          <div className="polaroid polaroid-1">
            <div className="fake-img">
              <img src="/speakingMain.jpeg" alt="Noora in her element" />
            </div>
            <div className="cap">in her element</div>
          </div>
          <div className="polaroid polaroid-2">
            <div className="fake-img">
              <img src="/buildHackathon.jpeg" alt="Noora at Build Hackathon" />
            </div>
            <div className="cap">On Stage, BH</div>
          </div>
          <div className="polaroid polaroid-3">
            <div className="fake-img">
              <img src="/winning.png" alt="Noora after a winning build event" />
            </div>
            <div className="cap">Code & Win</div>
          </div>

          <div className="sticky-note">
            <strong>Note from the desk:</strong>
            "Give me a complex problem and a quiet room, and I'll give you a shipped product by
            morning."
            <br />
            <br />
            — N.Q.
          </div>

          <div className="coffee-stain coffee-stain-2" />
        </div>
      </div>
    </div>
  );
}
