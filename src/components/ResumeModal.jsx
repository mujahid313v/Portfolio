import { useEffect } from "react";
import { site } from "../data/portfolio.js";

export default function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="resume-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
      onClick={onClose}
    >
      <div className="resume-modal__content glass-card expanded" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal__head">
          <h3>Resume — {site.name}</h3>
          <div className="resume-modal__actions">
            <a className="cert-overlay-link" href={site.resumeUrl} download>
              <i className="fa-solid fa-download" aria-hidden="true" /> Download
            </a>
            <button className="resume-modal__close" onClick={onClose} aria-label="Close resume">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </div>
        </div>
        <iframe src={site.resumeUrl} title="Resume PDF" />
      </div>
    </div>
  );
}
