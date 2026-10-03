import { AsciiDinos, Ambient, GlowSpots } from "@/components/Backdrop";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Ambient />
      <ScrollProgress />
      <Navbar />
      <div className="relative flex flex-1 flex-col">
        <GlowSpots />
        <AsciiDinos />
        <main className="flex-1">
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
