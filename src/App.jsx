import { lazy, Suspense, useState } from "react";
import CustomCursor from "./components/CustomCursor.jsx";
import Preloader from "./components/Preloader.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Certs from "./components/Certs.jsx";
import Profiles from "./components/Profiles.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ResumeModal from "./components/ResumeModal.jsx";

const ParticleCanvas = lazy(() => import("./components/ParticleCanvas.jsx"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Suspense fallback={null}>
        <ParticleCanvas />
      </Suspense>
      <ScrollProgress />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certs />
        <Profiles />
        <Contact />
      </main>
      <Footer />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
