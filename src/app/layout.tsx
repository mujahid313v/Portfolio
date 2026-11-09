import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./motion.css";
import "./vault.css";
import "./doors.css";
import "./theme.css";
import "./security.css";

const themeInit = `(()=>{let theme;try{const saved=localStorage.getItem('portfolio-theme');if(saved==='dark'||saved==='light')theme=saved}catch{}if(!theme){try{theme=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}catch{theme='dark'}}document.documentElement.dataset.theme=theme})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://mujahid007-portfolio.vercel.app"),
  title: "Mujahid Vhora | The Vault — Secure by Design",
  description: "Meet Mujahid Vhora: full-stack developer, AI systems engineer, and security-minded builder based in Ahmedabad, India.",
  openGraph: { title: "Mujahid Vhora | The Vault", description: "Full-stack products, AI systems, and security-minded engineering. Open the Vault.", url: "https://mujahid007-portfolio.vercel.app", siteName: "Mujahid Vhora — The Vault", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mujahid Vhora — The Vault, Secure by Design" }] },
  twitter: { card: "summary_large_image", title: "Mujahid Vhora | The Vault", description: "Full-stack products, AI systems, and security-minded engineering." },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#070B1A" }, { media: "(prefers-color-scheme: light)", color: "#F7F5FF" }], colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeInit }}/></head><body><div className="aurora-background" aria-hidden="true"><i className="aurora-blob blob-indigo"/><i className="aurora-blob blob-cyan"/><i className="aurora-blob blob-magenta"/><i className="aurora-blob blob-emerald"/></div>{children}</body></html>;
}
