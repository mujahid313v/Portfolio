import { certs } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function Certs() {
  return (
    <section className="content-section" id="certifications" aria-labelledby="certs-heading">
      <h2 className="section-title" id="certs-heading">
        Certifications - <span className="purple-text">Learning Milestones!</span>
      </h2>
      <div className="cert-grid">
        {certs.map((c, i) => (
          <Reveal key={c.title} style={{ transitionDelay: `${i * 120}ms` }}>
            <article className="cert-item">
              <div className="cert-img-wrapper">
                {c.image ? (
                  <img
                    className="cert-img"
                    src={c.image}
                    alt={`${c.title} — certificate`}
                    loading="lazy"
                  />
                ) : (
                  <div className="cert-banner">
                    <i className={`${c.logo} colored cert-banner-logo`} aria-hidden="true" />
                    <p className="cert-banner-title">{c.issuer}</p>
                    <p className="cert-banner-sub">Certificate of Completion</p>
                  </div>
                )}
                <div className="cert-overlay">
                  <a
                    href={c.link || c.image}
                    target="_blank"
                    rel="noreferrer"
                    className="cert-overlay-link"
                  >
                    <span>{c.link ? "Verify Credential" : "View Certificate"}</span>
                    <i className="fa-solid fa-arrow-right-long" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="cert-info">
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
