"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { doorCategories } from "@/data/doors";
import { projects } from "@/data/projects";

export default function DoorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const doorButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const roomBackButton = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const wallX = useTransform(scrollYProgress, [0, 1], [0, -976]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [roomIndex, setRoomIndex] = useState<number | null>(null);
  const [openingIndex, setOpeningIndex] = useState<number | null>(null);
  const [closingRoom, setClosingRoom] = useState(false);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const current = doorCategories[activeIndex];
  const roomCategory = roomIndex === null ? null : doorCategories[roomIndex];
  const roomProjects = roomCategory ? projects.filter((project) => project.category === roomCategory.title) : [];

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (window.matchMedia("(min-width: 681px)").matches && roomIndex === null && openingIndex === null) {
      setActiveIndex(Math.max(0, Math.min(doorCategories.length - 1, Math.round(progress * (doorCategories.length - 1)))));
    }
  });

  useEffect(() => {
    // Project copy is already in the page bundle. Warm the small local screenshot
    // assets so entering a room never waits on its first image request.
    projects.forEach(({ image }) => { const img = new Image(); img.src = image; });
  }, []);

  useEffect(() => () => { if (timerRef.current !== null) window.clearTimeout(timerRef.current); }, []);

  const closeRoom = useCallback(() => {
    if (closingRoom) return;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    setOpeningIndex(null);
    if (roomIndex !== null && !reducedMotion) {
      setClosingRoom(true);
      timerRef.current = window.setTimeout(() => {
        setRoomIndex(null); setClosingRoom(false); timerRef.current = null;
        if (window.matchMedia("(max-width: 680px)").matches) {
          (mobileRailRef.current?.children.item(activeIndex)?.querySelector("button") as HTMLButtonElement | null)?.focus();
        } else doorButtons.current[activeIndex]?.focus();
      }, 230);
      return;
    }
    timerRef.current = null;
    setRoomIndex(null); setClosingRoom(false);
    window.setTimeout(() => {
      if (window.matchMedia("(max-width: 680px)").matches) {
        (mobileRailRef.current?.children.item(activeIndex)?.querySelector("button") as HTMLButtonElement | null)?.focus();
      } else doorButtons.current[activeIndex]?.focus();
    }, reducedMotion ? 0 : 250);
  }, [activeIndex, closingRoom, reducedMotion, roomIndex]);

  useEffect(() => {
    if (roomIndex === null && openingIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); closeRoom(); } };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [roomIndex, openingIndex, closeRoom]);

  useEffect(() => {
    if (roomIndex === null) return;
    roomBackButton.current?.focus();
    const keepFocusInRoom = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const room = document.querySelector<HTMLElement>(".door-room");
      const focusable = room?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", keepFocusInRoom);
    return () => window.removeEventListener("keydown", keepFocusInRoom);
  }, [roomIndex]);

  const enterRoom = (index: number) => {
    if (roomIndex !== null || openingIndex !== null) return;
    setActiveIndex(index);
    setOpeningIndex(index);
    setClosingRoom(false);
    setPointer(null);
    timerRef.current = window.setTimeout(() => {
      setRoomIndex(index);
      setOpeningIndex(null);
      timerRef.current = null;
    }, reducedMotion ? 0 : 360);
  };

  const goToDoor = (index: number) => {
    const next = Math.max(0, Math.min(doorCategories.length - 1, index));
    setActiveIndex(next);
    if (window.matchMedia("(max-width: 680px)").matches) {
      const rail = mobileRailRef.current;
      const item = rail?.children.item(next) as HTMLElement | null;
      item?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "nearest", inline: "center" });
    } else if (sectionRef.current) {
      const section = sectionRef.current;
      const range = section.offsetHeight - window.innerHeight;
      window.scrollTo({ top: section.offsetTop + range * next / (doorCategories.length - 1), behavior: reducedMotion ? "instant" : "smooth" });
    }
  };

  const onDoorKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); goToDoor(index + 1); doorButtons.current[Math.min(index + 1, doorCategories.length - 1)]?.focus(); }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); goToDoor(index - 1); doorButtons.current[Math.max(index - 1, 0)]?.focus(); }
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); enterRoom(index); }
  };

  const desktopDoor = (index: number) => {
    const door = doorCategories[index];
    const active = index === activeIndex;
    const opening = index === openingIndex || index === roomIndex;
    return <div className={`door-slot ${active ? "is-centered" : "is-away"}`} key={door.id}><div className="door-light-spill"/><motion.button ref={(node) => { doorButtons.current[index] = node; }} type="button" tabIndex={active ? 0 : -1} className="arched-door" aria-label={`Enter ${door.title} room`} aria-haspopup="dialog" aria-expanded={roomIndex === index} animate={{ rotateY: opening ? -82 : 0 }} transition={{ duration: reducedMotion ? .01 : .64, ease: [0.22, 0.72, 0.2, 1] }} onClick={() => enterRoom(index)} onKeyDown={(event) => onDoorKeyDown(event, index)} onPointerEnter={() => { if (active) setPointer({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); }} onPointerMove={(event) => { if (active && event.pointerType === "mouse") setPointer({ x: event.clientX, y: event.clientY }); }} onPointerLeave={() => setPointer(null)} onFocus={() => { if (active) setPointer({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); }} onBlur={() => setPointer(null)}><span className="door-face"><span className="door-groove groove-one"/><span className="door-groove groove-two"/><span className="door-groove groove-three"/><span className="door-plate"><b>{String(index + 1).padStart(2, "0")}</b><span>{door.title}</span></span><span className="door-led" aria-hidden="true"/></span><span className="door-back" aria-hidden="true"/></motion.button></div>;
  };

  return <section id="projects" className="doors-section" ref={sectionRef} aria-labelledby="doors-title"><div className="doors-pinned" inert={roomIndex !== null}><header className="doors-heading"><span className="mono-label">THE VAULT / SELECT A CATEGORY</span><h2 id="doors-title">Magic happens<br/><span>behind the doors.</span></h2><p>Scroll to explore. Choose a door to step into the work.</p></header><div className="doors-explorer"><div className="door-stage" aria-label="Project categories"><div className="door-floor" aria-hidden="true"/><motion.div className="door-wall" style={{ x: wallX }}>{doorCategories.map((_, index) => desktopDoor(index))}</motion.div>{pointer && roomIndex === null && <span className="door-cursor-tip" style={{ left: pointer.x, top: pointer.y }}>Click to enter <b>↗</b></span>}</div><aside className="door-details" aria-live="polite"><span className="door-counter">DOOR / {String(activeIndex + 1).padStart(2, "0")} — 05</span><h3>{current.title}</h3><p className="door-tagline">{current.tagline}</p><ul>{current.checklist.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><button className="door-enter-button" onClick={() => enterRoom(activeIndex)}>Enter {current.title}<span>↗</span></button><span className="door-scroll-hint">SCROLL TO BROWSE <i>↓</i></span></aside></div>
        <div className="mobile-doors"><div className="mobile-door-rail" ref={mobileRailRef} onScroll={(event) => { const rail = event.currentTarget; const itemWidth = (rail.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? rail.clientWidth; const index = Math.round(rail.scrollLeft / (itemWidth + 16)); setActiveIndex(Math.max(0, Math.min(doorCategories.length - 1, index))); }} aria-label="Swipe between project categories">{doorCategories.map((door, index) => <article className={`mobile-door-card ${index === activeIndex ? "is-centered" : ""}`} key={door.id}><button type="button" className="arched-door mobile-arched-door" aria-label={`Enter ${door.title} room`} onClick={() => enterRoom(index)}><span className="door-face"><span className="door-groove groove-one"/><span className="door-groove groove-two"/><span className="door-groove groove-three"/><span className="door-plate"><b>{String(index + 1).padStart(2, "0")}</b><span>{door.title}</span></span><span className="door-led"/></span></button><span className="mobile-door-label">{door.title}</span></article>)}</div><div className="mobile-door-details" aria-live="polite"><span className="door-counter">DOOR / {String(activeIndex + 1).padStart(2, "0")} — 05</span><h3>{current.title}</h3><p className="door-tagline">{current.tagline}</p><ul>{current.checklist.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><button className="door-enter-button" onClick={() => enterRoom(activeIndex)}>Tap to enter <span>↗</span></button></div></div>
      </div>
      {roomCategory && <motion.div className="door-room-backdrop" initial={{ opacity: 0 }} animate={{ opacity: closingRoom ? 0 : 1 }} transition={{ duration: reducedMotion ? .01 : .24 }}><section className="door-room" role="dialog" aria-modal="true" aria-labelledby="room-title"><header className="room-header"><div><span className="mono-label">THE VAULT / ROOM {String(roomIndex! + 1).padStart(2, "0")}</span><h2 id="room-title">{roomCategory.title}</h2><p>{roomCategory.tagline}</p></div><button ref={roomBackButton} className="back-to-doors" onClick={closeRoom}><span aria-hidden="true">←</span> Back to the doors <kbd>ESC</kbd></button></header><div className="room-projects">{roomProjects.map((project) => <article className="room-project-card" key={project.name}><div className="room-project-image"><img src={project.image} alt={`${project.name} screenshot`} width="960" height="540" loading="eager"/><span className="room-project-status">{project.status ?? "PROJECT"}</span></div><div className="room-project-copy"><h3>{project.name}</h3><p>{project.description}</p><div className="room-project-tech">{project.tech.map((tech) => <span className="vault-chip" key={tech}>{tech}</span>)}</div><div className="room-project-actions">{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">Live <span>↗</span></a> : <button type="button" className="project-link-disabled" disabled>Live · Add URL</button>}{project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <span>↗</span></a> : <button type="button" className="project-link-disabled" disabled>GitHub · Add URL</button>}{project.category === "Open Source" && <span className="merged-label">✓ Merged · docs typo fix</span>}</div></div></article>)}</div><footer className="room-footer"><span>ROOM {String(roomIndex! + 1).padStart(2, "0")} / {roomCategory.title.toUpperCase()}</span><button onClick={closeRoom}>Back to the doors ↑</button></footer></section></motion.div>}
    </section>;
}
