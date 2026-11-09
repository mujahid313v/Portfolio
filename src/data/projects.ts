import type { DoorCategory } from "@/data/doors";

export type PortfolioProject = {
  name: string;
  category: DoorCategory;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  status?: string;
};

// Edit this list to add projects. Use a screenshot in /public/projects/ and
// provide empty URLs when a destination is unavailable; the UI renders a
// non-clickable placeholder instead of a broken link.
export const projects: PortfolioProject[] = [
  {
    name: "Daily Mood Tracker",
    category: "Web Development",
    description: "A full-stack mood journal with authentication, daily check-ins, analytics, and data visualizations.",
    tech: ["Full-stack", "Authentication", "Analytics"],
    liveUrl: "https://daily-mood-tracker-omega.vercel.app",
    githubUrl: "https://github.com/mujahid313v/Daily-mood-tracker",
    image: "/projects/daily-mood-tracker.svg",
  },
  {
    name: "Invoice & Client Manager",
    category: "Web Development",
    description: "A freelancer workspace for clients, PDF invoices, payment tracking, and an income dashboard.",
    tech: ["SaaS", "PDF", "Dashboard"],
    liveUrl: "https://invoice-manager-ebon-omega.vercel.app/",
    githubUrl: "https://github.com/mujahid313v/invoice-manager",
    image: "/projects/invoice-manager.svg",
  },
  {
    name: "AI-driven API Workflows",
    category: "Backend & APIs",
    description: "Production-oriented REST services with automated AI workflows, relational models, and role-aware endpoints.",
    tech: ["REST APIs", "Node.js", "PostgreSQL", "AI workflows"],
    liveUrl: "",
    githubUrl: "https://github.com/mujahid313v",
    image: "/projects/backend-api.svg",
    status: "Project overview",
  },
  {
    name: "AI Workflow Integration",
    category: "AI Systems",
    description: "Placeholder for a project write-up. Add a specific shipped AI project and its public links here.",
    tech: ["AI workflows", "API integration"],
    liveUrl: "",
    githubUrl: "",
    image: "/projects/ai-systems.svg",
    status: "Placeholder project",
  },
  {
    name: "Daily Mood Tracker Security Review",
    category: "Cybersecurity",
    description: "A self-audit of Daily Mood Tracker identified authorization, session, validation, rate-limit, and Docker secret-exposure issues.",
    tech: ["IDOR review", "Session security", "Zod", "Rate limiting", "Docker"],
    liveUrl: "https://daily-mood-tracker-omega.vercel.app",
    githubUrl: "https://github.com/mujahid313v/Daily-mood-tracker",
    image: "/projects/security-review.svg",
  },
  {
    name: "Microsoft documentation typo fix",
    category: "Open Source",
    description: "Merged documentation typo fix. Repository name and pull-request URL were not provided; add the real details here.",
    tech: ["Documentation", "Open Source"],
    liveUrl: "",
    githubUrl: "",
    image: "/projects/open-source.svg",
    status: "Merged · PR link to add",
  },
];
