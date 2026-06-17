/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor */

const { useState, useEffect, useMemo, useRef } = React;

const CATEGORIES = window.CATEGORIES;
const DURATIONS = window.DURATIONS;
const SERVICES = window.SERVICES;
const SUPPORT_ADDONS = window.SUPPORT_ADDONS;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light"
}/*EDITMODE-END*/;

/* ============================================================
   Icon primitives — simple geometric strokes only
   ============================================================ */
const Icon = {
  arrowUR: (p) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 12 L12 4" />
      <path d="M6 4 L12 4 L12 10" />
    </svg>
  ),
  search: (p) => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
      <circle cx="7" cy="7" r="5" />
      <path d="M11 11 L14 14" />
    </svg>
  ),
  plus: (p) => (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
      <path d="M8 3 V13 M3 8 H13" />
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12 L10 17 L19 7" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <path d="M4 4 L12 12 M12 4 L4 12" />
    </svg>
  ),
  phone: (p) => (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 4 C3 3 4 2 5 2 H6 L7.5 5 L6 6.5 C7 8.5 8.5 10 10.5 11 L12 9.5 L15 11 V12 C15 13 14 14 13 14 C7 14 3 10 3 4 Z" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="4" width="12" height="9" rx="1.5" />
      <path d="M2 5 L8 9.5 L14 5" />
    </svg>
  ),
  web: (p) => (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="8" cy="8" r="6" />
      <ellipse cx="8" cy="8" rx="3" ry="6" />
      <path d="M2 8 H14" />
    </svg>
  ),
  pin: (p) => (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 14 C8 14 13 9.5 13 6 A5 5 0 0 0 3 6 C3 9.5 8 14 8 14 Z" />
      <circle cx="8" cy="6" r="1.8" />
    </svg>
  ),
  brain: (p) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 4 A3 3 0 0 0 6 7 A2.5 2.5 0 0 0 4 9.5 A2.5 2.5 0 0 0 5 11.5 A2.5 2.5 0 0 0 4 13.5 A3 3 0 0 0 7 16.5 V18 A3 3 0 0 0 12 20 V4 A3 3 0 0 0 9 4 Z" />
      <path d="M15 4 A3 3 0 0 1 18 7 A2.5 2.5 0 0 1 20 9.5 A2.5 2.5 0 0 1 19 11.5 A2.5 2.5 0 0 1 20 13.5 A3 3 0 0 1 17 16.5 V18 A3 3 0 0 1 12 20" />
    </svg>
  ),
  chart: (p) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 19 H20" />
      <path d="M4 16 L9 11 L13 14 L20 6" />
      <path d="M15 6 L20 6 L20 11" />
    </svg>
  ),
  rupee: (p) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 6 H17" />
      <path d="M7 10 H17" />
      <path d="M7 6 C13 6 14 14 7 14 L14 20" />
    </svg>
  ),
  leaf: (p) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 19 C5 11 11 5 19 5 C19 13 13 19 5 19 Z" />
      <path d="M5 19 L12 12" />
    </svg>
  ),
};

/* ============================================================
   Brand mark
   ============================================================ */
function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {/* triangle "A" with rising stroke through it */}
      <path d="M8 24 L16 8 L24 24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 19 H21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M21 13 L27 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M23 7 L27 7 L27 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ============================================================
   Navigation
   ============================================================ */
function Nav({ onBook }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top">
          <div className="brand-mark"><BrandMark /></div>
          <div className="brand-text">
            <span className="name">AIMaargam</span>
            <span className="sub">AI-based transformation</span>
          </div>
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#support">Support</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-cta" onClick={onBook}>Book a consultation</button>
      </div>
    </nav>
  );
}

/* ============================================================
   Hero
   ============================================================ */
function Hero({ onBook }) {
  return (
    <header className="hero shell" id="top">
      <div className="hero-eyebrow">AIMaargam Private Limited · Innovating today</div>
      <h1>
        AI transformation for businesses.<br />
        <span className="serif">Real impact.</span> Real growth.
      </h1>
      <p className="hero-lede">
        Twenty focused services, plus deep advisory and platform partnerships,
        engineered to take an organization from first conversation to
        full enterprise AI adoption.
      </p>
      <div className="hero-ctas">
        <button className="btn btn-primary" onClick={onBook}>
          Book a consultation
          <span className="arrow">→</span>
        </button>
        <a className="btn btn-ghost" href="#services">
          Browse services
        </a>
      </div>

      <div className="hero-meta">
        <div>
          <div className="k">Core services</div>
          <div className="v">20</div>
        </div>
        <div>
          <div className="k">Support offerings</div>
          <div className="v">10</div>
        </div>
        <div>
          <div className="k">Engagement range</div>
          <div className="v">Days → 18 mo</div>
        </div>
        <div>
          <div className="k">Sectors</div>
          <div className="v">Industry-wide</div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   Pillars
   ============================================================ */
function Pillars() {
  const items = [
    { glyph: <Icon.brain />,  title: "Smarter decisions",   desc: "Data, models, and dashboards that turn instinct into evidence." },
    { glyph: <Icon.chart />,  title: "Higher efficiency",   desc: "Automation across the workflows that take up the most time." },
    { glyph: <Icon.rupee />,  title: "Lower costs",         desc: "AI that pays for itself through measurable operational lift." },
    { glyph: <Icon.leaf />,   title: "Sustainable growth",  desc: "Capability built in-house, not dependency built in." },
  ];
  return (
    <section className="pillars shell" style={{ marginBottom: 0 }}>
      {items.map((it, i) => (
        <div className="pillar" key={i}>
          <div className="pillar-glyph">{it.glyph}</div>
          <h3>{it.title}</h3>
          <p>{it.desc}</p>
        </div>
      ))}
    </section>
  );
}

/* ============================================================
   Filter chips
   ============================================================ */
function Chips({ items, activeIds, onToggle, getCount }) {
  return (
    <div className="filter-row" style={{ flex: 1 }}>
      {items.map((it) => {
        const active = activeIds.includes(it.id);
        const count = getCount ? getCount(it.id) : null;
        return (
          <button
            key={it.id}
            className={"chip " + (active ? "active" : "")}
            onClick={() => onToggle(it.id)}
          >
            <span>{it.label}</span>
            {count != null && <span className="count">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   Service catalog
   ============================================================ */
function Catalog({ onBook }) {
  const [query, setQuery] = useState("");
  const [cats, setCats] = useState([]);
  const [durs, setDurs] = useState([]);
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => {
      if (cats.length && !cats.includes(s.category)) return false;
      if (durs.length) {
        const matched = durs.some((dId) => {
          const d = DURATIONS.find((x) => x.id === dId);
          return d && d.match(s.duration);
        });
        if (!matched) return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        const blob = (s.name + " " + s.scope + " " + s.detail + " " + s.support).toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [query, cats, durs]);

  const catCount = (id) => SERVICES.filter((s) => s.category === id).length;
  const durCount = (id) => {
    const d = DURATIONS.find((x) => x.id === id);
    return d ? SERVICES.filter((s) => d.match(s.duration)).length : 0;
  };

  const toggle = (arr, setter, v) =>
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearAll = () => { setQuery(""); setCats([]); setDurs([]); };
  const hasFilter = query.length > 0 || cats.length > 0 || durs.length > 0;

  const catColor = (id) => (CATEGORIES.find((c) => c.id === id) || {}).color;
  const catLabel = (id) => (CATEGORIES.find((c) => c.id === id) || {}).label;

  return (
    <section className="section shell" id="services">
      <div className="sec-head">
        <div>
          <div className="sec-eyebrow">The catalog</div>
          <h2>Twenty services to <span className="serif">transform</span> your business.</h2>
        </div>
        <p className="blurb">
          Filter by category, engagement length, or search by what you're trying to solve.
          Open any service for scope, deliverables, and how the engagement runs.
        </p>
      </div>

      <div className="filters">
        <div className="filter-row">
          <div className="filter-label">Category</div>
          <Chips
            items={CATEGORIES}
            activeIds={cats}
            onToggle={(id) => toggle(cats, setCats, id)}
            getCount={catCount}
          />
        </div>
        <div className="filter-row">
          <div className="filter-label">Duration</div>
          <Chips
            items={DURATIONS}
            activeIds={durs}
            onToggle={(id) => toggle(durs, setDurs, id)}
            getCount={durCount}
          />
          <div className="search">
            <span className="search-icon"><Icon.search /></span>
            <input
              placeholder="Search services…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="results-meta">
        <span>{filtered.length} of {SERVICES.length} services</span>
        {hasFilter && <button onClick={clearAll}>Clear filters</button>}
      </div>

      <div className="service-list" role="list">
        {filtered.map((s) => (
          <ServiceRow
            key={s.id}
            service={s}
            open={openId === s.id}
            onToggle={() => setOpenId(openId === s.id ? null : s.id)}
            catColor={catColor(s.category)}
            catLabel={catLabel(s.category)}
            onBook={onBook}
          />
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="big">Nothing matches that combination.</div>
            <div>Try removing a filter, or <button style={{background:"none", border:0, color:"var(--accent-ink)", textDecoration:"underline", cursor:"pointer", font:"inherit"}} onClick={clearAll}>clear all</button>.</div>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceRow({ service, open, onToggle, catColor, catLabel, onBook }) {
  return (
    <>
      <div
        className={"service " + (open ? "open" : "")}
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
      >
        <div className="service-num">{String(service.id).padStart(2, "0")}</div>
        <div className="service-title">
          <div className="name">{service.name}</div>
          <div className="scope">{service.scope}</div>
        </div>
        <div className="service-cat" style={{ "--cat-color": catColor }}>{catLabel}</div>
        <div className="service-dur">{service.duration}</div>
        <div className="service-chev"><Icon.plus /></div>
      </div>

      {open && (
        <div className="service-detail">
          <div className="detail-grid">
            <div className="detail-block" style={{ gridColumn: "1 / -1" }}>
              <div className="k">What it is</div>
              <div className="v">{service.detail}</div>
            </div>
            <div className="detail-block">
              <div className="k">Deliverables</div>
              <ul className="v" style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
                {service.deliverables.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
            <div className="detail-block">
              <div className="k">Support provided</div>
              <div className="v">{service.support}</div>
              <div className="k" style={{ marginTop: 18 }}>Typical timeline</div>
              <div className="v">{service.duration}</div>
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); onBook(service); }} style={{ justifyContent: "center" }}>
              Talk to us about this <span className="arrow">→</span>
            </button>
            <button className="btn btn-ghost" onClick={(e) => { e.stopPropagation(); onToggle(); }} style={{ justifyContent: "center" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   Additional support grid
   ============================================================ */
function Support() {
  return (
    <section className="section shell" id="support">
      <div className="sec-head">
        <div>
          <div className="sec-eyebrow">Beyond the catalog</div>
          <h2>Additional support <span className="serif">AIMaargam</span> can offer.</h2>
        </div>
        <p className="blurb">
          Wraparound capabilities that complement the core catalog — advisory,
          academic partnership, security, ongoing care.
        </p>
      </div>

      <div className="support-grid">
        {SUPPORT_ADDONS.map((a, i) => (
          <div className="support-card" key={i}>
            <div className="support-num">{String(i + 1).padStart(2, "0")}</div>
            <h4>{a.name}</h4>
            <p>{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Approach
   ============================================================ */
function Approach() {
  const steps = [
    { n: "01", t: "Listen",     d: "We start with your problem in your language. No frameworks pushed before context." },
    { n: "02", t: "Map",        d: "We trace the work end-to-end and locate where AI removes friction without breaking what already works." },
    { n: "03", t: "Pilot",      d: "Small, scoped, measurable. We ship something real and learn from it before scaling." },
    { n: "04", t: "Scale",      d: "Adoption that lasts: training, governance, and the operating model around the technology." },
  ];
  return (
    <section className="section shell" id="approach">
      <div className="sec-head">
        <div>
          <div className="sec-eyebrow">How we work</div>
          <h2>An <span className="serif">approach</span> built around your business, not ours.</h2>
        </div>
      </div>
      <div className="pillars" style={{ borderTop: 0 }}>
        {steps.map((s, i) => (
          <div className="pillar" key={i} style={{ borderTop: "1px solid var(--line)" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--muted)" }}>{s.n}</div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CTA + Contact
   ============================================================ */
function CTAContact({ onBook }) {
  return (
    <section className="cta-band shell" id="contact">
      <div className="cta-inner">
        <div>
          <h2>
            Let's build your<br />
            <span className="serif">AI-powered future.</span>
          </h2>
          <p className="cta-tag">Explore. Transform. Succeed.</p>
        </div>
        <div className="contact-card">
          <div className="contact-row">
            <div className="ic"><Icon.phone /></div>
            <div>
              <div className="label">Phone</div>
              <div className="val">8939659911</div>
            </div>
          </div>
          <div className="contact-row">
            <div className="ic"><Icon.mail /></div>
            <div>
              <div className="label">Email</div>
              <div className="val">dinesh.praveen.d@gmail.com</div>
            </div>
          </div>
          <div className="contact-row">
            <div className="ic"><Icon.web /></div>
            <div>
              <div className="label">Web</div>
              <div className="val">www.aimaargam.com</div>
            </div>
          </div>
          <div className="contact-row">
            <div className="ic"><Icon.pin /></div>
            <div>
              <div className="label">Company</div>
              <div className="val">AIMaargam Private Limited</div>
            </div>
          </div>
          <button className="contact-cta" onClick={() => onBook()}>
            Book a consultation
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Booking modal
   ============================================================ */
function BookingModal({ open, prefillService, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", interest: "", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setForm((f) => ({ ...f, interest: prefillService ? prefillService.name : "" }));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, prefillService]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const onBack = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className="modal-back" onClick={onBack}>
      <div className="modal" ref={dialogRef} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon.close /></button>
        {!submitted ? (
          <>
            <h3>Book a <span className="serif">consultation</span></h3>
            <p className="sub">Tell us a little about what you're trying to do. We'll come back within one working day.</p>
            <form className="modal-form" onSubmit={submit}>
              <div className="field">
                <label>Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </div>
              <div className="field">
                <label>Company</label>
                <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Organization" />
              </div>
              <div className="field full">
                <label>Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
              </div>
              <div className="field full">
                <label>Service of interest</label>
                <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                  <option value="">Not sure yet — let's discuss</option>
                  {SERVICES.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="field full">
                <label>What you'd like to discuss</label>
                <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Optional — a few lines of context." />
              </div>
              <div className="modal-foot full">
                <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Request consultation <span className="arrow">→</span></button>
              </div>
            </form>
          </>
        ) : (
          <div className="success">
            <div className="check"><Icon.check /></div>
            <h3>Thank you, <span className="serif">{form.name || "we'll be in touch"}</span>.</h3>
            <p className="sub" style={{ maxWidth: "36ch", margin: "8px auto 24px" }}>
              We've noted your interest{form.interest ? ` in ${form.interest}` : ""}.
              Someone from the team will reach out within one working day.
            </p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Tweaks panel
   ============================================================ */
function Tweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme via data attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
  }, [t.theme]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme">
        <TweakRadio
          label="Color mode"
          value={t.theme}
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "gradient", label: "Gradient" },
          ]}
          onChange={(v) => setTweak("theme", v)}
        />
        <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, marginTop: 4 }}>
          Gradient brings back the purple → blue → teal accents from the original poster.
        </div>
      </TweakSection>
    </TweaksPanel>
  );
}

/* ============================================================
   App root
   ============================================================ */
function App() {
  const [bookingFor, setBookingFor] = useState(undefined); // undefined = closed; null or service = open

  const openBooking = (service) => setBookingFor(service || null);
  const closeBooking = () => setBookingFor(undefined);

  return (
    <>
      <Nav onBook={() => openBooking()} />
      <Hero onBook={() => openBooking()} />
      <Pillars />
      <Catalog onBook={openBooking} />
      <Approach />
      <Support />
      <CTAContact onBook={openBooking} />
      <footer className="footer">
        <div className="shell footer-inner">
          <div>© AIMaargam Private Limited. Innovating today, transforming tomorrow.</div>
          <div className="footer-meta">aimaargam.com</div>
        </div>
      </footer>

      <BookingModal
        open={bookingFor !== undefined}
        prefillService={bookingFor}
        onClose={closeBooking}
      />

      <Tweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
