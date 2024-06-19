import { AboutSection } from "./components/about-section/about-section";
import { HeroSection } from "./components/hero-section/hero-section";
import { ProjectsSection } from "./components/projects-section/project-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <section id="about">
          <AboutSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
      </div>
    </main>
  );
}
