export const doorCategories = [
  {
    id: "web-development",
    title: "Web Development",
    tagline: "Interfaces and full-stack products made for people.",
    checklist: ["Build responsive React and Next.js apps", "Design clear, accessible interfaces", "Ship end-to-end product features", "Connect UI to secure APIs"],
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    tagline: "Useful services, thoughtful data models, reliable integrations.",
    checklist: ["Build REST APIs with Node.js", "Model PostgreSQL data with Prisma", "Add authentication and role-aware access", "Integrate external and AI services"],
  },
  {
    id: "ai-systems",
    title: "AI Systems",
    tagline: "Practical AI workflows connected to real product needs.",
    checklist: ["Integrate AI capabilities into apps", "Connect APIs to automated workflows", "Design useful human-facing features", "Build with production constraints in mind"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Security reviews that turn real findings into better software.",
    checklist: ["Review authorization boundaries", "Use JWT and HttpOnly cookie sessions", "Validate input with Zod", "Rate limit routes and review OWASP risks", "Keep secrets out of Docker layers"],
  },
  {
    id: "open-source",
    title: "Open Source",
    tagline: "Small, useful contributions that make shared tools clearer.",
    checklist: ["Contribute focused documentation fixes", "Follow project contribution guidelines", "Open clear, reviewable pull requests", "Learn from collaborative code review"],
  },
] as const;

export type DoorCategory = (typeof doorCategories)[number]["title"];
