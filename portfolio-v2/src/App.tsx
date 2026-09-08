import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import KineticScene from './components/KineticScene';

const projects = [
  {
    id: '01', title: 'FOREMARKET', type: 'MARKETPLACE PRODUCT', year: '2025 / 2026', color: 'var(--cobalt)', ink: 'var(--cream)',
    role: 'Mobile Team Lead', stack: ['React Native', 'Expo', 'TypeScript', 'Stripe', 'Firebase'],
    body: 'Sweden’s second-hand golf marketplace. I led a three-developer mobile team and shipped production features for a product expanding beyond its original market.',
    proof: 'A production marketplace built for real inventory, real transactions, and real users.',
    media: ['/foremarket-home.jpg', '/foremarket-listings.jpg'], mediaAlt: 'Foremarket marketplace website',
    link: 'https://foremarket.se', action: 'VISIT LIVE',
  },
  {
    id: '02', title: 'SHAMSAHA', type: 'CRISIS SUPPORT APP', year: 'LIVE', color: 'var(--cream)', ink: 'var(--ink)',
    role: 'Full Stack Developer', stack: ['React Native', 'Node.js', 'Mobile Systems'],
    body: 'A mobile support platform built for Shamsaha, connecting women across the Middle East with confidential crisis care and practical support.',
    proof: 'A React Native mobile experience backed by Node.js, built around clarity, care, and immediate access to support.',
    media: ['/shamsaha-home.jpg', '/shamsaha-mission.jpg'], mediaAlt: 'Shamsaha support platform website',
    link: 'https://shamsaha.org', action: 'VISIT SHAMSAHA',
  },
  {
    id: '03', title: 'RAINCODE SITES', type: 'PRODUCTION WEBSITES', year: '2024', color: 'var(--ink)', ink: 'var(--cream)',
    role: 'Web Development Intern', stack: ['WordPress', 'PHP', 'JavaScript'],
    body: 'Two production websites created during my Raincode internship for its Bahrain and Sweden presence, with custom templates, theming, and responsive delivery.',
    proof: 'Two client websites shipped in a four-person team through an Agile delivery process.',
    media: ['/raincode-home.jpg', '/raincode-detail.jpg'], mediaAlt: 'Raincode technology company website',
    link: 'https://raincode.tech', action: 'VISIT RAINCODE.TECH', secondaryLink: 'https://raincode.bh', secondaryAction: 'VISIT RAINCODE.BH',
  },
  {
    id: '04', title: 'CRYPTIC PORTAL', type: '3D ESCAPE ROOM', year: '2024', color: 'var(--cobalt)', ink: 'var(--cream)',
    role: 'Senior Project', stack: ['Unity', 'C#', 'LLM', 'Blender'],
    body: 'A cinematic escape-room game with a custom AI guide, full 3D environments, and cryptic puzzles designed as one connected system.',
    proof: 'A complete game system spanning interaction design, 3D environments, AI, and puzzle logic.',
    link: 'https://dj96u9m908mjo.cloudfront.net/Cryptic.zip', action: 'DOWNLOAD',
  },
  {
    id: '05', title: 'MAZE WARS', type: 'SYSTEMS GAME', year: '2024', color: 'var(--taupe)', ink: 'var(--ink)',
    role: 'Systems Learning Project', stack: ['Rust', 'SDL2', 'Procedural Generation'],
    body: 'A 2D maze battler written from scratch in Rust: game loop, collision system, and procedural maze generation, with no engine.',
    proof: 'The engine, collision model, game loop, and maze generation were built from the ground up.',
    link: 'https://github.com/NooraWael/maze-wars', action: 'VIEW CODE',
  },
  {
    id: '06', title: 'BEVY GUIDE', type: 'OPEN SOURCE DOCS', year: '2024', color: 'var(--cream)', ink: 'var(--ink)',
    role: 'Open Source Learning Resource', stack: ['Next.js', 'Rust', 'MDX'],
    body: 'A focused learning resource for the Bevy game engine, built to make a difficult tool easier to understand and use.',
    proof: 'Technical documentation shaped as a clearer learning path for a difficult engine.',
    link: 'https://bevy-guide.vercel.app', action: 'VISIT SITE',
  },
] as const;

const experience = [
  { date: '2026 TO PRESENT', role: 'TECH MENTOR / SOFTWARE ENGINEER', company: 'REBOOT CODING INSTITUTE' },
  { date: '2025 TO 2026', role: 'MOBILE TEAM LEAD', company: 'RAINCODE × FOREMARKET' },
  { date: '2024', role: 'WEB DEVELOPMENT INTERN', company: 'RAINCODE' },
];

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [mentorIndex, setMentorIndex] = useState(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = new Lenis({ duration: reduced ? 0 : 1.8, smoothWheel: !reduced, wheelMultiplier: reduced ? 1 : 0.42, touchMultiplier: reduced ? 1 : 0.64 });
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let removeMentorDrag = () => {};
    const ctx = gsap.context(() => {
      gsap.from('.hero-line > span', { yPercent: 110, duration: 1.15, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
      gsap.from('.hero-role, .hero-cta', { opacity: 0, y: 20, duration: 0.7, stagger: 0.12, delay: 0.9 });
      gsap.to('.hero-copy', { yPercent: 22, opacity: 0.18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

      if (!reduced) {
        const intersectionTimeline = gsap.timeline({ scrollTrigger: { trigger: '.intersection', start: 'top top', end: 'bottom bottom', scrub: 0.75 } });
        intersectionTimeline
          .fromTo('.axis-tech', { xPercent: -230 }, { xPercent: 0, ease: 'power2.inOut' }, 0)
          .fromTo('.axis-innovation', { yPercent: 520 }, { yPercent: 0, ease: 'power2.inOut' }, 0)
          .fromTo('.axis-plus', { scale: 0, rotate: -45 }, { scale: 1, rotate: 0, ease: 'back.out(1.7)' }, 0.28)
          .fromTo('.intersection-kicker', { opacity: 0, y: -24 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.54)
          .fromTo('.manifesto-support', { opacity: 0, y: 42 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.68)
          .to('.intersection-grid b', { scale: 0.45, opacity: 0.5, ease: 'power2.out' }, 0.28);
      }

      gsap.from('.intro-copy .word', { yPercent: 115, stagger: 0.025, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.intro', start: 'top 70%' } });
      gsap.fromTo('.intro-photo', { clipPath: 'inset(12% 12% 12% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: '.intro-photo', start: 'top 88%', end: 'top 28%', scrub: true } });

      const workTrack = document.querySelector<HTMLElement>('.work-track');
      const work = document.querySelector<HTMLElement>('.work');
      if (workTrack && work && !reduced) {
        const distance = () => Math.max(0, workTrack.scrollWidth - window.innerWidth);
        gsap.to(workTrack, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: work, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.9, invalidateOnRefresh: true } });
      }

      const experienceSection = document.querySelector<HTMLElement>('.experience');
      const experiencePath = document.querySelector<SVGPathElement>('.experience-path-progress');
      const experienceRunner = document.querySelector<SVGGElement>('.experience-runner');
      const experienceNodes = gsap.utils.toArray<HTMLElement>('.experience-node');
      if (experienceSection && experiencePath && experienceRunner) {
        const length = experiencePath.getTotalLength();
        gsap.set(experiencePath, { strokeDasharray: length, strokeDashoffset: reduced ? 0 : length });
        const placeRunner = (progress: number) => {
          const point = experiencePath.getPointAtLength(length * progress);
          experienceRunner.setAttribute('transform', `translate(${point.x} ${point.y})`);
          experienceNodes.forEach((node, index) => {
            const stop = index / Math.max(1, experienceNodes.length - 1);
            const proximity = Math.max(0, 1 - Math.abs(progress - stop) * 3.2);
            gsap.set(node, { opacity: reduced ? 1 : 0.24 + proximity * 0.76, scale: reduced ? 1 : 0.96 + proximity * 0.04 });
          });
        };
        placeRunner(reduced ? 1 : 0);
        if (!reduced) {
          const pathState = { progress: 0 };
          gsap.to(pathState, {
            progress: 1,
            ease: 'none',
            onUpdate: () => {
              gsap.set(experiencePath, { strokeDashoffset: length * (1 - pathState.progress) });
              placeRunner(pathState.progress);
            },
            scrollTrigger: { trigger: experienceSection, start: 'top top', end: 'bottom bottom', scrub: 0.65 },
          });
        }
      }

      const mentoring = document.querySelector<HTMLElement>('.mentoring');
      const mentorStage = document.querySelector<HTMLElement>('.mentor-stage');
      if (mentoring && mentorStage && !reduced) {
        const mentorTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: mentoring,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.9,
            onUpdate: (self) => setMentorIndex(Math.min(6, Math.floor(self.progress * 6) + 1)),
          },
        });
        mentorTimeline
          .to('.mentor-progress i', { scaleX: 1, ease: 'none' }, 0)
          .fromTo('.mentor-primary', { scale: 0.82, yPercent: 18, rotate: -2 }, { scale: 1, yPercent: 0, rotate: 0, ease: 'power2.out' }, 0)
          .fromTo('.mentor-card--one', { xPercent: -150, yPercent: 18, scale: 0.68, rotate: -9 }, { xPercent: 0, yPercent: 0, scale: 1, rotate: -3, ease: 'power2.out' }, 0.16)
          .fromTo('.mentor-card--two', { xPercent: 145, yPercent: 35, scale: 0.62, rotate: 8 }, { xPercent: 0, yPercent: 0, scale: 1, rotate: 2, ease: 'power2.out' }, 0.3)
          .fromTo('.mentor-card--three', { xPercent: -120, yPercent: 70, scale: 0.58, rotate: -7 }, { xPercent: 0, yPercent: 0, scale: 1, rotate: 2, ease: 'power2.out' }, 0.43)
          .fromTo('.mentor-card--four', { xPercent: 125, yPercent: 80, scale: 0.54, rotate: 9 }, { xPercent: 0, yPercent: 0, scale: 1, rotate: -2, ease: 'power2.out' }, 0.55)
          .to('.mentor-primary', { scale: 0.9, xPercent: -18, yPercent: -9, ease: 'power2.inOut' }, 0.48)
          .to('.mentoring-copy, .mentor-card:not(.mentor-final), .mentor-progress', { opacity: 0, y: -24, ease: 'power2.in' }, 0.72)
          .fromTo('.mentor-final', { clipPath: 'inset(100% 0 0 0)', scale: 1.12 }, { clipPath: 'inset(0% 0 0 0)', scale: 1, ease: 'power3.inOut' }, 0.7);

        let dragging = false;
        let startX = 0;
        let startScroll = 0;
        const onPointerDown = (event: PointerEvent) => {
          dragging = true;
          startX = event.clientX;
          startScroll = window.scrollY;
          mentorStage.classList.add('is-dragging');
          mentorStage.setPointerCapture(event.pointerId);
        };
        const onPointerMove = (event: PointerEvent) => {
          if (!dragging) return;
          lenis.scrollTo(startScroll + (startX - event.clientX) * 4.2, { immediate: true });
        };
        const stopDragging = () => {
          dragging = false;
          mentorStage.classList.remove('is-dragging');
        };
        mentorStage.addEventListener('pointerdown', onPointerDown);
        mentorStage.addEventListener('pointermove', onPointerMove);
        mentorStage.addEventListener('pointerup', stopDragging);
        mentorStage.addEventListener('pointercancel', stopDragging);
        removeMentorDrag = () => {
          mentorStage.removeEventListener('pointerdown', onPointerDown);
          mentorStage.removeEventListener('pointermove', onPointerMove);
          mentorStage.removeEventListener('pointerup', stopDragging);
          mentorStage.removeEventListener('pointercancel', stopDragging);
        };
      }

      const contactPath = document.querySelector<SVGPathElement>('.contact-signal-path');
      if (contactPath) {
        const length = contactPath.getTotalLength();
        gsap.set(contactPath, { strokeDasharray: length, strokeDashoffset: reduced ? 0 : length });
        if (!reduced) gsap.to(contactPath, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top 82%', end: 'top 18%', scrub: 0.7 } });
      }
      if (!reduced) gsap.from('.contact-orbit', { scale: 0.35, rotate: -80, opacity: 0, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.contact', start: 'top 54%', end: 'top 12%', scrub: 0.7 } });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 87%' } });
      });
      gsap.to('.page-progress', { scaleX: 1, ease: 'none', transformOrigin: 'left', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.1 } });
    }, root);

    const timer = window.setTimeout(() => setLoaded(true), 850);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 1000);
    return () => { clearTimeout(timer); clearTimeout(refresh); removeMentorDrag(); ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (!active) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setActive(null); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', close);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', close); };
  }, [active]);

  const introWords = 'I’m a full stack software engineer building products, systems, and developer tools.'.split(' ');

  return (
    <div ref={root} className="site">
      <div className={`loader ${loaded ? 'done' : ''}`}><span>NQ.</span><i /></div>
      <div className="page-progress" />

      <nav className="site-nav">
        <a href="#top" className="logo">NOORA QASIM</a>
        <div className="nav-links"><a href="#work">WORK</a><a href="#about">ABOUT</a></div>
        <a href="mailto:nooraqasimwork@gmail.com" className="nav-action">LET&apos;S TALK <ArrowUpRight size={17} /></a>
      </nav>

      <main>
        <section className="hero" id="top">
          <p className="hero-role">SOFTWARE ENGINEER · FULL STACK DEVELOPER · SYSTEMS BUILDER · TECH MENTOR</p>
          <div className="hero-copy">
            <h1 aria-label="Noora Qasim"><span className="hero-line"><span>NOORA</span></span><span className="hero-line"><span>QASIM</span></span></h1>
            <a className="hero-cta" href="#work"><span>VIEW WORK</span><ArrowDown /></a>
          </div>
        </section>

        <section className="intersection">
          <div className="manifesto-sticky">
            <div className="intersection-grid" aria-hidden="true"><i /><i /><b /></div>
            <div className="intersection-copy" aria-label="At the intersection of tech and innovation. Building things and helping people build theirs.">
              <p className="intersection-kicker">AT THE INTERSECTION OF</p>
              <div className="axis-lockup"><span className="axis-tech">TECH</span><span className="axis-plus">+</span><span className="axis-innovation">INNOVATION</span></div>
              <p className="manifesto-support">Building things and helping people build theirs.</p>
            </div>
          </div>
        </section>

        <section className="intro" id="about">
          <div className="intro-copy" aria-label="I’m a full stack software engineer building products, systems, and developer tools.">
            {introWords.map((word, index) => <span className="word-wrap" key={`${word}-${index}`}><span className="word">{word}&nbsp;</span></span>)}
          </div>
          <div className="intro-bottom">
            <div className="intro-photo"><img src="/noora.png" alt="Noora Qasim" /></div>
            <div className="intro-bio" data-reveal><p>I build full stack products, systems, and developer tools. I lead small teams, work across the stack, and mentor at Reboot Coding Institute.</p><strong>500+ students mentored</strong></div>
          </div>
        </section>

        <section className="grain-story"><div className="grain-sticky"><KineticScene /></div></section>

        <section className="work" id="work">
          <div className="work-track">
            <div className="work-cover work-panel"><h2>SELECTED<br />WORK.</h2><ArrowUpRight /></div>
            {projects.map((project) => (
              <article className="project work-panel" key={project.id} style={{ '--project-bg': project.color, '--project-ink': project.ink } as CSSProperties}>
                <div className="project-head"><span>{project.type}</span><span>{project.year}</span></div>
                <span className="project-watermark" aria-hidden="true">{project.id}</span>
                <div className="project-layout">
                  <div className="project-body"><h3>{project.title}</h3><p>{project.body}</p><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
                </div>
                <button onClick={() => setActive(project)}>VIEW PROJECT <ArrowUpRight /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="experience">
          <div className="experience-sticky">
            <h2>EXPERIENCE.</h2>
            <svg className="experience-path" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true"><path className="experience-path-base" d="M 70 115 C 285 35 335 290 505 310 S 705 600 935 535" /><path className="experience-path-progress" d="M 70 115 C 285 35 335 290 505 310 S 705 600 935 535" /><g className="experience-runner"><circle className="runner-halo" r="19" /><circle className="runner-core" r="7" /></g></svg>
            <div className="experience-list">{experience.map((item) => <article className="experience-node" key={item.role}><time>{item.date}</time><h3>{item.role}</h3><p>{item.company}</p></article>)}</div>
          </div>
        </section>

        <section className="mentoring">
          <div className="mentoring-sticky">
            <div className="mentoring-copy"><h2>MENTORSHIP.</h2><p>Workshops, hackathons, and technical mentorship for more than 500 students.</p></div>
            <div className="mentor-stage" aria-label="Mentorship gallery. Scroll or drag to move through the photographs.">
              <figure className="mentor-card mentor-primary"><img src="/aics-workshop.jpeg" alt="Noora presenting an AI security workshop at AICS" /><figcaption>AICS WORKSHOP</figcaption></figure>
              <figure className="mentor-card mentor-card--one"><img src="/build-hackathon.jpeg" alt="Noora leading the Build Hackathon" /><figcaption>BUILD HACKATHON</figcaption></figure>
              <figure className="mentor-card mentor-card--two"><img src="/speaking.jpeg" alt="Noora speaking with a microphone" /><figcaption>SPEAKING</figcaption></figure>
              <figure className="mentor-card mentor-card--three"><img src="/mentoring-in-action.jpeg" alt="Developers working together during a mentoring session" /><figcaption>MENTORING IN ACTION</figcaption></figure>
              <figure className="mentor-card mentor-card--four"><img src="/startup-mentoring.gif" alt="Noora at the startup mentorship program" /><figcaption>STARTUP MENTORING</figcaption></figure>
              <figure className="mentor-card mentor-final"><img src="/startup-team.jpeg" alt="Noora with the startup event team" /><figcaption>STARTUP TEAM</figcaption></figure>
            </div>
            <div className="mentor-progress"><span>{String(mentorIndex).padStart(2, '0')} / 06</span><div><i /></div><span>SCROLL OR DRAG</span></div>
          </div>
        </section>

        <section className="contact" id="contact">
          <svg className="contact-signal" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><path className="contact-signal-path" d="M 0 90 C 250 90 260 360 540 360 S 850 610 1165 535" /></svg>
          <h2 data-reveal>GET IN<br />TOUCH.</h2>
          <div className="contact-orbit"><span>LET&apos;S BUILD SOMETHING USEFUL</span><a href="mailto:nooraqasimwork@gmail.com" className="contact-button">EMAIL ME <ArrowUpRight /></a></div>
          <a className="contact-email" href="mailto:nooraqasimwork@gmail.com">NOORAQASIMWORK@GMAIL.COM</a>
          <footer><span>NOORA QASIM © 2026</span><div><a href="https://github.com/NooraWael" target="_blank" rel="noreferrer">GITHUB</a><a href="https://www.linkedin.com/in/nooraqasim" target="_blank" rel="noreferrer">LINKEDIN</a></div></footer>
        </section>
      </main>

      {active && <dialog open className="modal" aria-modal="true" aria-label={`${active.title} project details`} onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }}><div className={`modal-card ${'media' in active ? 'modal-card--visual' : ''}`} style={{ '--project-bg': active.color, '--project-ink': active.ink } as CSSProperties}><button className="modal-close" onClick={() => setActive(null)} aria-label="Close project"><X /></button><div className="modal-copy"><span>{active.type} / {active.year}</span><h2>{active.title}</h2><p>{active.body}</p><strong>{active.proof}</strong></div>{'media' in active && <div className="modal-gallery"><img src={active.media[0]} alt={active.mediaAlt} /><img src={active.media[1]} alt={`${active.mediaAlt}, detail view`} /></div>}<div className="modal-meta"><span>{active.role}</span><span>{active.stack.join(' · ')}</span></div><div className="modal-actions"><a href={active.link} target="_blank" rel="noreferrer">{active.action} <ArrowUpRight /></a>{'secondaryLink' in active && <a href={active.secondaryLink} target="_blank" rel="noreferrer">{active.secondaryAction} <ArrowUpRight /></a>}</div></div></dialog>}
    </div>
  );
}
