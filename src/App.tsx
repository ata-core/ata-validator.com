import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Foundation } from './components/Foundation'
import { Ecosystem } from './components/Ecosystem'
import { Features } from './components/Features'
import { Compliance } from './components/Compliance'
import { QuickStart } from './components/QuickStart'
import { Architecture } from './components/Architecture'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Foundation />
      <Ecosystem />
      <Features />
      <Compliance />
      <QuickStart />
      <Architecture />
      <section className="opensource">
        <div className="section-kicker">Free &amp; open source</div>
        <h2 className="section-title-xl gradient-text">MIT licensed</h2>
        <p>ata-validator is MIT licensed and open to contributions.</p>
        <a
          href="https://github.com/mertcanaltin/ata-validator"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient"
        >
          ★ Star on GitHub
        </a>
      </section>
      <Footer />
    </>
  )
}
