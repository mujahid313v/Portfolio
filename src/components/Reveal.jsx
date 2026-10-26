import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", style, as: Tag = "div" }) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExpanded(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExpanded(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={style}
      className={`scroll-reveal${expanded ? " expanded" : ""}${className ? " " + className : ""}`}
    >
      {children}
    </Tag>
  );
}
