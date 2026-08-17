import { BackToHub } from '../hud/BackToHub';
import './speaking-archive.css';

const vuBars = Array.from({ length: 20 }, (_, index) => index);

const tapes = [
  {
    title: 'Build Hackathon',
    subtitle: 'Reboot x Polytechnic - MC',
    date: "MAR '26",
    duration: '48:12',
    type: 'C-48',
    color: 'red-tape',
    playing: true,
  },
  {
    title: 'Dream Big Bahrain',
    subtitle: 'Speak Up - panel / speaker',
    date: '2024',
    duration: '60:00',
    type: 'C-60',
    color: 'blue-tape',
    playing: false,
  },
  {
    title: 'Zain AI Hackathon',
    subtitle: 'Bahrain - facilitator',
    date: '2024',
    duration: '90:00',
    type: 'C-90',
    color: 'green-tape',
    playing: false,
  },
  {
    title: 'Agile Workshop',
    subtitle: 'Bahrain Polytechnic - workshop lead',
    date: '2024',
    duration: '45:00',
    type: 'C-45',
    color: '',
    playing: false,
  },
];

const receipts = [
  {
    corner: 'STMT-01',
    strip: 'blue-strip',
    avatar: 'R',
    name: 'Reboot Organizer',
    role: 'On the Build Hackathon',
    quote: (
      <>
        She had the room from the first sentence. Held it for <strong>forty-five minutes</strong> on pure
        clarity. The recruits left actually wanting to ship something.
      </>
    ),
  },
  {
    corner: 'STMT-02',
    strip: 'red-strip',
    avatar: 'D',
    name: 'Hackathon Participant',
    role: "Build Hackathon '26",
    quote: (
      <>
        I came in nervous. She told us <strong>if you&apos;re nervous, good</strong> and by the time we
        pitched, I actually believed her. Changed how I think about shipping.
      </>
    ),
  },
  {
    corner: 'STMT-03',
    strip: 'green-strip',
    avatar: 'A',
    name: 'Workshop Attendee',
    role: 'Polytechnic Agile Session',
    quote: (
      <>
        Most facilitators explain. She <strong>demonstrates</strong>. She&apos;ll build the thing while you
        watch, talk you through it, and somehow make it feel like you could do it too.
      </>
    ),
  },
];

export function SpeakingArchive() {
  return (
    <div className="speaking-file-screen">
      <div className="file-header">
        <div className="case-title-block">
          <h1>THE VOICE</h1>
          <div className="sub">FILE 03 / AUDIO ARCHIVE</div>
        </div>
        <div className="tag-badge">WITNESS TESTIMONY</div>
      </div>

      <BackToHub />

      <div className="sticker sticker-1">★ ON THE RECORD</div>
      <div className="sticker sticker-2">TAPES ROLLING</div>

      <section className="archive-intro">
        <div className="big-num">04</div>
        <div className="mid">
          <h2>RECORDED STATEMENTS ARCHIVE</h2>
          <p>
            Tapes recovered from the subject&apos;s public appearances. Each recording captures one
            event where the subject was handed a microphone. Handle with care. Audio has been
            preserved.
          </p>
        </div>
        <div className="meta">
          <span>LOGGED: 2023 - 2026</span>
          <span className="live">● NOW PLAYING</span>
          <span>AUDIO: CH.04</span>
        </div>
      </section>

      <section className="deck-section">
        <div className="tape-deck">
          <div className="deck-brand-plate">
            <div className="deck-brand">
              NOORACORP <span className="model">MODEL AX-04</span>
            </div>
            <div className="deck-indicators">
              <span className="led-label">PWR</span>
              <span className="led green" />
              <span className="led-label rec-label">REC</span>
              <span className="led blink" />
            </div>
          </div>

          <div className="deck-window">
            <div className="loaded-cassette">
              <div className="label">
                <div className="title">Reboot x Polytechnic</div>
                <div className="sub">Build Hackathon - MC set</div>
              </div>
              <div className="reels">
                <div className="reel"><span className="spoke2" /></div>
                <div className="tape-strip" />
                <div className="reel"><span className="spoke2" /></div>
              </div>
            </div>
          </div>

          <div className="lcd-display">
            <div className="lcd-time">00:14:32</div>
            <div className="lcd-status">NOW PLAYING - SIDE A</div>
          </div>

          <div className="vu-meter">
            {vuBars.map((bar) => (
              <div className="vu-bar" key={bar} />
            ))}
          </div>

          <div className="transport">
            <button className="btn-transport" type="button" title="Rewind">◀◀</button>
            <button className="btn-transport play" type="button" title="Play">▶</button>
            <button className="btn-transport" type="button" title="Pause">❚❚</button>
            <button className="btn-transport" type="button" title="Stop">■</button>
            <button className="btn-transport" type="button" title="Fast Forward">▶▶</button>
            <button className="btn-transport" type="button" title="Record">●</button>
          </div>
        </div>

        <div className="transcript-panel">
          <div className="transcript-header">
            <div className="label">TRANSCRIPT / TAPE 01</div>
            <div className="meta">Certified · Verbatim</div>
          </div>
          <div className="transcript-body">
            <div className="transcript-meta">
              ▸ RECORDED: Reboot Coding Institute x Bahrain Polytechnic
              <br />
              ▸ OCCASION: Build Hackathon - Opening & MC duties
              <br />
              ▸ AUDIENCE: 40+ developers, 8 teams, full room
              <br />
              ▸ SUBJECT ROLE: MC + Lead Mentor
            </div>

            <div className="transcript-line intro">
              <span className="timestamp">00:00:08</span>
              <span className="speech">[Mic check. Room chatter fades.]</span>
            </div>
            <div className="transcript-line">
              <span className="timestamp">00:00:15</span>
              <span className="speech">
                SUBJECT: &quot;Alright - welcome to <strong>48 hours</strong> of shipping something that
                didn&apos;t exist when you walked in. If you&apos;re nervous, good. That means
                you&apos;re about to learn.&quot;
              </span>
            </div>
            <div className="transcript-line">
              <span className="timestamp">00:01:42</span>
              <span className="speech">
                SUBJECT: &quot;The rule for the weekend: don&apos;t build what you&apos;ve already
                built. Pick something that scares you a little. That&apos;s where the growth is.&quot;
              </span>
            </div>
            <div className="transcript-line intro">
              <span className="timestamp">00:03:10</span>
              <span className="speech">[Audience laughs. Applause.]</span>
            </div>
            <div className="transcript-line highlight">
              <span className="timestamp">00:05:24</span>
              <span className="speech">
                SUBJECT: &quot;You&apos;re not here to impress us. You&apos;re here to ship. Those are
                two very different things - and by Sunday, you&apos;ll know which one matters.&quot;
              </span>
            </div>
            <div className="transcript-line">
              <span className="timestamp">00:08:51</span>
              <span className="speech">
                SUBJECT: &quot;Every mentor in this room has shipped something broken. The difference
                is we kept going. That&apos;s the skill. Not the code - the refusal to quit.&quot;
              </span>
            </div>
            <div className="transcript-line intro">
              <span className="timestamp">00:12:00</span>
              <span className="speech">[Teams break into formation. Hackathon begins.]</span>
            </div>
          </div>
          <div className="transcript-footer">
            <span>▸ Runtime: 48:12 · Side A</span>
            <span className="signature">transcribed by N.Q.</span>
          </div>
        </div>
      </section>

      <section className="rack-section">
        <div className="section-title">
          <h2>AUDIO ARCHIVE</h2>
          <div className="line" />
          <div className="badge">04 TAPES / ON FILE</div>
        </div>

        <div className="rack-intro">
          <span>▸ Select any tape to load into the deck.</span>
          <span className="hint">● CURRENTLY LOADED: TAPE 01 - BUILD HACKATHON</span>
        </div>

        <div className="rack">
          <div className="rack-grid">
            {tapes.map((tape) => (
              <article
                className={`cassette ${tape.color} ${tape.playing ? 'playing' : ''}`}
                key={tape.title}
              >
                <div className="brand-strip">
                  <span className="brand">NOORACORP</span>
                  <span className="tape-type">{tape.type}</span>
                </div>
                <div className="label">
                  <div className="written-title">{tape.title}</div>
                  <div className="written-sub">{tape.subtitle}</div>
                  <div className="date">{tape.date}</div>
                </div>
                <div className="mini-reels">
                  <div className="mini-reel" />
                  <div className="mini-tape-strip" />
                  <div className="mini-reel" />
                </div>
                <div className="footer">
                  <span className="duration">{tape.duration}</span>
                  <button className="play-btn" type="button">▶ PLAY</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="receipts-section">
        <div className="section-title">
          <h2>CORROBORATING STATEMENTS</h2>
          <div className="line" />
          <div className="badge">FROM THE RECORD</div>
        </div>

        <div className="receipts-grid">
          {receipts.map((receipt) => (
            <article className={`receipt ${receipt.strip}`} key={receipt.corner}>
              <div className="receipt-corner">{receipt.corner}</div>
              <p className="quote">&quot;{receipt.quote}&quot;</p>
              <div className="attribution">
                <div className="avatar">{receipt.avatar}</div>
                <div className="meta">
                  <div className="name">{receipt.name}</div>
                  <div className="role">{receipt.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="closing">
        <div className="left">
          ALL STATEMENTS <span className="hl">ON RECORD</span> & <span className="hl">PRESERVED</span>
        </div>
        <div className="right">END OF AUDIO ARCHIVE / FILE 03 / 04 TAPES FILED</div>
      </div>
    </div>
  );
}
