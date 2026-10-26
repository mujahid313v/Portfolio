import { useState } from "react";
import { contact, site } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "someone"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="contact-section" id="contact">
      <Reveal>
        <h2 className="section-title">
          {contact.title}
          <span className="purple-text">{contact.highlight}</span>
        </h2>
      </Reveal>

      <div className="contact-card glass-card">
        <div className="contact-note">
          {contact.note.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>
            <i className="fa-solid fa-envelope" aria-hidden="true" />{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              placeholder=" "
              required
              value={form.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
            <i className="fa-solid fa-user input-icon" aria-hidden="true" />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" "
              required
              value={form.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <i className="fa-solid fa-envelope input-icon" aria-hidden="true" />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              id="message"
              placeholder=" "
              rows="4"
              required
              value={form.message}
              onChange={handleChange}
            />
            <label htmlFor="message">Message</label>
            <i className="fa-solid fa-comment-dots input-icon" aria-hidden="true" />
          </div>
          <button type="submit" className="btn-resume">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
