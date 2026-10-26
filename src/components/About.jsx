import { about } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <Reveal className="glass-card">
        <h2 id="about-heading">
          {about.title}
          <span className="purple-text">{about.highlight}</span>
        </h2>
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Reveal>
    </section>
  );
}
