// ── Nav shadow + scroll spy (single rAF-throttled handler) ──
const nav = document.querySelector('.nav');
const navAs = document.querySelectorAll('.nav-links a');
function setActive(href) { navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === href)); }
function spy() {
  const y = scrollY, bot = document.body.scrollHeight - innerHeight;
  if (y >= bot - 40) { setActive('#contact'); return; }
  if (y < 80) { setActive('#top'); return; }
  const contact = document.getElementById('contact');
  const approach = document.getElementById('approach');
  const services = document.getElementById('services');
  if (contact && y >= contact.offsetTop - 140) { setActive('#contact'); return; }
  if (approach && y >= approach.offsetTop - 140) { setActive('#approach'); return; }
  if (services && y >= services.offsetTop - 140) { setActive('#services'); return; }
  setActive('#top');
}
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    nav.classList.toggle('scrolled', scrollY > 4);
    spy();
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true }); spy();

// ── Scroll reveal ──────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.r').forEach(el => obs.observe(el));
// Safety: reveal anything still hidden after 400ms
setTimeout(() => document.querySelectorAll('.r:not(.in)').forEach(el => el.classList.add('in')), 400);

// ── Drawer ──────────────────────────────────────────
const drawer = document.getElementById('drawer');
const openD = () => { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; };
const closeD = () => { drawer.classList.remove('open'); document.body.style.overflow = ''; };
document.getElementById('burger').onclick = openD;
document.getElementById('drawer-close').onclick = closeD;
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeD));
  