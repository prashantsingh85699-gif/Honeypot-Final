import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Hackathons from "./components/Hackathons";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Hackathons />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
