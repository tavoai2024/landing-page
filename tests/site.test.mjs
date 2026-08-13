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
  for (const sectionId of ['healthcare', 'capabilities', 'performance', 'getting-started']) {
    assert.match(app, new RegExp(`id=["']${sectionId}["']`));
    assert.match(app, new RegExp(`href=["']/?#${sectionId}["']`));
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

test('explains outcome-based pricing', () => {
  assert.match(app, /Outcome-based pricing/);
  assert.match(app, /Results shape what you pay\./);
  assert.match(app, /Pay for resolved outcomes/);
  for (const outcome of ['Appointments filled', 'Revenue increasing', 'Patient experience improved', 'Costs reduced']) {
    assert.ok(app.includes(`after: '${outcome}'`), `missing performance outcome: ${outcome}`);
  }
  assert.match(app, /Appointments missed/);
  assert.match(app, /outcome-chart/);
});

test('uses outcome-specific performance animations', () => {
  assert.match(app, /calendar-animation/);
  assert.match(app, /revenue-animation/);
  assert.match(app, /patient-animation/);
  assert.match(app, /cost-animation/);
  assert.match(css, /@keyframes calendar-fill/);
  assert.match(css, /@keyframes revenue-line-draw/);
  assert.match(css, /@keyframes patient-smile-in/);
  assert.match(css, /@keyframes patient-heart-float/);
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
  assert.equal(app.match(/src="\/tavo41_logo\.svg"/g)?.length, 3);
  assert.doesNotMatch(app, /import \{ LogoMark \}/);
  assert.match(html, /href="\/tavo41_icon\.png"/);
});

test('provides one primary book-demo trigger', () => {
  assert.equal(app.match(/id="hero-book-demo-btn"/g)?.length, 1);
  assert.equal(app.match(/book-demo-btn/g)?.length, 1);
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
