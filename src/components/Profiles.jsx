import { profiles, profileHandle } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function Profiles() {
  return (
    <section className="content-section" id="profiles" aria-labelledby="profiles-heading">
      <h2 className="section-title" id="profiles-heading">
        Web Presence - <span className="purple-text">Dev Network!</span>
      </h2>
      <Reveal>
        <div className="profile-header">
          <div className="profile-img-main" aria-hidden="true">
            <span className="profile-monogram">MV</span>
          </div>
          <div className="profile-text">
            <p className="purple-text">{profileHandle}</p>
          </div>
        </div>
        <div className="profiles-grid">
          {profiles.map((p) => (
            <a
              key={p.label}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="profile-card"
            >
              <div className="profile-icon">
                <i className={p.icon} style={{ color: p.color }} aria-hidden="true" />
              </div>
              <div className="profile-info">
                <h3>{p.label}</h3>
                <p>{p.action}</p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
