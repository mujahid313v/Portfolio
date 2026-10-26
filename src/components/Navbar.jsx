import { useEffect, useRef, useState } from "react";
import { nav } from "../data/portfolio.js";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("home");
  const pillRef = useRef(null);
  const indicatorRef = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const item of nav) {
      const el = document.getElementById(item.section);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const place = () => {
      const indicator = indicatorRef.current;
      const link = linkRefs.current[active];
      if (!indicator || !link) return;
      indicator.style.left = `${link.offsetLeft}px`;
      indicator.style.width = `${link.offsetWidth}px`;
      link.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    };
    place();
    window.addEventListener("resize", place);
    if (document.fonts?.ready) document.fonts.ready.then(place);
    const t = setTimeout(place, 600);
    return () => {
      window.removeEventListener("resize", place);
      clearTimeout(t);
    };
  }, [active, visible]);

  return (
    <nav className={`site-nav${visible ? " nav-visible" : ""}`} aria-label="Main navigation">
      <div className="nav-pill" ref={pillRef}>
        <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
        {nav.map((item) => (
          <a
            key={item.section}
            ref={(el) => {
              linkRefs.current[item.section] = el;
            }}
            href={item.href}
            className={`nav-link${active === item.section ? " active" : ""}`}
          >
            <i className={`${item.icon} nav-icon`} aria-hidden="true" />
            <span className="nav-label">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
