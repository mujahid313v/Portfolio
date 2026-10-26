// ─────────────────────────────────────────────────────────────
// All site content lives here. Edit and save — the site updates.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Mujahid Vhora",
  brandMain: "Mujahid",
  brandAccent: "| MV",
  role: "Full-Stack Developer & AI Systems Engineer",
  tagline: ["Build.", "Scale.", "Secure.", "Innovate."],
  location: "Ahmedabad, Gujarat, India",
  email: "vhoramujahid007@gmail.com",
  resumeUrl: "/resume.pdf",
};

export const nav = [
  { label: "Home", href: "#home", icon: "fa-solid fa-house", section: "home" },
  { label: "About", href: "#about", icon: "fa-solid fa-user", section: "about" },
  { label: "Experience", href: "#experience", icon: "fa-solid fa-briefcase", section: "experience" },
  { label: "Projects", href: "#projects", icon: "fa-solid fa-code", section: "projects" },
  { label: "Skills", href: "#skills", icon: "fa-solid fa-bolt", section: "skills" },
  { label: "Certs", href: "#certifications", icon: "fa-solid fa-award", section: "certifications" },
  { label: "Profiles", href: "#profiles", icon: "fa-solid fa-share-nodes", section: "profiles" },
  { label: "Contact", href: "#contact", icon: "fa-solid fa-envelope", section: "contact" },
];

export const heroIcons = [
  "fa-solid fa-code",
  "fa-solid fa-brain",
  "fa-solid fa-shield-halved",
  "fa-regular fa-lightbulb",
];

export const about = {
  title: "About Me - ",
  highlight: "Behind The Code!",
  paragraphs: [
    "I’m a Full-Stack & AI Systems Engineer who turns real problems into clean, working software. I learn by shipping: from REST APIs and relational databases to AI-powered features running in production, I like owning the whole stack.",
    "I build with Node.js, Next.js, and TypeScript, and I care about the details that make products trustworthy: secure coding, input validation, authentication, and applications that are safe by design. My focus is simple: fast, clean, secure web products that people enjoy using.",
    "Currently open to full-stack, AI systems, and cybersecurity roles.",
  ],
};

export const experience = [
  {
    period: "6 MONTHS",
    tag: "Production Experience",
    title: "Pelquant — Software Development Engineer (Full-Stack / AI Systems)",
    bullets: [
      "Developing and maintaining scalable web applications while writing clean, efficient, and production-ready code.",
      "Designing relational schemas in PostgreSQL and integrating automated AI workflows into live production environments.",
      "Collaborating with cross-functional teams to implement features, debug applications, and improve system performance and security.",
    ],
  },
  {
    period: "GRADUATED",
    tag: "Education",
    title: "LJ University — Bachelor of Computer Applications (BCA)",
    bullets: [
      "Strong foundation in core computer science, software engineering, databases, and object-oriented programming.",
    ],
  },
];

export const projects = [
  {
    date: "2K26",
    tag: "Full-Stack Project",
    name: "Daily Mood Tracker",
    description:
      "A full-stack web app for daily mood logging and mental-health tracking — secure authentication, interactive analytics dashboards, and clean data visualization. Live on Vercel.",
    link: "https://daily-mood-tracker-omega.vercel.app",
    source: "https://github.com/mujahid313v",
  },
  {
    date: "2K26",
    tag: "AI & Backend Systems",
    name: "AI-Driven System & API Workflows",
    description:
      "High-performance RESTful API services with automated AI pipelines, safe data modeling, and role-based endpoint protection built into production flows.",
    link: null,
    source: "https://github.com/mujahid313v",
  },
];

export const skillCategories = [
  "All",
  "Languages",
  "Frontend",
  "Backend & Databases",
  "Cloud & DevOps",
  "Security",
];

export const skills = [
  { name: "JavaScript", cat: "Languages", icon: "devicon-javascript-plain" },
  { name: "TypeScript", cat: "Languages", icon: "devicon-typescript-plain" },
  { name: "Core Java", cat: "Languages", icon: "devicon-java-plain" },
  { name: "SQL", cat: "Languages", icon: "devicon-postgresql-plain" },
  { name: "React", cat: "Frontend", icon: "devicon-react-original" },
  { name: "Next.js", cat: "Frontend", icon: "devicon-nextjs-original-wordmark" },
  { name: "Tailwind CSS", cat: "Frontend", icon: "devicon-tailwindcss-plain" },
  { name: "HTML5", cat: "Frontend", icon: "devicon-html5-plain" },
  { name: "CSS3", cat: "Frontend", icon: "devicon-css3-plain" },
  { name: "Node.js", cat: "Backend & Databases", icon: "devicon-nodejs-plain" },
  { name: "Express", cat: "Backend & Databases", icon: "devicon-express-original-wordmark" },
  { name: "PostgreSQL", cat: "Backend & Databases", icon: "devicon-postgresql-plain" },
  { name: "REST APIs", cat: "Backend & Databases", icon: "fa-solid fa-plug" },
  { name: "AWS", cat: "Cloud & DevOps", icon: "devicon-amazonwebservices-plain-wordmark" },
  { name: "Vercel", cat: "Cloud & DevOps", icon: "fa-solid fa-caret-up" },
  { name: "Git", cat: "Cloud & DevOps", icon: "devicon-git-plain" },
  { name: "GitHub", cat: "Cloud & DevOps", icon: "devicon-github-original" },
  { name: "OWASP Top 10", cat: "Security", icon: "fa-solid fa-user-shield" },
  { name: "Secure API Design", cat: "Security", icon: "fa-solid fa-lock" },
  { name: "Auth & RBAC", cat: "Security", icon: "fa-solid fa-id-card" },
  { name: "Code Auditing", cat: "Security", icon: "fa-solid fa-magnifying-glass" },
];

export const certs = [
  {
    title: "AWS Academy Graduate — Cloud Architecting",
    issuer: "Amazon Web Services",
    summary:
      "60 hours of training completed (issued Apr 2026) in architecting resilient, secure, and cost-optimized cloud systems on AWS. Verified digital badge on Credly.",
    image: "/certs/aws.jpg",
    link: "https://www.credly.com/go/bhyuksM1",
  },
  {
    title: "LJ Innovation Village — Certificate of Participation",
    issuer: "LJ University, Ahmedabad",
    summary:
      "Showcased the CookCraft AI project/startup at LJ Innovation Village, held 14th & 15th February 2025 at LJ Campus, S.G. Road, Ahmedabad.",
    image: "/certs/lj-innovation-village-landscape.jpg",
    link: null,
  },
  // Add more certificates here — same shape: { title, issuer, summary, image, link }
];

export const profiles = [
  {
    label: "LinkedIn",
    action: "Connect",
    url: "https://linkedin.com/in/mujahid007",
    icon: "fa-brands fa-linkedin",
    color: "#0077b5",
  },
  {
    label: "GitHub",
    action: "Commit",
    url: "https://github.com/mujahid313v/",
    icon: "fa-brands fa-github",
    color: "#ffffff",
  },
];

export const profileHandle = "@mujahid313v";

export const contact = {
  title: "Get In Touch - ",
  highlight: "Ask Me Anything!",
  note: [
    "Ready to collaborate or have a project in mind?",
    "I'm always open to new opportunities and interesting conversations.",
  ],
};
