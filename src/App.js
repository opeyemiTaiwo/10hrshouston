import { useState, useEffect, useRef } from "react";
import "./App.css";

const COLORS = {
  darkOlive: "#2C3527",
  deepGreen: "#1E2A1A",
  gold: "#D4883A",
  cyan: "#5CE0D8",
  white: "#FFFFFF",
  cream: "#F5F0E8",
  warmBlack: "#1A1A18",
  amber: "#E8A849",
};

/* ── Intersection observer hook ─────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.9s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.9s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Houston skyline SVG ────────────────────────────────── */
function HoustonSkyline({ opacity = 0.12, color = "#fff" }) {
  return (
    <svg
      viewBox="0 0 1440 500"
      style={{ position: "absolute", bottom: 0, width: "100%", opacity }}
      preserveAspectRatio="none"
    >
      <rect x="80" y="180" width="55" height="320" fill={color} />
      <rect x="150" y="100" width="35" height="400" fill={color} />
      <rect x="200" y="220" width="70" height="280" fill={color} />
      <rect x="290" y="60" width="28" height="440" fill={color} rx="2" />
      <rect x="330" y="140" width="65" height="360" fill={color} />
      <rect x="420" y="40" width="32" height="460" fill={color} />
      <rect x="465" y="160" width="80" height="340" fill={color} />
      <rect x="570" y="80" width="25" height="420" fill={color} />
      <rect x="610" y="120" width="90" height="380" fill={color} />
      <rect x="730" y="50" width="30" height="450" fill={color} />
      <rect x="775" y="190" width="60" height="310" fill={color} />
      <rect x="860" y="30" width="22" height="470" fill={color} rx="1" />
      <rect x="900" y="130" width="75" height="370" fill={color} />
      <rect x="1000" y="70" width="28" height="430" fill={color} />
      <rect x="1045" y="200" width="55" height="300" fill={color} />
      <rect x="1120" y="90" width="40" height="410" fill={color} />
      <rect x="1180" y="170" width="70" height="330" fill={color} />
      <rect x="1270" y="110" width="30" height="390" fill={color} />
      <rect x="1320" y="210" width="60" height="290" fill={color} />
      <rect x="1400" y="150" width="40" height="350" fill={color} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { label: "Purpose", href: "#purpose" },
    { label: "Seven Mountains", href: "#mountains" },
    { label: "Houston", href: "#houston" },
    { label: "Program", href: "#program" },
    { label: "Heritage", href: "#heritage" },
    { label: "Outcomes", href: "#outcomes" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${menuOpen ? "navbar--open" : ""}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#top" className="navbar__logo">
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="10 Hours Houston"
            className="navbar__logo-img"
          />
        </a>

        {/* Desktop Links */}
        <div className="navbar__links">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="navbar__link">
              {l.label}
            </a>
          ))}
          <a href="#register" className="navbar__cta">
            REGISTER NOW
          </a>
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`hamburger ${menuOpen ? "hamburger--active" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger__line" />
          <span className="hamburger__line" />
          <span className="hamburger__line" />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`navbar__overlay ${menuOpen ? "navbar__overlay--visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile slide-in menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}>
        <div className="navbar__mobile-header">
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="10 Hours Houston"
            className="navbar__mobile-logo"
          />
        </div>
        <div className="navbar__mobile-links">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="navbar__mobile-link"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a href="#register" onClick={() => setMenuOpen(false)} className="navbar__mobile-cta">
          REGISTER NOW
        </a>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />
      <HoustonSkyline opacity={0.1} />

      {/* Animated glow */}
      <div className="hero__glow" />

      <div className="hero__content">
        <div className="hero__text">
          <FadeIn>
            <p className="hero__subtitle">
              A NIGHT OF FIRE AND COMMISSIONING
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h1 className="hero__title">
              WITNESSES:
              <br />
              <span style={{ color: COLORS.cyan }}>AND THEY TOOK</span>
              <br />
              THE CITY
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="hero__desc">
              The Seven Mountains of Influence with Strategic Emphasis on
              Science & Technology
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p className="hero__meta">
              10 HOURS HOUSTON &nbsp;|&nbsp; GEN Z & YOUNG PROFESSIONALS
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.45}>
          <a href="#register" className="btn btn--primary btn--lg">
            REGISTER
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PURPOSE
   ═══════════════════════════════════════════════════════════ */
function Purpose() {
  return (
    <section id="purpose" className="section section--cream">
      <div className="container container--narrow text-center">
        <FadeIn>
          <p className="section__label">PURPOSE</p>
          <h2 className="section__title section__title--dark">
            AWAKEN. EQUIP. COMMISSION.
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="body-text">
            10 Hours Houston: Witnesses is a strategic spiritual convocation
            designed to awaken and commission a generation to take
            responsibility for the transformation of cities and nations across
            the seven mountains of influence — Faith, Family, Education,
            Government, Media, Arts & Culture, and Business. In this season,
            deliberate emphasis will be placed on the often-neglected mountain
            of Science and Technology as a critical arena for Kingdom impact.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="body-text">
            Participants will be equipped to function as authentic witnesses of
            Christ not only within church spaces, but across boardrooms,
            classrooms, research laboratories, policy environments, creative
            industries, digital platforms, and innovation ecosystems — carrying
            God's presence, wisdom, and power into the systems that shape
            culture and the future.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   THEME RATIONALE
   ═══════════════════════════════════════════════════════════ */
function ThemeRationale() {
  return (
    <section className="section section--dark section--skyline" style={{ padding: "120px 40px" }}>
      <div className="section__overlay" />
      <HoustonSkyline opacity={0.06} />
      <div className="container container--medium relative-z2">
        <FadeIn>
          <p className="section__label">THEME RATIONALE</p>
          <h2 className="section__title section__title--light" style={{ marginBottom: 48 }}>
            "WITNESSES: AND THEY
            <br />
            TOOK THE CITY"
          </h2>
        </FadeIn>
        <div className="theme-columns">
          <FadeIn delay={0.15} className="theme-column">
            <div className="theme-column__accent" />
            <p className="body-text body-text--light" style={{ margin: 0 }}>
              The theme is rooted in Acts 1:8 and the apostolic impact of the
              early Church on entire cities and civilizations. A witness is one
              who embodies and demonstrates the reality of Christ and His
              Kingdom in word, power, and lifestyle.
            </p>
          </FadeIn>
          <FadeIn delay={0.3} className="theme-column">
            <div className="theme-column__accent" />
            <p className="body-text body-text--light" style={{ margin: 0 }}>
              In the contemporary context, cities are shaped by interconnected
              systems — governance, education, media, business, culture, and
              increasingly, technology and digital infrastructure. To "take the
              city" in this generation is to establish Kingdom influence within
              these systems so that values, innovations, and policies reflect
              the wisdom and righteousness of God.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SEVEN MOUNTAINS
   ═══════════════════════════════════════════════════════════ */
const mountains = [
  { name: "Faith", desc: "Spiritual leadership and ecclesial influence", icon: "⛪" },
  { name: "Family", desc: "Foundations of society and generational legacy", icon: "🏠" },
  { name: "Education", desc: "Knowledge systems and intellectual formation", icon: "🎓" },
  { name: "Government", desc: "Policy, law, and civic leadership", icon: "🏛️" },
  { name: "Media", desc: "Communication and narrative shaping", icon: "📡" },
  { name: "Arts & Culture", desc: "Creative expression and cultural identity", icon: "🎨" },
  { name: "Business", desc: "Economic systems and marketplace influence", icon: "💼" },
];

function SevenMountains() {
  return (
    <section id="mountains" className="section section--cream">
      <div className="container text-center">
        <FadeIn>
          <h2 className="section__title section__title--dark">
            THE SEVEN MOUNTAINS OF INFLUENCE
          </h2>
          <p className="section__intro">
            God is calling you to carry His wisdom and authority into every
            sphere that shapes society and culture.
          </p>
        </FadeIn>

        <div className="mountains-grid">
          {mountains.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.08}>
              <div className="mountain-card">
                <div className="mountain-card__icon">{m.icon}</div>
                <h3 className="mountain-card__name">{m.name}</h3>
                <p className="mountain-card__desc">{m.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCIENCE & TECHNOLOGY
   ═══════════════════════════════════════════════════════════ */
function ScienceTech() {
  return (
    <section className="section section--white" style={{ padding: "120px 40px" }}>
      <div className="container">
        <div className="scitech">
          <div className="scitech__left">
            <FadeIn>
              <p className="section__label">SCIENCE & TECHNOLOGY</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h3 className="cyan-statement">THE LAB IS KINGDOM TERRITORY.</h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h3 className="cyan-statement">THE STUDIO IS KINGDOM TERRITORY.</h3>
            </FadeIn>
            <FadeIn delay={0.3}>
              <h3 className="cyan-statement" style={{ marginBottom: 0 }}>THE INNOVATION HUB IS KINGDOM TERRITORY.</h3>
            </FadeIn>
          </div>
          <div className="scitech__divider" />
          <div className="scitech__right">
            <FadeIn delay={0.2}>
              <p className="body-text">
                A distinctive focus of this convocation is the unveiling of the
                Church's prophetic and historical heritage in science,
                innovation, and technological advancement. Scripture and history
                reveal that God has always endowed His people with exceptional
                wisdom, craftsmanship, and systems intelligence — from Bezalel's
                divine skill in design, to Joseph's economic architecture,
                Daniel's governmental and scientific insight, and Solomon's
                technological and infrastructural innovation.
              </p>
            </FadeIn>
            <FadeIn delay={0.35}>
              <p className="body-text" style={{ marginBottom: 0 }}>
                This gathering will prophetically restore the understanding that
                the laboratory, the studio, the classroom, and the innovation
                hub are as much Kingdom territory as the prayer altar. It will
                call forth a new generation of Spirit-filled scientists,
                engineers, technologists, entrepreneurs, and researchers who
                carry both spiritual fire and intellectual authority to build
                systems aligned with God's purposes.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   WHY HOUSTON
   ═══════════════════════════════════════════════════════════ */
function WhyHouston() {
  const cards = [
    "Prophetically interpret God's purpose and timing for Houston.",
    "Pray into the alignment of spiritual and institutional leadership within the city.",
    "Commission participants as Kingdom witnesses specifically assigned to Houston, charged with influencing its industries, communities, and governance structures.",
  ];

  return (
    <section id="houston" className="section section--dark section--skyline">
      <div className="section__overlay" />
      <HoustonSkyline opacity={0.08} />
      <div className="container relative-z2">
        <FadeIn>
          <p className="section__label">HOUSTON</p>
          <h2 className="section__title section__title--light">
            A STRATEGIC CITY IN
            <br />
            GOD'S AGENDA
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="body-text body-text--light" style={{ marginBottom: 48, maxWidth: 900 }}>
            As a global hub for energy, medicine, aerospace, technology,
            education, and cultural diversity, Houston occupies a unique
            position in shaping national and international systems. A dedicated
            session will be centered on discerning and declaring the strategic
            mandate of God for Houston in this season.
          </p>
        </FadeIn>

        <div className="glass-cards-grid">
          {cards.map((text, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.12}>
              <div className="glass-card">
                <p className="body-text body-text--light" style={{ margin: 0 }}>
                  {text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.6}>
          <p className="body-text body-text--muted" style={{ marginTop: 40, maxWidth: 900 }}>
            The objective is to cultivate a generation that understands not only
            their personal calling, but also their corporate responsibility to
            steward the destiny of the city in which God has planted them.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROGRAM FLOW
   ═══════════════════════════════════════════════════════════ */
const programPhases = [
  {
    title: "Encounter",
    subtitle: "Fire and Consecration",
    desc: "A season of deep worship and corporate intercession, calling participants into consecration, repentance, and renewed alignment with God's heart for their generation, their cities, and the nations.",
    icon: "🔥",
  },
  {
    title: "Revelation",
    subtitle: "Vision for the Mountains",
    desc: "Prophetic and apostolic teaching that establishes identity as witnesses and ambassadors of Christ, assignment to influence the seven mountains of society, and strategic insight into the role of science, technology, and innovation in shaping the future.",
    icon: "👁️",
  },
  {
    title: "Heritage & Commissioning",
    subtitle: "Deployment",
    desc: "A focused segment unveiling God's legacy in science and technology within the Body of Christ, followed by a formal commissioning of participants across all spheres — releasing them into their fields and into the city of Houston with spiritual authority, wisdom, and a mandate for Kingdom impact.",
    icon: "🕊️",
  },
];

function ProgramFlow() {
  return (
    <section id="program" className="section section--cream">
      <div className="container text-center">
        <FadeIn>
          <p className="section__label">PROGRAM FLOW</p>
          <h2 className="section__title section__title--dark">
            THREE MOVEMENTS,
            <br />
            ONE MANDATE
          </h2>
        </FadeIn>

        <div className="timeline">
          <div className="timeline__line" />
          {programPhases.map((p, i) => (
            <FadeIn key={i} delay={i * 0.15} className="timeline__item">
              <div className="timeline__icon">{p.icon}</div>
              <div className="timeline__card">
                <h3 className="timeline__title">{p.title}</h3>
                <p className="timeline__subtitle">{p.subtitle}</p>
                <p className="timeline__desc">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERITAGE IN INNOVATION
   ═══════════════════════════════════════════════════════════ */
const heritage = [
  { name: "Bezalel", ref: "Exodus 31:3", desc: "Filled with the Spirit of God in wisdom, understanding, and knowledge for craftsmanship and design." },
  { name: "Joseph", ref: "Genesis 41", desc: "Designed economic architecture and infrastructure that saved nations from famine." },
  { name: "Daniel", ref: "Daniel 1:20", desc: "Possessed governmental insight and scientific understanding ten times greater than the wise men of Babylon." },
  { name: "Solomon", ref: "1 Kings 4:29–34", desc: "Led unprecedented technological and infrastructural innovation, building systems of wisdom and wealth." },
];

function Heritage() {
  return (
    <section id="heritage" className="section section--white">
      <div className="container text-center">
        <FadeIn>
          <h2 className="section__title section__title--dark">
            GOD'S HERITAGE IN INNOVATION
          </h2>
          <p className="section__intro">
            Scripture and history reveal that God has always endowed His people
            with exceptional wisdom, craftsmanship, and systems intelligence.
          </p>
        </FadeIn>

        <div className="heritage-grid">
          {heritage.map((h, i) => (
            <FadeIn key={h.name} delay={i * 0.1}>
              <div className="heritage-card">
                <div className="heritage-card__number">{i + 1}</div>
                <h4 className="heritage-card__name">{h.name}</h4>
                <p className="heritage-card__ref">{h.ref}</p>
                <p className="heritage-card__desc">{h.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <p className="heritage-tagline">
            This is your heritage. Innovation, wisdom, and authority in
            systems-building are part of your spiritual DNA.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIRED OUTCOMES
   ═══════════════════════════════════════════════════════════ */
const outcomes = [
  "A generation awakened to their responsibility to influence all seven mountains of society.",
  "Restoration of the Church's confidence, vision, and leadership in science, technology, and innovation.",
  "Prophetic clarity over individual callings, career paths, and societal assignments.",
  "A clearly articulated spiritual mandate for Houston and a commissioned community positioned to steward its destiny.",
  "The formation of Spirit-led leaders equipped to shape cities, systems, and nations for the glory of God.",
];

function DesiredOutcomes() {
  return (
    <section id="outcomes" className="section section--dark">
      <div className="section__overlay" style={{ background: "linear-gradient(135deg, rgba(30,42,26,0.95), rgba(44,53,39,0.9))" }} />
      <div className="container relative-z2">
        <FadeIn>
          <p className="section__label" style={{ textAlign: "center" }}>DESIRED OUTCOMES</p>
          <h2 className="section__title section__title--light" style={{ textAlign: "center" }}>
            WHAT WE BELIEVE GOD WILL DO
          </h2>
        </FadeIn>

        <div className="outcomes-grid">
          {outcomes.map((o, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="outcome-card">
                <div className={`outcome-card__number ${i >= 3 ? "outcome-card__number--gold" : ""}`}>
                  {i + 1}
                </div>
                <p className="body-text body-text--light" style={{ margin: 0 }}>
                  {o}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CORE MESSAGE
   ═══════════════════════════════════════════════════════════ */
function CoreMessage() {
  return (
    <section className="section section--cream text-center">
      <div className="container container--narrow">
        <FadeIn>
          <p className="section__label">CORE MESSAGE</p>
          <h2 className="section__title section__title--dark" style={{ lineHeight: 1.15 }}>
            REVIVAL IS NOT CONFINED
            <br />
            <span style={{ color: COLORS.cyan }}>TO THE SANCTUARY</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="body-text" style={{ fontSize: 19 }}>
            10 Hours Houston: Witnesses declares that revival is not confined to
            the sanctuary, but is expressed through transformed people who
            transform systems and cities. God is commissioning a generation to
            carry His presence, wisdom, and power into every mountain of
            influence — particularly into the realm of science and technology —
            and specifically into the city of Houston, so that it may be taken
            for Christ and shaped according to the values and purposes of His
            Kingdom.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   REGISTER CTA
   ═══════════════════════════════════════════════════════════ */
function RegisterCTA() {
  return (
    <section id="register" className="section section--dark section--skyline text-center">
      <div className="section__overlay" style={{ background: "linear-gradient(to top, rgba(212,136,58,0.3), rgba(30,42,26,0.92))" }} />
      <HoustonSkyline opacity={0.06} />
      <div className="relative-z2">
        <FadeIn>
          <h2 className="section__title section__title--light">
            TAKE YOUR PLACE
          </h2>
          <p className="body-text body-text--light" style={{ maxWidth: 500, margin: "0 auto 48px" }}>
            Be part of a generation commissioned to carry the fire into every
            mountain of influence.
          </p>
        </FadeIn>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <FadeIn delay={0.15}>
            <a href="#" className="btn btn--dark">REGISTER</a>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a href="#" className="btn btn--outline">DONATE</a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img
          src={process.env.PUBLIC_URL + "/images/logo.png"}
          alt="10 Hours Houston"
          className="footer__logo-img"
        />
      </div>
      <div className="footer__right">
        <p className="footer__tagline">
          WITNESSES: And They Took the City
        </p>
        <span className="footer__divider">|</span>
        <a href="mailto:hello@10hourshouston.com" className="footer__email">
          hello@10hourshouston.com
        </a>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════ */
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Purpose />
      <ThemeRationale />
      <SevenMountains />
      <ScienceTech />
      <WhyHouston />
      <ProgramFlow />
      <Heritage />
      <DesiredOutcomes />
      <CoreMessage />
      <RegisterCTA />
      <Footer />
    </>
  );
}

export default App;
