import { useEffect } from "react";
import { TopBar } from "./docs/TopBar";
import "./docs/docs.css";
import { Hero } from "./components/Hero";
import { Benefits } from "./components/Benefits";
import { QuickStart } from "./components/QuickStart";
import { Measured } from "./components/Measured";
import { Integrations } from "./components/Integrations";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <TopBar />
      <Hero />
      <Benefits />
      <QuickStart />
      <Measured />
      <Integrations />

      <section className="opensource" data-reveal>
        <div className="section-kicker">Free &amp; open source</div>
        <h2 className="section-title-xl gradient-text">MIT licensed</h2>
        <p>ata-validator is MIT licensed and open to contributions.</p>
        <a
          href="https://github.com/ata-core/ata-validator"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient"
        >
          ★ Star on GitHub
        </a>
      </section>
      <Footer />
    </>
  );
}
