import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0b0f20", color: "white", fontFamily: "sans-serif", backgroundImage: "radial-gradient(circle at 85% 30%, #5b3fd044, transparent 38%)" }}><div style={{ color: "#38bdf8", fontSize: 24, letterSpacing: 8 }}>THE VAULT · AHMEDABAD, INDIA</div><div style={{ fontSize: 76, fontWeight: 700, marginTop: 32 }}>Mujahid Vhora</div><div style={{ color: "#a5b4fc", fontSize: 40, marginTop: 18 }}>Secure by design.</div><div style={{ color: "#98a2b3", fontSize: 24, marginTop: 45 }}>Full-Stack Developer · AI Systems · Cybersecurity</div></div>, size);
}
