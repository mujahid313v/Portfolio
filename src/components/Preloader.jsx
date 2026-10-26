import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "../data/portfolio.js";

const BOOT_MS = 2600;

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);
  const doneRef = useRef(false);

  const particles = useMemo(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return [];
    return Array.from({ length: 26 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 5,
      delay: Math.random() * 2.4,
      duration: 1.8 + Math.random() * 1.6,
    }));
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 300 : BOOT_MS;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const pct = Math.min(100, Math.round(((now - start) / total) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setLeaving(true);
        setTimeout(() => {
          setHidden(true);
          onDone?.();
        }, reduced ? 50 : 950);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (hidden) return null;

  return (
    <div className={`preloader${leaving ? " preloader--loaded" : ""}`} aria-hidden="true">
      <div className="preloader-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="preloader-particle"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="preloader-brand">
        <div className="preloader-brand-main">
          <span className="preloader-brand-name">{site.brandMain}</span>
          <span className="preloader-brand-accent">{site.brandAccent}</span>
        </div>
        <div className="preloader-brand-subtitle">
          <span className="subtitle-line" />
          Full-Stack · AI Systems
          <span className="subtitle-line" />
        </div>
      </div>
      <div className="preloader-sleek-track">
        <div className="preloader-sleek-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="preloader-percent">{progress}%</div>
      <div className="preloader-tagline">
        {site.tagline.map((word, i) => (
          <span key={word} style={{ animationDelay: `${i * 0.6}s` }}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
