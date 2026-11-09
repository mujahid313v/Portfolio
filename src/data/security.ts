export type SecuritySeverity = "High" | "Medium" | "Low";

export type SecurityFinding = {
  title: string;
  severity: SecuritySeverity;
  before: string;
  after: string;
};

// Findings and fixes are drawn from the project's published Security write-up.
export const securityFindings: SecurityFinding[] = [
  {
    title: "Insecure direct object reference (IDOR)",
    severity: "High",
    before: "Entry routes trusted a userId supplied by the client, allowing access to another user's records.",
    after: "Routes derive identity from the authenticated session and verify ownership for every read, update, and delete.",
  },
  {
    title: "User sessions stored in localStorage",
    severity: "High",
    before: "Client-side JavaScript could read the stored session value, exposing it if an XSS flaw occurred.",
    after: "Sessions use server-validated HttpOnly cookies, with issuer and audience checks on tokens.",
  },
  {
    title: "Admin key stored in localStorage",
    severity: "High",
    before: "The admin key was cached in the browser and sent by JavaScript as a Bearer token.",
    after: "The key is exchanged for a short-lived HttpOnly admin-session cookie; comparisons are timing-safe.",
  },
  {
    title: "Secrets could enter Docker image layers",
    severity: "High",
    before: "A broad Docker build context could copy .env files, local databases, and build artifacts into the image.",
    after: "Docker and Git ignore rules exclude environment files and local-only data from the build context.",
  },
  {
    title: "Password hashes could be returned",
    severity: "High",
    before: "Broad user queries risked including password-hash fields in API responses.",
    after: "Authentication and user routes select explicit public fields; password hashes are never returned.",
  },
  {
    title: "Missing input validation",
    severity: "Medium",
    before: "Requests accepted malformed dates, arbitrary mood values, long notes, and weak password input.",
    after: "Zod schemas validate request data at the boundary and reject invalid input with a 400 response.",
  },
  {
    title: "No rate limiting on sensitive routes",
    severity: "Medium",
    before: "Login attempts and public community requests could be repeated without throttling.",
    after: "Sensitive routes use a fixed-window limiter and return 429 when a request limit is reached.",
  },
  {
    title: "Missing browser security headers",
    severity: "Medium",
    before: "Responses lacked protections against content injection, clickjacking, and MIME sniffing.",
    after: "Response security headers add content, framing, and MIME-sniffing protections.",
  },
  {
    title: "Unbounded request payloads",
    severity: "Medium",
    before: "Collection sizes and numeric inputs lacked consistent upper bounds, leaving memory-exhaustion vectors.",
    after: "Payload sizes and numeric fields are bounded before processing.",
  },
];
