import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Foundation } from './components/Foundation'
import { Features } from './components/Features'
import { Benchmarks } from './components/Benchmarks'
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
      <Features />
      <Benchmarks />
      <Compliance />
      <QuickStart />
      <Architecture />
      <section className="opensource">
        <h2>Free & open source</h2>
        <p>ata-validator is MIT licensed and open to contributions.</p>
        <a href="https://github.com/mertcanaltin/ata-validator" target="_blank" className="btn btn-primary">
          Star on GitHub
        </a>
      </section>
      <Footer />
    </>
  )
}
