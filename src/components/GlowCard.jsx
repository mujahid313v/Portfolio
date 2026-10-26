import { useRef } from "react";

export default function GlowCard({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={`glow-card${className ? " " + className : ""}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
