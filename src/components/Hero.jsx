import { useEffect, useState } from "react";
import { site, heroIcons } from "../data/portfolio.js";

export default function Hero({ onOpenResume }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(site.name);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(site.name.slice(0, i));
      if (i >= site.name.length) clearInterval(t);
    }, 85);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="floating-icon icon-top-left">
        <i className={heroIcons[0]} aria-hidden="true" />
      </div>
      <div className="floating-icon icon-top-right">
        <i className={heroIcons[1]} aria-hidden="true" />
      </div>
      <div className="floating-icon icon-bottom-left">
        <i className={heroIcons[2]} aria-hidden="true" />
      </div>
      <div className="floating-icon icon-bottom-right">
        <i className={heroIcons[3]} aria-hidden="true" />
      </div>

      <div className="content-wrapper">
        <h1 className="sr-only">{site.name} - {site.role} Portfolio</h1>
        <h2 className="main-title">
          <span className="purple-text">{typed}</span>
        </h2>
        <h5 className="year">
          {site.role}
        </h5>
        <div className="hero-buttons">
          <a href="#contact" className="btn-resume">
            Let&rsquo;s Connect
          </a>
          <button type="button" className="btn-resume" onClick={onOpenResume}>
            View Resume
          </button>
        </div>
        <p className="location-line">
          <i className="fa-solid fa-location-dot" aria-hidden="true" /> {site.location}
        </p>
      </div>
    </section>
  );
}
