import About from "@/components/About";
import { AsciiDinos, Ambient } from "@/components/Backdrop";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Ambient />
      <Navbar />
      <div className="relative flex flex-1 flex-col">
        <AsciiDinos />
        <main className="flex-1">
          <Hero />
          <Marquee />
          <About />
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
