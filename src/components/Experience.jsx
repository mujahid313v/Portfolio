import { experience } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";
import GlowCard from "./GlowCard.jsx";

export default function Experience() {
  return (
    <section className="content-section" id="experience" aria-labelledby="experience-heading">
      <h2 className="section-title" id="experience-heading">
        Work Experience - <span className="purple-text">Professional Journey!</span>
      </h2>
      <div className="experience-grid">
        {experience.map((e, i) => (
          <Reveal key={e.title} style={{ transitionDelay: `${i * 120}ms` }}>
            <GlowCard as="article" className="experience-card">
              <div className="experience-date">{e.period}</div>
              <div className="project-tag">{e.tag}</div>
              <h3>{e.title}</h3>
              <ul className="bullet-list">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
