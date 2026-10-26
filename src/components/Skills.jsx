import { useState } from "react";
import { skills, skillCategories } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

function isDevicon(icon) {
  return icon.startsWith("devicon-");
}

export default function Skills() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? skills : skills.filter((s) => s.cat === filter);

  return (
    <section className="content-section" id="skills" aria-labelledby="skills-heading">
      <h2 className="section-title" id="skills-heading">
        Technical Skills - <span className="purple-text">Core Expertise!</span>
      </h2>
      <Reveal>
        <div className="skillFilters" role="tablist" aria-label="Skill categories">
          {skillCategories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={`filter-btn${filter === c ? " active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="skillGrid" key={filter}>
          {shown.map((s, i) => (
            <div
              className="skill-card"
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              key={s.name}
            >
              {isDevicon(s.icon) ? (
                <i className={`${s.icon} colored`} aria-hidden="true" />
              ) : (
                <i className={s.icon} aria-hidden="true" style={{ color: "#FF6B2B" }} />
              )}
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
