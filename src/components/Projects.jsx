import { projects } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";
import GlowCard from "./GlowCard.jsx";

export default function Projects() {
  return (
    <section className="content-section" id="projects" aria-labelledby="projects-heading">
      <h2 className="section-title" id="projects-heading">
        Projects Showcase - <span className="purple-text">What I&rsquo;ve Built!</span>
      </h2>
      <div className="experience-grid">
        {projects.map((p, i) => (
          <Reveal key={p.name} style={{ transitionDelay: `${i * 120}ms` }}>
            <GlowCard as="article" className="experience-card">
              <div className="experience-date">{p.date}</div>
              <div className="project-tag">{p.tag}</div>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="project-links-wrapper">
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noreferrer" className="project-btn">
                    <i className="fa-regular fa-eye" aria-hidden="true" /> View Live
                  </a>
                ) : (
                  <span className="project-btn inactive-btn">
                    <i className="fa-regular fa-eye" aria-hidden="true" /> Private Repo
                  </span>
                )}
                <a href={p.source} target="_blank" rel="noreferrer" className="project-btn">
                  <i className="fa-brands fa-github" aria-hidden="true" /> GitHub
                </a>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
