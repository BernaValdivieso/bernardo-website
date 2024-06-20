import { AboutSection } from "./components/about-section/about-section";
import { HeroSection } from "./components/hero-section/hero-section";
import { Navbar } from "./components/nav-bar/nav-bar";
import { ProductsSection } from "./components/products-section/products-section";
import { ProjectsSection } from "./components/projects-section/projects-section";
import { FintocSection } from "./components/fintoc-section/fintoc-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <section id="about">
          <AboutSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="products">
          <ProductsSection />
        </section>
        <section id="fintoc">
          <FintocSection />
        </section>
      </div>
    </main>
  );
}
