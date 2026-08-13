import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [app, css] = await Promise.all([
  readFile(new URL('../src/App.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
]);
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('focuses the voice-agent proposition on healthcare', () => {
  for (const phrase of [
    'Better access starts with every call.',
    'Medical groups',
    'Specialty practices',
    'Independent clinics',
    'New appointment request',
  ]) {
    assert.match(app, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('keeps every primary navigation target available', () => {
  for (const sectionId of ['healthcare', 'capabilities', 'impact', 'getting-started']) {
    assert.match(app, new RegExp(`id=["']${sectionId}["']`));
    assert.ok(app.includes(`href="#${sectionId}"`));
    assert.ok(app.includes(`openSection(event, '${sectionId}')`));
  }
  assert.match(app, />Who we serve</);
});

test('consolidates core capabilities and removes the platform section', () => {
  for (const capability of ['Appointment management', 'Patient intake', 'Practice questions', 'Reminders & follow-up', 'Smart call routing', 'Call visibility']) {
    assert.ok(app.includes(`title: '${capability}'`), `missing capability: ${capability}`);
  }
  assert.doesNotMatch(app, /id="platform"|The platform/);
  assert.doesNotMatch(app, /24\/7.*coverage for incoming calls|typical lead capture window|Natural-sounding conversations/i);
});

test('presents operational impacts without pricing language', () => {
  assert.match(app, /Operational impact/);
  assert.match(app, /Make every call count\./);
  assert.match(app, /Fill appointments, grow revenue, improve patient experience, and reduce administrative work\./);
  assert.doesNotMatch(app, /pricing|pay for|software seats|Results shape what you pay/i);
  for (const outcome of ['Appointments filled', 'Revenue increasing', 'Patient experience improved', 'Costs reduced']) {
    assert.ok(app.includes(`after: '${outcome}'`), `missing impact outcome: ${outcome}`);
  }
  assert.match(app, /Appointments missed/);
  assert.match(app, /outcome-chart/);
});

test('uses outcome-specific impact animations', () => {
  assert.match(app, /calendar-animation/);
  assert.match(app, /revenue-animation/);
  assert.match(app, /patient-animation/);
  assert.match(app, /cost-animation/);
  assert.match(css, /@keyframes calendar-fill/);
  assert.match(css, /@keyframes revenue-line-draw/);
  assert.doesNotMatch(app, /revenue-arrow/);
  assert.match(css, /\.revenue-line\s*\{[^}]*stroke-width:\s*3/s);
  assert.doesNotMatch(css, /revenue-arrow/);
  assert.match(css, /@keyframes patient-smile-in/);
  assert.match(css, /@keyframes patient-heart-float/);
});

test('cycles impact and getting-started states from scroll progress', () => {
  assert.match(app, /useRef/);
  assert.match(app, /impactSectionRef/);
  assert.match(app, /journeySectionRef/);
  assert.match(app, /getBoundingClientRect\(\)/);
  assert.match(app, /rect\.height - \(viewportHeight - headerOffset\)/);
  assert.match(app, /addEventListener\('scroll', scheduleUpdate, \{ passive: true \}\)/);
  assert.match(app, /window\.requestAnimationFrame\(updateScrollStates\)/);
  assert.match(app, /setActiveOutcome\(impactIndex\)/);
  assert.match(app, /setJourneyStep\(journeyIndex\)/);
  assert.doesNotMatch(app, /window\.setInterval/);
  assert.equal(app.match(/className="scroll-story-stage/g)?.length, 2);
  assert.match(css, /\.scroll-story\s*\{[^}]*height:\s*400vh/s);
  assert.match(css, /\.scroll-story-stage\s*\{[^}]*position:\s*sticky[^}]*top:\s*72px[^}]*height:\s*calc\(100vh - 72px\)/s);
  assert.match(css, /\.getting-started-stage/);
});

test('book-demo and contact actions open a dedicated contact page', () => {
  assert.match(app, /\?page=contact/);
  assert.match(app, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(app, /className="contact-page"/);
  for (const field of ['contact-name', 'contact-email', 'contact-phone', 'contact-message']) {
    assert.match(app, new RegExp(`id=["']${field}["']`));
  }
  assert.match(app, /id="contact-email"[^>]+required/);
  assert.doesNotMatch(app, /id="contact-phone"[^>]+required/);
  assert.match(app, /Do not include patient names, medical details/);
  assert.match(app, /encodeURIComponent/);
});

test('earthy design tokens and typography are defined', () => {
  for (const token of ['#f1efe8', '#c8d4b8', '#30372d', 'Manrope', 'IBM Plex Mono']) {
    assert.ok(css.includes(token), `missing design token: ${token}`);
  }
});

test('uses the supplied tavo41 logo in the site chrome', () => {
  assert.match(app, /const siteBase = import\.meta\.env\.BASE_URL/);
  assert.match(app, /const logoUrl = `\$\{siteBase\}tavo41_logo\.svg`/);
  assert.equal(app.match(/src=\{logoUrl\}/g)?.length, 3);
  assert.doesNotMatch(app, /src="\/tavo41_logo\.svg"/);
  assert.doesNotMatch(app, /import \{ LogoMark \}/);
  assert.match(html, /href="\/tavo41_icon\.png"/);
});

test('keeps navigation and the contact control stable on GitHub Pages', () => {
  assert.doesNotMatch(app, /href="\/(?:#|\")/);
  assert.match(app, /href=\{siteBase\}/);
  assert.match(app, /const openSection =/);
  assert.match(app, /window\.history\.pushState\(\{\}, '', `\$\{siteBase\}#\$\{sectionId\}`\)/);
  assert.match(app, /setContactPage\(false\)/);
  assert.match(app, /scrollIntoView\(\{ behavior, block: 'start' \}\)/);
  assert.match(app, /prefers-reduced-motion: reduce/);

  const contactRule = css.match(/\.nav-contact\s*\{([^}]+)\}/)?.[1] ?? '';
  assert.match(contactRule, /align-self:\s*center/);
  assert.match(contactRule, /min-height:\s*48px/);
  assert.match(contactRule, /padding:\s*0 24px/);
});

test('provides one primary hero demo trigger', () => {
  assert.equal(app.match(/id="hero-book-demo-btn"/g)?.length, 1);
  assert.equal(app.match(/book-demo-btn/g)?.length, 1);
});

test('keeps a responsive floating demo CTA available outside the contact page', () => {
  assert.equal(app.match(/className="button button-dark floating-cta"/g)?.length, 1);
  assert.match(app, /\{!contactPage && \([\s\S]*className="button button-dark floating-cta"[\s\S]*href="\?page=contact"[\s\S]*onClick=\{openContactPage\}/);
  assert.match(app, /CalendarCheck className="floating-cta-icon"/);

  const floatingRule = css.match(/\.floating-cta\s*\{([^}]+)\}/)?.[1] ?? '';
  assert.match(floatingRule, /position:\s*fixed/);
  assert.match(floatingRule, /z-index:\s*35/);
  assert.match(floatingRule, /env\(safe-area-inset-bottom\)/);
  assert.match(css, /@media \(max-width: 860px\)[\s\S]*\.floating-cta\s*\{[^}]*width:\s*52px[^}]*height:\s*52px[^}]*border-radius:\s*50%/);
  assert.match(css, /@media \(max-width: 860px\)[\s\S]*\.floating-cta span,[\s\S]*\.floating-cta-arrow\s*\{[^}]*display:\s*none/);
  assert.match(css, /@media \(max-width: 860px\)[\s\S]*\.floating-cta-icon\s*\{[^}]*display:\s*block/);
});

test('avoids decorative numbering and repeated benefit cards', () => {
  assert.doesNotMatch(app, />0[1-4]\s*\//);
  assert.doesNotMatch(app, /card-number/);
  assert.doesNotMatch(app, /Fast setup|Reliable coverage|Natural conversations/);
});

test('animates the live-call indicator with a reduced-motion fallback', () => {
  assert.match(css, /\.live-indicator i\s*\{/);
  assert.match(css, /animation: live-pulse/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('shows a dismissible slider hint without a hero status light', () => {
  assert.match(app, /slider-hint/);
  assert.match(app, /setJourneyTouched\(true\)/);
  assert.doesNotMatch(app, /className="status-dot"/);
});

test('presents a four-stage interactive journey beginning at step zero', () => {
  for (const title of ['Discover tavo41', 'Contact & plan', 'Build & test', 'Go live']) {
    assert.ok(app.includes(`title: '${title}'`), `missing journey step: ${title}`);
  }
  assert.doesNotMatch(app, /Step 0 complete/);
  assert.match(app, /type="range"/);
  assert.match(app, /setJourneyStep/);
  assert.match(app, /className="celebration"/);
  assert.match(css, /url\('\/tavo-mark\.svg'\)/);
  assert.match(css, /writing-mode: vertical-lr/);
});

test('responsive and motion-safe states are present', () => {
  assert.match(css, /@media \(max-width: 860px\)/);
  assert.match(css, /@media \(max-width: 580px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /button:focus-visible/);
});
