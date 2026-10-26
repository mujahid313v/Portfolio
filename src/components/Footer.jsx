import { nav, site } from "../data/portfolio.js";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__brand">
        {site.brandMain} <span className="purple-text">{site.brandAccent}</span>
      </p>
      <nav aria-label="Footer">
        <ul className="footer-nav-links">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="footer__copy">
        © {new Date().getFullYear()} {site.name} · Built with React + Vite
      </p>
    </footer>
  );
}
