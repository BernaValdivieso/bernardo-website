import { AboutSection } from "./components/about-section/about-section";
import { HeroSection } from "./components/hero-section/hero-section";
import { Navbar } from "./components/nav-bar/nav-bar";
import { ProductsTable } from "./components/products/products-table";
import { ProjectsSection } from "./components/projects-section/projects-section";
import CreateProductForm from "./components/products/create-product-form";
import { FintocSection } from "./components/fintoc-section/fintoc-section";
import FintocWidget from "./components/fintoc-section/fintoc-widget";

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
          <ProductsTable />
        </section>
        <section id="create-product">
          <CreateProductForm />
        </section>
        <section id="fintoc-widget">
          <FintocWidget />
        </section>
        <section id="fintoc-section">
          <FintocSection />
        </section>
      </div>
    </main>
  );
}
