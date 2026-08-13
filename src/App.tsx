import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent } from 'react';
import {
  ArrowRight,
  BellRing,
  CalendarCheck,
  ChartNoAxesCombined,
  Check,
  CircleHelp,
  FileText,
  HeartPulse,
  Hospital,
  Mail,
  Menu,
  PartyPopper,
  PiggyBank,
  Route,
  SmilePlus,
  Settings2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  X,
} from 'lucide-react';

const healthcareTeams = [
  {
    icon: Hospital,
    title: 'Medical groups',
    body: 'Give every location consistent patient access without expanding the call center.',
  },
  {
    icon: Stethoscope,
    title: 'Specialty practices',
    body: 'Follow specialty-specific scheduling rules, preparation instructions, and routing needs.',
  },
  {
    icon: HeartPulse,
    title: 'Independent clinics',
    body: 'Reduce front-desk phone work while keeping access personal and responsive.',
  },
];

const coreCapabilities = [
  {
    icon: CalendarCheck,
    title: 'Appointment management',
    body: 'Book, reschedule, and cancel appointments using your scheduling rules.',
  },
  {
    icon: FileText,
    title: 'Patient intake',
    body: 'Capture contact details, visit reasons, and required information before handoff.',
  },
  {
    icon: CircleHelp,
    title: 'Practice questions',
    body: 'Answer common questions about hours, locations, preparation, and policies.',
  },
  {
    icon: BellRing,
    title: 'Reminders & follow-up',
    body: 'Confirm visits and reconnect with patients who need another appointment.',
  },
  {
    icon: Route,
    title: 'Smart call routing',
    body: 'Escalate urgent or complex requests to the right person with useful context.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Call visibility',
    body: 'Review conversations, outcomes, and next steps from one clear workspace.',
  },
];

const impactOutcomes = [
  { kind: 'appointments', icon: CalendarCheck, before: 'Appointments missed', after: 'Appointments filled', values: [24, 38, 54, 72, 92] },
  { kind: 'revenue', icon: TrendingUp, before: 'Revenue left behind', after: 'Revenue increasing', values: [20, 32, 49, 71, 94] },
  { kind: 'experience', icon: SmilePlus, before: 'Patient access friction', after: 'Patient experience improved', values: [26, 42, 58, 76, 90] },
  { kind: 'costs', icon: PiggyBank, before: 'Manual phone costs', after: 'Costs reduced', values: [94, 79, 61, 44, 27] },
];

const howItWorksSteps = [
  {
    icon: Sparkles,
    title: 'Discover tavo41',
    summary: 'You are here.',
    body: 'You completed Step 0 by exploring how tavo41 can improve your calls.',
  },
  {
    icon: Mail,
    title: 'Contact & plan',
    summary: 'Tell us what you need.',
    body: 'We learn your goals and map your questions, bookings, and handoff rules.',
  },
  {
    icon: Settings2,
    title: 'Build & test',
    summary: 'We handle the setup.',
    body: 'We tailor your assistant, connect your tools, and test real call scenarios.',
  },
  {
    icon: PartyPopper,
    title: 'Go live',
    summary: 'Start taking smarter calls.',
    body: 'Your assistant is ready to answer, book, qualify, and route calls. Yay!',
  },
];

const conversationMessages = [
  { speaker: 'Assistant', message: 'Thank you for calling Willow Health. How can I help today?', side: 'left' },
  { speaker: 'Patient', message: 'I need to schedule a follow-up with Dr. Chen.', side: 'right' },
  { speaker: 'Assistant', message: 'I can help with that. Are mornings or afternoons better?', side: 'left' },
  { speaker: 'Patient', message: 'Tuesday afternoon, if possible.', side: 'right' },
  { speaker: 'Assistant', message: 'There is an opening Tuesday at 2:30 PM. Would you like me to reserve it?', side: 'left' },
  { speaker: 'Patient', message: 'Yes, please.', side: 'right' },
  { speaker: 'Assistant', message: 'You’re booked. I’ll send a confirmation with the visit details.', side: 'left' },
];

const siteBase = import.meta.env.BASE_URL;
const logoUrl = `${siteBase}tavo41_logo.svg`;
type SectionId = 'healthcare' | 'capabilities' | 'impact' | 'getting-started';

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [journeyStep, setJourneyStep] = useState(0);
  const [journeyTouched, setJourneyTouched] = useState(false);
  const [activeOutcome, setActiveOutcome] = useState(0);
  const [contactPage, setContactPage] = useState(() => new URLSearchParams(window.location.search).get('page') === 'contact');
  const [formStarted, setFormStarted] = useState(false);
  const impactSectionRef = useRef<HTMLElement>(null);
  const journeySectionRef = useRef<HTMLElement>(null);

  const openContactPage = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState({}, '', '?page=contact');
    setContactPage(true);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: SectionId) => {
    event.preventDefault();
    window.history.pushState({}, '', `${siteBase}#${sectionId}`);
    setContactPage(false);
    setMobileNavOpen(false);

    const scrollToTarget = () => {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      document.getElementById(sectionId)?.scrollIntoView({ behavior, block: 'start' });
    };
    window.requestAnimationFrame(() => window.requestAnimationFrame(scrollToTarget));
  };

  useEffect(() => {
    const handlePopState = () => {
      setContactPage(new URLSearchParams(window.location.search).get('page') === 'contact');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (contactPage) return;

    let animationFrame = 0;
    const getScrollIndex = (section: HTMLElement | null, itemCount: number) => {
      if (!section) return null;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const headerOffset = window.innerWidth <= 860 ? 64 : 72;
      if (rect.top > headerOffset || rect.bottom < viewportHeight * 0.2) return null;

      const scrollDistance = Math.max(rect.height - (viewportHeight - headerOffset), viewportHeight * 0.75);
      const progress = Math.min(1, Math.max(0, (headerOffset - rect.top) / scrollDistance));
      return Math.min(itemCount - 1, Math.floor(progress * itemCount));
    };

    const updateScrollStates = () => {
      animationFrame = 0;
      const impactIndex = getScrollIndex(impactSectionRef.current, impactOutcomes.length);
      const journeyIndex = getScrollIndex(journeySectionRef.current, howItWorksSteps.length);

      if (impactIndex !== null) setActiveOutcome(impactIndex);
      if (journeyIndex !== null) {
        setJourneyStep(journeyIndex);
        if (journeyIndex > 0) setJourneyTouched(true);
      }
    };

    const scheduleUpdate = () => {
      if (animationFrame === 0) animationFrame = window.requestAnimationFrame(updateScrollStates);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
    };
  }, [contactPage]);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim().slice(0, 80);
    const phone = String(formData.get('phone') ?? '').trim().slice(0, 30);
    const email = String(formData.get('email') ?? '').trim().slice(0, 254);
    const message = String(formData.get('message') ?? '').trim().slice(0, 2000);
    const body = [`Name: ${name}`, `Email: ${email}`, phone ? `Phone: ${phone}` : '', '', message].filter(Boolean).join('\n');

    setFormStarted(true);
    window.location.href = `mailto:tavoai2024@gmail.com?subject=${encodeURIComponent(`tavo41 inquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <a className="brand" href={siteBase} aria-label="tavo41 home">
            <img className="brand-logo" src={logoUrl} alt="tavo41" />
          </a>
          <div className="desktop-nav">
            <a href="#healthcare" onClick={(event) => openSection(event, 'healthcare')}>Who we serve</a>
            <a href="#capabilities" onClick={(event) => openSection(event, 'capabilities')}>Capabilities</a>
            <a href="#impact" onClick={(event) => openSection(event, 'impact')}>Impact</a>
            <a href="#getting-started" onClick={(event) => openSection(event, 'getting-started')}>Getting started</a>
          </div>
          <a className="nav-contact" href="?page=contact" onClick={openContactPage}>Contact</a>
          <button
            className="mobile-menu-button"
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-navigation"
          >
            {mobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </nav>
        {mobileNavOpen && (
          <div className="mobile-nav" id="mobile-navigation">
            <a href="#healthcare" onClick={(event) => openSection(event, 'healthcare')}>Who we serve</a>
            <a href="#capabilities" onClick={(event) => openSection(event, 'capabilities')}>Capabilities</a>
            <a href="#impact" onClick={(event) => openSection(event, 'impact')}>Impact</a>
            <a href="#getting-started" onClick={(event) => openSection(event, 'getting-started')}>Getting started</a>
            <a className="mobile-contact" href="?page=contact" onClick={openContactPage}>Contact</a>
          </div>
        )}
      </header>

      {contactPage ? (
        <main className="contact-page" id="contact">
          <section className="contact-intro sage-panel">
            <div>
              <span className="mono-label">Contact tavo41</span>
              <h1>Let’s make patient access easier.</h1>
            </div>
            <p>Tell us about your organization and what you want to improve. We’ll respond using the email address you provide.</p>
          </section>
          <section className="contact-form-section">
            <div className="contact-form-aside">
              <img className="contact-logo" src={logoUrl} alt="tavo41" />
              <h2>Start a conversation.</h2>
              <p>This form is for business inquiries only. Do not include patient names, medical details, or urgent care requests.</p>
              <a className="text-link" href={siteBase}>Back to the website <ArrowRight aria-hidden="true" /></a>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit} onChange={() => setFormStarted(false)}>
              <div className="form-field">
                <label htmlFor="contact-name">Name <span>Required</span></label>
                <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={80} required />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email <span>Required</span></label>
                <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
              </div>
              <div className="form-field">
                <label htmlFor="contact-phone">Phone <span>Optional</span></label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30} pattern="[0-9+().\-\s]{7,30}" title="Enter a valid phone number" />
              </div>
              <div className="form-field form-field-wide">
                <label htmlFor="contact-message">Message <span>Required</span></label>
                <textarea id="contact-message" name="message" rows={7} maxLength={2000} required />
                <small>Please do not send protected health information.</small>
              </div>
              <button className="button button-dark form-submit" type="submit"><span>Send message</span><ArrowRight aria-hidden="true" /></button>
              {formStarted && <p className="form-status" role="status">Your email application should now open with your message ready to send.</p>}
            </form>
          </section>
        </main>
      ) : (
      <main id="home">
        <section className="hero section-border">
          <div className="hero-copy">
            <div className="eyebrow">Healthcare AI voice agent</div>
            <div className="hero-copy-inner">
              <h1>Better access starts with every call.</h1>
              <p>tavo41 helps healthcare teams answer patient calls, manage appointments, and resolve routine requests—without adding more work to the front desk.</p>
              <div className="button-row">
                <a className="button button-dark" id="hero-book-demo-btn" href="?page=contact" onClick={openContactPage}><span>Book a demo</span><ArrowRight aria-hidden="true" /></a>
                <a className="text-link" href="#getting-started">See how to get started <ArrowRight aria-hidden="true" /></a>
              </div>
            </div>
          </div>

          <div className="hero-demo">
            <div className="geometry" aria-hidden="true"><span /><span /><span /></div>
            <div className="call-card">
              <div className="call-card-header">
                <div><span className="mono-label">Live assistant call</span><h2>New appointment request</h2></div>
                <span className="live-indicator"><i /> Live</span>
              </div>
              <div className="conversation-thread" aria-label="Example voice assistant conversation">
                {conversationMessages.map((item, index) => (
                  <div
                    className={`conversation-bubble conversation-bubble-${item.side}`}
                    key={`${item.speaker}-${index}`}
                    style={{ '--conversation-delay': `${index * 0.16}s` } as CSSProperties}
                  >
                    <span>{item.speaker}</span><p>{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-border" id="healthcare">
          <div className="section-heading sage-panel">
            <span className="mono-label">Who we serve</span>
            <h2>Built for healthcare teams and their patients.</h2>
            <p>Flexible enough for different specialties, locations, and scheduling rules.</p>
          </div>
          <div className="card-grid three-column">
            {healthcareTeams.map(({ icon: Icon, title, body }) => (
              <article className="market-card" key={title}>
                <Icon className="card-icon" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="capabilities-section section-border" id="capabilities">
          <div className="capabilities-heading">
            <div>
              <span className="mono-label">Core capabilities</span>
              <h2>One voice agent for everyday patient access.</h2>
            </div>
            <p>Consolidate routine phone work into a single experience shaped around your practice.</p>
          </div>
          <div className="capabilities-grid">
            {coreCapabilities.map(({ icon: Icon, title, body }) => (
              <article className="capability-card" key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="scroll-story impact-scroll-story section-border" id="impact" ref={impactSectionRef} data-scroll-index={activeOutcome}>
          <div className="scroll-story-stage performance-section">
            <div className="performance-copy">
              <span className="mono-label">Operational impact</span>
              <TrendingUp aria-hidden="true" />
              <h2>Make every call count.</h2>
              <p>Fill appointments, grow revenue, improve patient experience, and reduce administrative work.</p>
            </div>
            <div className="outcome-visualizer">
              <div className="outcome-tabs" role="tablist" aria-label="Operational impacts">
                {impactOutcomes.map(({ icon: Icon, after }, index) => (
                  <button
                    key={after}
                    type="button"
                    role="tab"
                    aria-selected={activeOutcome === index}
                    className={activeOutcome === index ? 'outcome-tab outcome-tab-active' : 'outcome-tab'}
                    onClick={() => setActiveOutcome(index)}
                  >
                    <Icon aria-hidden="true" /><span>{after}</span>
                  </button>
                ))}
              </div>
              <div className="outcome-stage" role="tabpanel" aria-live="polite">
                <div className="outcome-transition">
                  <span>{impactOutcomes[activeOutcome].before}</span>
                  <ArrowRight aria-hidden="true" />
                  <strong>{impactOutcomes[activeOutcome].after}</strong>
                </div>
                <div className={`outcome-chart outcome-chart-${impactOutcomes[activeOutcome].kind}`} key={impactOutcomes[activeOutcome].after} aria-hidden="true">
                  {impactOutcomes[activeOutcome].kind === 'appointments' && (
                    <div className="calendar-animation">
                      <div className="calendar-top"><span /><strong>Appointments</strong><span /></div>
                      <div className="calendar-days">
                        {Array.from({ length: 14 }, (_, day) => (
                          <i className={day > 2 && day !== 7 && day !== 11 ? 'calendar-day-filled' : ''} key={day} style={{ '--fill-delay': `${day * 80}ms` } as CSSProperties}>
                            {day + 1}{day > 2 && day !== 7 && day !== 11 && <Check aria-hidden="true" />}
                          </i>
                        ))}
                      </div>
                    </div>
                  )}
                  {impactOutcomes[activeOutcome].kind === 'revenue' && (
                    <div className="revenue-animation">
                      <span>Revenue</span>
                      <svg viewBox="0 0 500 230" preserveAspectRatio="none">
                        <path className="revenue-gridline" d="M20 55H480M20 115H480M20 175H480" />
                        <path className="revenue-area" d="M28 198L125 177L220 148L315 111L405 68L470 28V215H28Z" />
                        <path className="revenue-line" d="M28 198L125 177L220 148L315 111L405 68L470 28" />
                        <circle cx="125" cy="177" r="5" /><circle cx="220" cy="148" r="5" /><circle cx="315" cy="111" r="5" /><circle cx="405" cy="68" r="5" />
                      </svg>
                    </div>
                  )}
                  {impactOutcomes[activeOutcome].kind === 'experience' && (
                    <div className="patient-animation">
                      <div className="patient-avatar">
                        <SmilePlus className="patient-smile-icon" />
                      </div>
                      <div className="patient-message"><Check aria-hidden="true" /> Request resolved</div>
                      <div className="patient-hearts"><i>♥</i><i>♥</i><i>♥</i></div>
                    </div>
                  )}
                  {impactOutcomes[activeOutcome].kind === 'costs' && (
                    <div className="cost-animation">
                      <span>Operating cost</span>
                      <div className="chart-grid"><i /><i /><i /><i /></div>
                      <div className="chart-bars">
                        {impactOutcomes[activeOutcome].values.map((value, index) => (
                          <i key={`${value}-${index}`} style={{ '--bar-height': `${value}%`, '--bar-delay': `${index * 90}ms` } as CSSProperties} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-story journey-scroll-story section-border" id="getting-started" ref={journeySectionRef} data-scroll-index={journeyStep}>
          <div className="scroll-story-stage getting-started-stage">
            <div className="journey-heading sage-panel">
              <div>
                <span className="mono-label">Getting started</span>
                <h2>Your path to smarter patient calls.</h2>
              </div>
            </div>
            <div
              className="journey-control"
              style={{ '--journey-progress': `${(journeyStep / (howItWorksSteps.length - 1)) * 100}%` } as CSSProperties}
            >
              <div className="journey-range-wrap">
                <label htmlFor="journey-range">Explore the setup journey</label>
                <div className={`slider-hint${journeyTouched ? ' slider-hint-hidden' : ''}`} aria-hidden="true">
                  <ArrowRight />
                </div>
                <input
                  id="journey-range"
                  className="journey-range"
                  type="range"
                  min="0"
                  max={howItWorksSteps.length - 1}
                  step="1"
                  value={journeyStep}
                  onChange={(event) => {
                    setJourneyStep(Number(event.currentTarget.value));
                    setJourneyTouched(true);
                  }}
                  aria-valuetext={`Step ${journeyStep}: ${howItWorksSteps[journeyStep].title}`}
                />
              </div>
              <ol className="journey-steps">
                {howItWorksSteps.map(({ icon: Icon, title, summary, body }, index) => (
                  <li className={`journey-step${index === journeyStep ? ' journey-step-active' : ''}${index === howItWorksSteps.length - 1 ? ' journey-step-ready' : ''}`} key={title}>
                    <button type="button" onClick={() => { setJourneyStep(index); setJourneyTouched(true); }} aria-expanded={index === journeyStep}>
                    <div className="journey-step-top">
                      <span>Step {index}</span>
                      <Icon aria-hidden="true" />
                    </div>
                    <h3>{title}</h3>
                    <p className="journey-summary">{summary}</p>
                    {index === journeyStep && <p className="journey-detail">{body}</p>}
                    {index === journeyStep && index === howItWorksSteps.length - 1 && (
                      <div className="celebration" aria-hidden="true">
                        <PartyPopper />
                        {Array.from({ length: 10 }, (_, particle) => <i key={particle} />)}
                      </div>
                    )}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section-border" id="company">
          <div className="section-heading sage-panel">
                <span className="mono-label">About tavo41</span>
            <h2>More time for patients. Less time managing phones.</h2>
            <p>tavo41 helps healthcare teams make access simpler, faster, and easier to manage.</p>
          </div>
        </section>
      </main>
      )}

      <footer className="site-footer">
        <a className="brand footer-brand" href={siteBase} aria-label="tavo41 home"><img className="brand-logo" src={logoUrl} alt="tavo41" /></a>
        <p>AI voice access for healthcare teams.</p>
        <div><ShieldCheck aria-hidden="true" />Designed for secure operations</div>
      </footer>
    </div>
  );
}
