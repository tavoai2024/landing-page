import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  Headphones,
  Menu,
  MessageSquareText,
  PhoneCall,
  PhoneIncoming,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const serviceMarkets = [
  {
    icon: Building2,
    accentColor: 'var(--accent)',
    accentDim: 'var(--accent-dim)',
    tag: 'Real Estate',
    title: 'Leasing & Real Estate',
    body: 'Never lose a prospect to voicemail. The assistant answers availability questions, qualifies renters or buyers, schedules tours, and routes urgent maintenance or sales calls — around the clock.',
    bullets: [
      'Tour booking & rescheduling',
      'Lead qualification & capture',
      'After-hours coverage',
      'Maintenance call routing',
    ],
  },
  {
    icon: Car,
    accentColor: 'var(--blue)',
    accentDim: 'var(--blue-dim)',
    tag: 'Automotive',
    title: 'Dealerships & Service Centers',
    body: 'Turn every inbound call into a booked appointment. Qualify vehicle inquiries, schedule test drives or service visits, and send serious leads straight to the right desk.',
    bullets: [
      'Test drive scheduling',
      'Service appointment booking',
      'Trade-in inquiry triage',
      'Hot lead escalation',
    ],
  },
  {
    icon: Users,
    accentColor: 'var(--purple)',
    accentDim: 'var(--purple-dim)',
    tag: 'Property Management',
    title: 'Property Management Teams',
    body: 'Handle high call volume without adding headcount. Answer tenant questions, collect move-in details, process maintenance requests, and confirm upcoming inspections automatically.',
    bullets: [
      'Tenant inquiry handling',
      'Maintenance request intake',
      'Inspection reminders',
      'Vacancy availability updates',
    ],
  },
];

const howItWorksSteps = [
  {
    step: '01',
    icon: MessageSquareText,
    title: 'We learn your business',
    body: 'We map your services, pricing, hours, locations, staff preferences, booking rules, and common edge cases — everything needed to represent your business the right way.',
    detail: 'No generic scripts. Every assistant is built around how your business actually operates.',
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'We build & test your voice assistant',
    body: 'Your custom voice assistant is configured, trained on your exact protocols, and tested across real call scenarios before going live — no surprises on day one.',
    detail: 'Fast, hassle-free deployment from kickoff to live calls.',
  },
  {
    step: '03',
    icon: PhoneIncoming,
    title: 'Your assistant starts answering calls',
    body: 'Once approved, the assistant handles inbound calls 24/7 — answering questions, booking appointments, capturing details, and escalating to your team when needed.',
    detail: 'Your callers get a natural, human-quality conversation every single time.',
  },
  {
    step: '04',
    icon: Zap,
    title: 'You control everything from the dashboard',
    body: 'Review calls, appointments, lead notes, and follow-ups from one secure workspace. Update your assistant\'s knowledge anytime — changes go live instantly.',
    detail: 'Full visibility into every conversation. No black boxes.',
  },
];

const businessOutcomes = [
  { value: '24/7', label: 'coverage for incoming calls' },
  { value: '< 1 min', label: 'typical lead capture window' },
  { value: '0', label: 'technical setup from your team' },
];

const conversationMessages = [
  { speaker: 'Assistant', message: 'Hello, thank you for calling Parkview Residences. How can I help you today?', side: 'left' },
  { speaker: 'Caller', message: 'Hi, I\'d like to schedule a tour for a 2-bedroom unit.', side: 'right' },
  { speaker: 'Assistant', message: 'Absolutely! We have availability this week. Do you prefer a morning or afternoon tour?', side: 'left' },
  { speaker: 'Caller', message: 'Morning works — maybe tomorrow around 10?', side: 'right' },
  { speaker: 'Assistant', message: 'Perfect. I\'m holding that slot. Can I get your name and best contact number?', side: 'left' },
  { speaker: 'Caller', message: 'Jordan Lee, 555-0148.', side: 'right' },
  { speaker: 'Assistant', message: 'All set, Jordan! Your tour is confirmed for tomorrow at 10 AM. Our team will be ready for you.', side: 'left' },
];

/* Team placeholder data — fill in your own details */
const teamMembers = [
  {
    id: 'team-member-1',
    name: 'Your Name',
    title: 'Co-Founder & CEO',
    bio: 'Add a short bio here — your background, what you built before, and why you started tavo41. 2–3 sentences works great.',
    initials: 'YN',
    accentColor: 'var(--accent)',
    accentDim: 'var(--accent-dim)',
  },
  {
    id: 'team-member-2',
    name: 'Your Name',
    title: 'Co-Founder & CTO',
    bio: 'Add a short bio here — your technical background, previous experience, and what you are building at tavo41.',
    initials: 'YN',
    accentColor: 'var(--blue)',
    accentDim: 'var(--blue-dim)',
  },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const openDemo = () => { setDemoOpen(true); setMobileNavOpen(false); };
  const closeOverlays = () => { setDemoOpen(false); };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,rgba(79,255,176,0.12),transparent_28%),linear-gradient(180deg,#0d1117_0%,#090b10_100%)] text-[var(--text)]">

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(10,12,16,0.88)] backdrop-blur">
        <nav className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-6 max-[760px]:px-4">
          <a href="#home" className="flex items-center gap-3" aria-label="tavo41 home">
            <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-[var(--accent)] text-[#091015]">
              <PhoneCall className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="font-[var(--font-serif)] text-3xl leading-none">tavo41</div>
              <div className="mt-1 text-[11px] uppercase text-[var(--text2)]">AI Voice Receptionist</div>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-[14px] text-[var(--text2)] md:flex">
            <a className="transition-colors hover:text-[var(--text)]" href="#platform">Platform</a>
            <a className="transition-colors hover:text-[var(--text)]" href="#solutions">Solutions</a>
            <a className="transition-colors hover:text-[var(--text)]" href="#how-it-works">How It Works</a>
            <a className="transition-colors hover:text-[var(--text)]" href="#company">Company</a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={openDemo}
              id="nav-book-demo-btn"
              className="inline-flex items-center gap-1.5 justify-center rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 py-2.5 text-[13px] font-semibold text-[#091015] transition-all hover:bg-[var(--accent2)] hover:shadow-[0_0_20px_rgba(79,255,176,0.35)]"
            >
              Book a Demo
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border2)] text-[var(--text2)] md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {mobileNavOpen && (
          <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 md:hidden">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-3">
              <a className="py-2 text-[14px] text-[var(--text2)]" href="#platform" onClick={() => setMobileNavOpen(false)}>Platform</a>
              <a className="py-2 text-[14px] text-[var(--text2)]" href="#solutions" onClick={() => setMobileNavOpen(false)}>Solutions</a>
              <a className="py-2 text-[14px] text-[var(--text2)]" href="#how-it-works" onClick={() => setMobileNavOpen(false)}>How It Works</a>
              <a className="py-2 text-[14px] text-[var(--text2)]" href="#company" onClick={() => setMobileNavOpen(false)}>Company</a>
              <div className="grid grid-cols-1 gap-3 pt-2">
                <button
                  type="button"
                  onClick={openDemo}
                  className="rounded-[var(--radius-sm)] bg-[var(--accent)] px-4 py-2 text-[13px] font-semibold text-[#091015]"
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="home">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="mx-auto grid w-full max-w-[1240px] grid-cols-[1.1fr_0.9fr] gap-10 px-6 pb-20 pt-16 max-[980px]:grid-cols-1 max-[760px]:px-4 max-[760px]:pt-10">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(79,255,176,0.22)] bg-[rgba(79,255,176,0.08)] px-3 py-1.5 text-[12px] font-medium text-[var(--accent)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              24/7 AI voice assistant — deployed fast
            </div>
            <h1 className="max-w-[14ch] font-[var(--font-serif)] text-[clamp(3rem,7.5vw,6.2rem)] leading-[0.93]">
              Every call answered. Every lead captured.
            </h1>
            <p className="mt-7 max-w-[56ch] text-[17px] leading-[1.85] text-[var(--text2)]">
              tavo41 gives leasing offices, real estate agencies, and dealerships a voice assistant that answers calls, books appointments, qualifies leads, and keeps your team focused on deals — day and night.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                id="hero-book-demo-btn"
                onClick={openDemo}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--accent)] px-6 py-3.5 text-[14px] font-semibold text-[#091015] transition-all hover:bg-[var(--accent2)] hover:shadow-[0_0_28px_rgba(79,255,176,0.4)]"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center rounded-[var(--radius)] border border-[var(--border2)] px-6 py-3.5 text-[14px] font-medium text-[var(--text2)] transition-colors hover:bg-[var(--surface2)] hover:text-[var(--text)]"
              >
                See how it works
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-5 text-[12px] text-[var(--text3)]">
              {[
                { icon: Clock, label: 'Fast deployment' },
                { icon: ShieldCheck, label: 'No IT setup required' },
                { icon: Headphones, label: 'Natural-sounding conversations' },
                { icon: Calendar, label: 'Real calendar integration' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Hero call card */}
          <div className="rounded-[28px] border border-[rgba(255,255,255,0.09)] bg-[linear-gradient(135deg,rgba(79,255,176,0.12),rgba(79,159,255,0.05))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.36)] max-[760px]:rounded-[20px]">
            <div className="rounded-[22px] border border-[var(--border2)] bg-[rgba(9,11,16,0.72)] p-5 max-[760px]:rounded-[16px]">
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-5">
                <div>
                  <div className="text-[13px] text-[var(--text2)]">Live assistant call</div>
                  <div className="mt-1 font-[var(--font-serif)] text-3xl">New appointment request</div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-[var(--accent-dim)] text-[var(--accent)]">
                  <PhoneCall className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <div className="conversation-thread py-5">
                {conversationMessages.map((item, index) => (
                  <div
                    key={`${item.speaker}-${index}`}
                    className={`conversation-bubble ${item.side === 'right' ? 'conversation-bubble-right' : 'conversation-bubble-left'}`}
                    style={{ '--conversation-delay': `${index * 0.3}s` } as React.CSSProperties}
                  >
                    <div className="text-[11px] uppercase text-[var(--text3)]">{item.speaker}</div>
                    <div className="mt-1 text-[13px] leading-6 text-[var(--text)]">{item.message}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-5 max-[560px]:grid-cols-1">
                {businessOutcomes.map((item) => (
                  <div key={item.label} className="rounded-[var(--radius)] border border-[var(--border)] bg-[rgba(255,255,255,0.025)] p-4">
                    <div className="font-[var(--font-serif)] text-3xl text-[var(--text)]">{item.value}</div>
                    <div className="mt-1 text-[12px] leading-5 text-[var(--text2)]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SOLUTIONS ─────────────────────────────────────────────────────── */}
        <section id="solutions" className="border-y border-[var(--border)] bg-[rgba(18,21,28,0.5)]">
          <div className="mx-auto w-full max-w-[1240px] px-6 py-20 max-[760px]:px-4">
            <div className="max-w-[760px]">
              <div className="mb-3 text-[13px] font-medium uppercase tracking-widest text-[var(--accent)]">Who we serve</div>
              <h2 className="font-[var(--font-serif)] text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.97]">
                Built for businesses where every call is a real opportunity.
              </h2>
              <p className="mt-5 text-[16px] leading-[1.85] text-[var(--text2)]">
                No apps for your customers to download. No scripts for your staff to memorize. The assistant speaks naturally, gathers the right details, and makes the next step clear — on every call.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
              {serviceMarkets.map(({ icon: Icon, accentColor, accentDim, tag, title, body, bullets }) => (
                <article
                  key={title}
                  className="group relative flex flex-col rounded-[var(--radius-lg)] border border-[var(--border2)] bg-[var(--surface)] p-7 transition-all hover:border-[rgba(255,255,255,0.16)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                >
                  {/* Subtle glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${accentDim}, transparent 70%)` }}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div className="mb-2 inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest"
                      style={{ borderColor: accentColor + '33', color: accentColor, background: accentDim }}>
                      {tag}
                    </div>

                    <div className="mb-5 mt-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius)] text-[var(--text)]"
                      style={{ background: accentDim }}>
                      <Icon className="h-6 w-6" style={{ color: accentColor }} aria-hidden="true" />
                    </div>

                    <h3 className="text-[20px] font-semibold text-[var(--text)]">{title}</h3>
                    <p className="mt-3 text-[14px] leading-[1.8] text-[var(--text2)]">{body}</p>

                    <ul className="mt-6 space-y-2.5">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-[13px] text-[var(--text2)]">
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: accentColor }} aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            {/* CTA banner */}
            <div className="mt-12 flex flex-col items-center rounded-[var(--radius-lg)] border border-[rgba(79,255,176,0.18)] bg-[rgba(79,255,176,0.05)] px-8 py-10 text-center">
              <div className="font-[var(--font-serif)] text-[clamp(1.6rem,3.5vw,2.4rem)]">
                Ready to stop missing calls?
              </div>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.8] text-[var(--text2)]">
                See how tavo41 handles your calls, books your calendar, and delivers lead details to your team — live, in a 30-minute demo.
              </p>
              <button
                type="button"
                id="solutions-book-demo-btn"
                onClick={openDemo}
                className="mt-7 inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--accent)] px-7 py-3.5 text-[14px] font-semibold text-[#091015] transition-all hover:bg-[var(--accent2)] hover:shadow-[0_0_28px_rgba(79,255,176,0.4)]"
              >
                Book a Free Demo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* ── PLATFORM ──────────────────────────────────────────────────────── */}
        <section id="platform" className="mx-auto grid w-full max-w-[1240px] grid-cols-[0.85fr_1.15fr] gap-12 px-6 py-20 max-[980px]:grid-cols-1 max-[760px]:px-4">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-[var(--blue-dim)] text-[var(--blue)]">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="font-[var(--font-serif)] text-[clamp(2.1rem,5vw,4.25rem)] leading-[0.97]">
              Tailored to the way your business actually runs.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.85] text-[var(--text2)]">
              We take in the details that make your business unique — then build a voice assistant that follows your rules, improves with your updates, and works the way your team already operates. No cookie-cutter templates.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
            <div className="rounded-[var(--radius-lg)] border border-[var(--border2)] bg-[var(--surface)] p-5">
              <div className="mb-4 text-[11px] uppercase tracking-widest text-[var(--text3)]">What we learn from you</div>
              <div className="space-y-3">
                {[
                  'Services, pricing, hours, and locations',
                  'Tour, appointment, or test-drive booking rules',
                  'Staff preferences and escalation paths',
                  'Common questions, edge cases, and follow-up notes',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[14px] leading-6 text-[var(--text2)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--blue)]" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[rgba(79,255,176,0.16)] bg-[rgba(79,255,176,0.06)] p-5">
              <div className="mb-4 text-[11px] uppercase tracking-widest text-[var(--text3)]">What your AI delivers</div>
              <div className="space-y-3">
                {[
                  'A voice assistant tailored to how your business works',
                  'Conversations that follow your booking and qualification rules',
                  'Clean lead notes, appointment details, and handoffs',
                  'Ongoing improvements as you update the dashboard',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[14px] leading-6 text-[var(--text2)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section id="how-it-works" className="border-t border-[var(--border)] bg-[rgba(18,21,28,0.45)]">
          <div className="mx-auto w-full max-w-[1240px] px-6 py-20 max-[760px]:px-4">
            <div className="mb-14 grid grid-cols-[0.9fr_1.1fr] gap-12 max-[980px]:grid-cols-1">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-[var(--purple-dim)] text-[var(--purple)]">
                  <Headphones className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mb-3 text-[13px] font-medium uppercase tracking-widest text-[var(--purple)]">How It Works</div>
                <h2 className="font-[var(--font-serif)] text-[clamp(2.1rem,5vw,4.25rem)] leading-[0.97]">
                  From kickoff to live calls with minimal friction.
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-[16px] leading-[1.85] text-[var(--text2)]">
                  Simple for your team. Familiar for your customers. We handle the entire setup and configuration — you just review and approve before anything goes live.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {howItWorksSteps.map(({ step, icon: Icon, title, body, detail }) => (
                <div
                  key={step}
                  className="group flex gap-6 rounded-[var(--radius-lg)] border border-[var(--border2)] bg-[var(--surface)] p-6 transition-all hover:border-[rgba(255,255,255,0.15)] hover:bg-[var(--surface2)] max-[640px]:flex-col"
                >
                  <div className="flex shrink-0 flex-col items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-[14px] font-bold text-[#091015]">
                      {step}
                    </div>
                    <div className="h-full w-px bg-[var(--border)] max-[640px]:hidden" aria-hidden="true" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface3)] text-[var(--text2)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-[18px] font-semibold text-[var(--text)]">{title}</h3>
                    </div>
                    <p className="mt-3 text-[14px] leading-[1.8] text-[var(--text2)]">{body}</p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--surface3)] px-3 py-1.5 text-[12px] text-[var(--text3)]">
                      <Sparkles className="h-3 w-3 text-[var(--accent)]" aria-hidden="true" />
                      {detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPANY ───────────────────────────────────────────────────────── */}
        <section id="company" className="border-t border-[var(--border)]">
          <div className="mx-auto w-full max-w-[1240px] px-6 py-20 max-[760px]:px-4">

            {/* Section header */}
            <div className="mb-16 grid grid-cols-[1fr_1fr] gap-12 max-[980px]:grid-cols-1 max-[980px]:gap-6">
              <div>
                <div className="mb-3 text-[13px] font-medium uppercase tracking-widest text-[var(--accent)]">About tavo41</div>
                <h2 className="font-[var(--font-serif)] text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.97]">
                  Built by people who understand service businesses.
                </h2>
              </div>
              <div className="flex items-center">
                <p className="text-[16px] leading-[1.85] text-[var(--text2)]">
                  We started tavo41 because we watched leasing offices, real estate teams, and dealerships lose leads every day to missed calls and slow follow-ups. We knew AI could change that — so we built it.
                </p>
              </div>
            </div>

            {/* Team cards */}
            <div className="grid grid-cols-2 gap-6 max-[760px]:grid-cols-1">
              {teamMembers.map(({ id, name, title, bio, initials, accentColor, accentDim }) => (
                <div
                  key={id}
                  id={id}
                  className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border2)] bg-[var(--surface)] p-7 transition-all hover:border-[rgba(255,255,255,0.14)]"
                >
                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${accentDim}, transparent 70%)` }}
                    aria-hidden="true"
                  />
                  <div className="relative flex gap-5">
                    {/* Avatar placeholder — swap with <img> once you have a photo */}
                    <div
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[var(--radius)] text-[22px] font-bold text-[#091015] shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                      style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)` }}
                      aria-label={`${name} avatar placeholder`}
                    >
                      {initials}
                    </div>
                    <div>
                      {/* Replace "Your Name" and "Title" below with actual info */}
                      <div className="font-[var(--font-serif)] text-[22px] leading-tight text-[var(--text)]">{name}</div>
                      <div className="mt-1 text-[13px] font-medium" style={{ color: accentColor }}>{title}</div>
                    </div>
                  </div>
                  {/* Replace placeholder bio with your actual bio */}
                  <p className="relative mt-5 text-[14px] leading-[1.8] text-[var(--text2)]">{bio}</p>
                </div>
              ))}
            </div>

            {/* Values strip */}
            <div className="mt-12 grid grid-cols-3 gap-5 max-[760px]:grid-cols-1">
              {[
                { icon: Zap, label: 'Speed to deployment', body: 'From kickoff to live calls quickly and seamlessly — no engineering work required on your end.' },
                { icon: ShieldCheck, label: 'Reliability you can count on', body: 'Your assistant never calls in sick, never puts a customer on hold, and never misses a detail.' },
                { icon: Headphones, label: 'Human-quality conversations', body: 'Natural, confident voice interactions that reflect your brand and keep your callers comfortable.' },
              ].map(({ icon: Icon, label, body }) => (
                <div key={label} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent-dim)] text-[var(--accent)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="text-[15px] font-semibold text-[var(--text)]">{label}</div>
                  <p className="mt-2 text-[13px] leading-[1.75] text-[var(--text2)]">{body}</p>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="mt-16 flex flex-col items-center gap-5 rounded-[var(--radius-lg)] border border-[rgba(79,255,176,0.18)] bg-[rgba(79,255,176,0.05)] px-8 py-12 text-center">
              <div className="font-[var(--font-serif)] text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1]">
                See tavo41 handle a real call. Live.
              </div>
              <p className="max-w-[52ch] text-[15px] leading-[1.8] text-[var(--text2)]">
                In 30 minutes, we'll walk through your current call flow, show you exactly how the assistant handles it, and answer every question you have.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  id="footer-book-demo-btn"
                  onClick={openDemo}
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--accent)] px-8 py-4 text-[15px] font-semibold text-[#091015] transition-all hover:bg-[var(--accent2)] hover:shadow-[0_0_32px_rgba(79,255,176,0.45)]"
                >
                  Book a Free Demo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] text-[var(--text3)]">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />No commitment required</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />Fast deployment process</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />Zero IT setup needed</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] bg-[rgba(10,12,16,0.9)]">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-6 py-7 text-[13px] text-[var(--text2)] max-[760px]:flex-col max-[760px]:items-start max-[760px]:px-4">
          <div className="flex items-center gap-2 font-medium text-[var(--text)]">
            <PhoneCall className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
            tavo41 AI Voice Receptionist
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
            Secure customer data and operations
          </div>
        </div>
      </footer>

      {/* ── MODALS ──────────────────────────────────────────────────────────── */}
      {demoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.65)] px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true">
          <button className="absolute inset-0 cursor-default" type="button" aria-label="Close dialog" onClick={closeOverlays} />
          <div className="relative w-full max-w-[480px] rounded-[24px] border border-[var(--border2)] bg-[rgba(18,21,28,0.98)] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={closeOverlays}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border2)] text-[var(--text2)] transition-colors hover:bg-[var(--surface2)] hover:text-[var(--text)]"
              aria-label="Close"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="mb-7 pr-10">
              <div className="font-[var(--font-serif)] text-4xl">Book a Demo</div>
              <p className="mt-2 text-[14px] leading-6 text-[var(--text2)]">
                See how tavo41 answers calls, books your calendar, and delivers lead details to your team — in 30 minutes.
              </p>
            </div>

            <div className="space-y-3">
              {[
                'Walk through your current call flow and missed-call challenges.',
                'See how the assistant handles booking, lead capture, and escalation.',
                'Map the dashboard controls your team would use day to day.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface2)] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                  <span className="text-[14px] leading-6 text-[var(--text2)]">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="mailto:tavoai2024@gmail.com?subject=tavo41%20Demo%20Request"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--accent)] px-4 py-3 text-[14px] font-semibold text-[#091015] transition-all hover:bg-[var(--accent2)]"
            >
              Email to book demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
