import { BackToHub } from '../hud/BackToHub';
import { Link } from 'react-router-dom';
import './mentor-training-ground.css';

const activeOps = [
  {
    code: 'OP / R7-01',
    status: 'ACTIVE',
    strip: 'red-strip',
    title: 'Cohort Mentorship',
    meta: 'Ongoing / Weekly',
    body: '1:1 technical mentorship for Reboot recruits: React Native, architecture, debugging under pressure, and the confidence to keep going when code breaks.',
    progressLabel: 'Current cohort',
    progressValue: '68%',
    progressWidth: '68%',
  },
  {
    code: 'OP / R7-02',
    status: 'RECURRING',
    strip: 'blue-strip',
    title: 'Build Workshops',
    meta: 'Monthly / On-Site',
    body: 'Hands-on sessions around Agile sprint flow, mobile fundamentals, product thinking, and the shipping mindset. Small rooms, real code, real results.',
    progressLabel: 'Workshops delivered',
    progressValue: 'Ongoing',
    progressWidth: '85%',
  },
  {
    code: 'OP / R7-03',
    status: 'SHIPPING',
    strip: 'green-strip',
    title: 'Curriculum Tooling',
    meta: 'Building / Internal',
    body: 'Software for the institute itself: dashboards, recruit tracking, curriculum delivery, and the small systems that make education smoother.',
    progressLabel: 'V2 build',
    progressValue: '42%',
    progressWidth: '42%',
  },
  {
    code: 'OP / R7-04',
    status: 'LIVE OP',
    strip: 'yellow-strip',
    title: 'Hackathons + Events',
    meta: 'Organizer / MC / Mentor',
    body: 'Creating rooms where people build in public: team formation, floor energy, judging criteria, demo coaching, and making first shipped projects feel possible.',
    progressLabel: 'Impact radius',
    progressValue: 'Expanding',
    progressWidth: '74%',
  },
];

export function MentorTrainingGround() {
  return (
    <div className="mentor-file-screen">
      <div className="file-header">
        <div className="case-title-block">
          <h1>THE TRAINING GROUND</h1>
          <div className="sub">FILE 04 / REBOOT CODING INSTITUTE</div>
        </div>
        <div className="mission-tag">BUILDERS IN PROGRESS</div>
      </div>

      <BackToHub />

      <div className="sticker sticker-1">★ ACTIVE ROLE</div>
      <div className="sticker sticker-2">IMPACT LOGGED</div>

      <section className="chalkboard-hero">
        <div className="board-pin board-pin-left" />
        <div className="board-pin board-pin-right" />
        <div className="hero-stamp">CURRENT ASSIGNMENT</div>
        <div className="chalk-left">
          <div className="file-num">FILE 04</div>
          <h2>
            TECH MENTOR
            <br />
            SOFTWARE ENGINEER
          </h2>
          <p>
            Reboot Coding Institute is where the subject now operates at the intersection of code,
            education, and impact.
          </p>
        </div>
        <div className="chalk-right">
          <div className="chalk-command">git commit -m "build builders"</div>
          <div className="chalk-line">I build really cool things.</div>
          <div className="chalk-line">I teach people how to build really cool things.</div>
          <div className="chalk-line accent">The point is impact.</div>
        </div>
      </section>

      <main className="mentor-grid">
        <aside className="assignment-card">
          <div className="assignment-tag">TRANSFER NOTICE</div>
          <div className="timeline-row">
            <span>PREVIOUS POST</span>
            <strong>Mobile Dev Team Lead</strong>
          </div>
          <div className="timeline-row">
            <span>ENDED</span>
            <strong>March 2026</strong>
          </div>
          <div className="timeline-row">
            <span>CURRENT POST</span>
            <strong>Tech Mentor + Software Engineer</strong>
          </div>
          <div className="timeline-row">
            <span>LOCATION</span>
            <strong>Reboot Coding Institute</strong>
          </div>
          <div className="clearance-note">
            Mission: build learning experiences, coach student engineers, host high-energy events,
            and leave people more capable than when they walked in.
          </div>
        </aside>

        <section className="mentor-notes">
          <h2>TEACHING NOTES FROM N.Q.</h2>
          <div className="notes-grid">
            <div className="note-card">Explain it like I wish someone explained it to me.</div>
            <div className="note-card red">Let people build before they feel ready.</div>
            <div className="note-card green">Make the hard thing practical.</div>
            <div className="note-card blue">The best lesson turns into a shipped thing.</div>
          </div>
          <figure className="mentor-field-photo">
            <img src="/zainAI.jpeg" alt="Noora mentoring at the Zain AI Hackathon" />
            <figcaption>field evidence / teaching in public</figcaption>
          </figure>
        </section>
      </main>

      <section className="active-ops-section">
        <div className="section-heading">
          <h2>ACTIVE OPS</h2>
          <span>04 / STANDING</span>
        </div>
        <div className="active-ops-list">
          {activeOps.map((op) => (
            <article className={`active-op-card ${op.strip}`} key={op.code}>
              <span className="op-status-pill">{op.status}</span>
              <span className="op-code-tag">{op.code}</span>
              <h3>{op.title}</h3>
              <div className="op-meta">{op.meta}</div>
              <p>{op.body}</p>
              <div className="op-progress">
                <div className="progress-label">
                  <span>{op.progressLabel}</span>
                  <span>{op.progressValue}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: op.progressWidth }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="field-manifesto">
        <div className="manifesto-label">FIELD MANIFESTO</div>
        <h2>
          Teach. Build.
          <br />
          <span>Repeat.</span>
        </h2>
        <p>
          The mission is simple: <strong>build things that make it easier for other people to
          build things</strong>. The best way to learn is to ship. The best way to teach is to
          build the thing you&apos;re teaching about, in front of them, with them, for them.
        </p>
        <p>
          If a recruit leaves with a shipped project, a sharper instinct, and the confidence to
          take on a harder problem, operation successful.
        </p>
        <div className="manifesto-signature">
          Noora Qasim
          <span>// TECH MENTOR, FILE 04</span>
        </div>
      </section>

      <section className="mentor-recruit">
        <div>
          <h2>
            NEED A <span>MENTOR</span> IN THE FIELD?
          </h2>
          <p>
            Open to workshops, hackathons, speaking engagements, mentorship, and collaborations
            at the intersection of tech and education.
          </p>
        </div>
        <div className="recruit-actions">
          <Link className="recruit-btn" to="/files/contact">▸ OPEN A CHANNEL</Link>
          <Link className="recruit-btn alt" to="/files/speaking">◆ SEE TESTIMONY</Link>
        </div>
      </section>

      <div className="mentor-footer">
        <div>END OF TRAINING GROUND / FILE 04</div>
        <div>STATUS: ACTIVE / BUILDING PEOPLE + SYSTEMS</div>
      </div>
    </div>
  );
}
