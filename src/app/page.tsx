"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import DoorsSection from "@/app/DoorsSection";
import { securityFindings } from "@/data/security";

const navItems = ["Home", "Projects", "Security", "Experience", "Contact"];
const roles = ["Full-Stack Developer", "AI Systems Engineer", "Cybersecurity Enthusiast"];
const skills = ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "REST APIs", "AI workflows", "JWT", "Zod", "OWASP Top 10"];

function Navbar() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);
  const [clock, setClock] = useState({ time: "", date: "" });
  useEffect(() => {
    const root = document.documentElement;
    const activeTheme = root.dataset.theme === "light" ? "light" : "dark";
    setTheme(activeTheme);
    const update = () => {
      const now = new Date();
      setClock({
        time: new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(now),
        date: new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short" }).format(now),
      });
    };
    update();
    const timer = window.setInterval(update, 30000);
    const sections = navItems.map((item) => document.getElementById(item.toLowerCase())).filter((section): section is HTMLElement => Boolean(section));
    const setCurrentSection = () => {
      const center = window.innerHeight * .42;
      const current = sections.find((section) => { const rect = section.getBoundingClientRect(); return rect.top <= center && rect.bottom > center; });
      if (!current) return;
      const id = current.id;
      setActive(navItems.find((item) => item.toLowerCase() === id) ?? "Home");
      root.dataset.scene = id === "projects" ? "doors" : id === "experience" ? `experience-${current.dataset.era ?? "2026"}` : id;
    };
    const observer = new IntersectionObserver(setCurrentSection, { rootMargin: "-10% 0px -10% 0px" });
    sections.forEach((section) => observer.observe(section));
    setCurrentSection();
    return () => { window.clearInterval(timer); observer.disconnect(); };
  }, []);
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { window.localStorage.setItem("portfolio-theme", next); } catch { /* Storage may be disabled. */ }
  };
  const themeLabel = theme === null ? "Color theme" : theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  return <header className="vault-header"><a className="monogram" href="#home" aria-label="Mujahid Vhora, home">MV<span>.</span></a><button className="mobile-menu-button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? "×" : "☰"}</button><nav id="primary-nav" className={`vault-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className={active === item ? "selected" : ""} aria-current={active === item ? "location" : undefined} onClick={() => setOpen(false)}>{item}</a>)}</nav><div className="status-pill"><span className="status-available"><i className="status-dot"/><span>Available for work</span></span><span className="status-clock"><b>{clock.time || "--:--"}</b><span>{clock.date || "—"}</span></span><button className="theme-toggle" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}><span aria-hidden="true">{theme === "light" ? "☾" : theme === "dark" ? "☼" : "◐"}</span></button></div></header>;
}

function ProfileModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title"><button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close profile">×</button><span className="mono-label">IDENTITY / 001</span><h2 id="profile-title">Mujahid Vhora</h2><p className="modal-description">Full-Stack Developer · AI Systems · Security-minded engineering</p><div className="modal-skills">{skills.map((skill) => <span className="vault-chip" key={skill}>{skill}</span>)}</div><a className="vault-button vault-button-solid" href="mailto:vhoramujahid007@gmail.com">Start a conversation ↗</a></section></div>;
}

function SecurityCaseStudy() {
  const [expanded, setExpanded] = useState(false);
  const visibleFindings = expanded ? securityFindings : securityFindings.slice(0, 5);
  const fixedCount = securityFindings.length;
  return <section className="section wrap security-section" id="security" aria-labelledby="security-title">
    <header className="section-heading security-heading">
      <span className="mono-label">SECURITY REVIEW / DAILY MOOD TRACKER</span>
      <h2 id="security-title">I audited my own app.</h2>
      <p>I security-tested my own full-stack app, found {securityFindings.length} real vulnerabilities and fixed every one.</p>
    </header>
    <div className="security-stats" aria-label="Security review statistics">
      <div className="security-stat"><strong>{securityFindings.length}</strong><span>found</span></div>
      <div className="security-stat"><strong>{fixedCount}</strong><span>fixed</span></div>
      <div className="security-stat"><strong>100+</strong><span>automated checks</span></div>
    </div>
    <div className="security-findings" id="security-findings">
      {visibleFindings.map((finding, index) => <article className="security-finding glass-panel" key={finding.title}>
        <div className="finding-topline">
          <span className="finding-number">{String(index + 1).padStart(2, "0")}</span>
          <span className={`severity-tag severity-${finding.severity.toLowerCase()}`}>{finding.severity}</span>
          <span className="finding-fixed"><span aria-hidden="true">✓</span> Fixed</span>
        </div>
        <h3>{finding.title}</h3>
        <div className="finding-change"><span className="change-label">Before</span><p>{finding.before}</p></div>
        <div className="finding-change finding-after"><span className="change-label">After</span><p>{finding.after}</p></div>
      </article>)}
    </div>
    {securityFindings.length > 5 && <button className="security-expand" type="button" aria-expanded={expanded} aria-controls="security-findings" onClick={() => setExpanded((value) => !value)}>{expanded ? "Show fewer" : `Show all ${securityFindings.length}`}<span aria-hidden="true">{expanded ? "↑" : "↓"}</span></button>}
    <a className="security-writeup" href="https://github.com/mujahid313v/Daily-mood-tracker#security" target="_blank" rel="noreferrer">Read the full security write-up on GitHub <span aria-hidden="true">↗</span></a>
  </section>;
}

function ExperienceLog() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [year, setYear] = useState("2026");
  useMotionValueEvent(scrollYProgress, "change", (value) => setYear(value > .58 ? "2025" : "2026"));
  useEffect(() => { document.documentElement.dataset.scene = `experience-${year}`; }, [year]);
  return <section className={`section wrap log-section era-${year}`} id="experience" data-era={year} ref={ref}><header className="section-heading"><span className="mono-label">CHANGELOG / EXPERIENCE</span><h2>Small commits. Real progress.</h2></header><div className="commit-layout"><div className="commit-year"><span className="mono-label">CURRENT ERA</span><strong>{year}</strong><span className="year-line"/></div><div className="commit-list"><article className="commit-entry"><span className="commit-hash">a8f2c1e</span><div><span className="commit-kind feat">feat</span><h3>Joined Pelquant as Full-Stack &amp; AI Systems Engineer</h3><p>January 2026 — June 2026 · Production web applications, PostgreSQL data models, and AI workflows.</p></div></article><article className="commit-entry"><span className="commit-hash">d21b903</span><div><span className="commit-kind feat">feat</span><h3>Completed BCA at LJ University (May 2025)</h3><p>Computer applications, software engineering, databases, and object-oriented programming.</p></div></article><article className="commit-entry"><span className="commit-hash">f04c77a</span><div><span className="commit-kind fix">fix</span><h3>Patched nine vulnerabilities in Daily Mood Tracker</h3><p>Self-audit findings informed improvements across authorization, sessions, validation, rate limits, and Docker secrets.</p></div></article></div></div><div className="credentials"><span className="mono-label">CREDENTIALS / MILESTONES</span><div className="credential-list"><a href="https://www.credly.com/go/bhyuksM1" target="_blank" rel="noreferrer">AWS Academy Graduate · Cloud Architecting <span>↗</span></a><a href="/certs/lj-innovation-village-landscape.jpg" target="_blank" rel="noreferrer">LJ Innovation Village · Certificate of Participation <span>↗</span></a></div></div></section>;
}

export default function Home() {
  const reduced = useReducedMotion();
  const [role, setRole] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  useEffect(() => { if (reduced) return; const timer = window.setInterval(() => setRole((value) => (value + 1) % roles.length), 2500); return () => window.clearInterval(timer); }, [reduced]);
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar/><main id="main" className="relative isolate"><section className="hero-vault wrap" id="home"><div className="hero-copy"><span className="hero-eyebrow"><i/> INDEPENDENT DEVELOPER · AHMEDABAD, INDIA</span><h1>Hi, I’m Mujahid.<br/><span className="hero-second-line">I am a</span></h1><div className="id-badge" aria-live="polite"><span className="badge-seal">MV</span><motion.div className="badge-role" key={role} initial={reduced ? false : { rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: .5 }}><span className="badge-caption">VERIFIED ROLE</span><strong>{roles[role]}</strong></motion.div><span className="badge-check">✓</span></div><p className="hero-description">I build full-stack products, connect useful AI systems, and look for the security details that make software trustworthy.</p><div className="hero-actions"><a href="mailto:vhoramujahid007@gmail.com" className="vault-button vault-button-solid">Hire me <span>↗</span></a><a href="#projects" className="vault-button">See my work <span>↓</span></a><a href="/resume.pdf" download className="vault-button">Resume <span>↓</span></a></div><div className="hero-meta"><span><b>06</b> MONTHS AT PELQUANT</span><span><b>09</b> SECURITY FINDINGS</span><span><b>04</b> PROJECTS</span></div></div><div className="identity-stage"><div className="identity-orbit orbit-one"/><div className="identity-orbit orbit-two"/><article className="identity-card"><div className="id-card-top"><span>THE VAULT / IDENTITY</span><span>001 — MV</span></div><div className="photo-placeholder" role="img" aria-label="Photo placeholder for Mujahid Vhora"><div className="placeholder-silhouette"><span/><i/></div><span className="photo-note">PHOTO PLACEHOLDER</span><div className="photo-grain"/></div><div className="identity-details"><div><span className="mono-label">DEVELOPER / VERIFIED</span><h2>Mujahid Vhora</h2><p>Full-Stack · AI Systems · Security</p></div><div className="verified-seal"><span>✓</span><small>VERIFIED<br/>DEVELOPER</small></div></div><div className="id-card-bottom"><span>AHMEDABAD, IN</span><span>OPEN TO OPPORTUNITIES <i/></span></div></article><button className="profile-open" onClick={() => setProfileOpen(true)}><span className="profile-open-icon">＋</span><span>My profile card</span><span>↗</span></button><span className="identity-watermark">MV<span>.</span></span></div></section>
      <DoorsSection/>
      <SecurityCaseStudy/>
      <ExperienceLog/>
      <section className="contact-vault" id="contact"><div className="contact-inner wrap"><span className="mono-label">OPEN CHANNEL / 24×7</span><h2>Ready to ship<br/><span>something secure?</span></h2><p>Have a product idea, a tricky system, or a role that needs a builder? Let’s talk.</p><a className="contact-email" href="mailto:vhoramujahid007@gmail.com">vhoramujahid007@gmail.com <span>↗</span></a><div className="contact-socials"><a href="https://linkedin.com/in/mujahid007" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/mujahid313v" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></div><div className="contact-graphic" aria-hidden="true"><div className="contact-ring ring-a"/><div className="contact-ring ring-b"/><div className="contact-lock">⌑</div></div></section>
    </main><footer className="vault-footer wrap"><a className="monogram" href="#home">MV<span>.</span></a><span>© {new Date().getFullYear()} Mujahid Vhora</span><span>SEALED WITH CARE / AHMEDABAD, IN</span></footer>{profileOpen && <ProfileModal onClose={() => setProfileOpen(false)}/>}</>;
}
