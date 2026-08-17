import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackToHub } from '../hud/BackToHub';
import './contact-dispatch.css';

const CONTACT = {
  email: 'nooraqasimwork@gmail.com',
  github: 'https://github.com/NooraWael',
  linkedin: 'https://www.linkedin.com/in/nooraqasim',
  location: 'Manama, Bahrain',
  response: 'Usually within 24-48h',
};

const channels = [
  {
    code: 'CH-01',
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}?subject=Case%20Inquiry%20-%20The%20Noora%20Case`,
    tone: 'red',
    detail: 'Best for projects, workshops, mentorship, speaking, and serious case work.',
    action: 'Send Email',
  },
  {
    code: 'CH-02',
    label: 'GitHub',
    value: '@NooraWael',
    href: CONTACT.github,
    tone: 'ink',
    detail: 'Code trails, experiments, archived cases, and evidence of shipped things.',
    action: 'View GitHub',
  },
  {
    code: 'CH-03',
    label: 'LinkedIn',
    value: 'Noora Qasim',
    href: CONTACT.linkedin,
    tone: 'blue',
    detail: 'Professional record, current role, collaborations, and network signals.',
    action: 'View LinkedIn',
  },
];

export function ContactDispatch() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="contact-file-screen">
      <div className="file-header">
        <div className="case-title-block">
          <h1>CONTACT FILE</h1>
          <div className="sub">FILE 05 / DISPATCH BOOTH</div>
        </div>
        <div className="dispatch-tag">OPEN A CHANNEL</div>
      </div>

      <BackToHub />

      <div className="sticker sticker-1">★ SIGNAL LIVE</div>
      <div className="sticker sticker-2">LINES OPEN</div>

      <section className="dispatch-hero">
        <div className="radio-box">
          <div className="radio-top">
            <span>NOORACOMM // CASELINE</span>
            <span className="live-dot">● LIVE</span>
          </div>
          <div className="radio-body">
            <div className="speaker-grid" aria-hidden="true">
              {Array.from({ length: 48 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="frequency-panel">
              <div className="freq-label">CURRENT FREQUENCY</div>
              <div className="freq-value">05.OPEN</div>
              <div className="freq-sub">DISPATCH READY / MESSAGE ACCEPTED</div>
            </div>
            <div className="radio-controls" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className="dispatch-brief">
          <div className="brief-stamp">REACHABLE</div>
          <h2>
            OPEN A
            <br />
            CHANNEL.
          </h2>
          <p>
            For mentoring, workshops, hackathons, React Native builds, speaking, collaborations,
            or anything at the intersection of software and education.
          </p>
          <div className="brief-meta">
            <div>
              <span>LOCATION</span>
              <strong>{CONTACT.location}</strong>
            </div>
            <div>
              <span>RESPONSE</span>
              <strong>{CONTACT.response}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="channel-board">
        <div className="section-heading">
          <h2>CONTACT CHANNELS</h2>
          <span>03 / VERIFIED</span>
        </div>

        <div className="channel-grid">
          {channels.map((channel) => (
            <a
              className={`channel-card ${channel.tone}`}
              href={channel.href}
              key={channel.code}
              rel="noreferrer"
              target={channel.href.startsWith('http') ? '_blank' : undefined}
            >
              <div className="channel-code">{channel.code}</div>
              <h3>{channel.label}</h3>
              <div className="channel-value">{channel.value}</div>
              <p>{channel.detail}</p>
              <span className="channel-action">↗ {channel.action}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="quick-actions">
        <button type="button" className="copy-email" onClick={copyEmail}>
          {copied ? '✓ EMAIL COPIED' : '◆ COPY EMAIL'}
        </button>
        <a className="send-case" href={`mailto:${CONTACT.email}?subject=New%20Case%20Brief`}>
          ✉ SEND CASE BRIEF
        </a>
        <Link className="backtrack" to="/files/mentor">
          ↩ SEE MENTOR FILE
        </Link>
      </section>

      <section className="case-note">
        <div className="note-label">DISPATCH NOTE</div>
        <p>
          Bring a real problem, a messy idea, or a room full of builders. I care about work that
          ships, teaches, and leaves people more capable than before.
        </p>
        <div className="signed">- N.Q.</div>
      </section>

      <div className="contact-footer">
        <div>END OF DISPATCH FILE / FILE 05</div>
        <div>STATUS: SIGNAL OPEN / WAITING FOR MESSAGE</div>
      </div>
    </div>
  );
}
