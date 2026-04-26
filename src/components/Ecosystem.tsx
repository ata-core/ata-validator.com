type Logo = { name: string; src: string; ring: 'inner' | 'outer'; angle: number }

// Express + Fastify dropped: visual quality issues, plus framework rather than runtime.
// Remaining 10 logos balanced across inner (4) and outer (6) rings,
// angles hand-tuned so neighbours don't crowd.
const logos: Logo[] = [
  { name: 'Node.js',            src: '/ecosystem/node.svg',       ring: 'inner', angle: 36  },
  { name: 'Deno',               src: '/ecosystem/deno.svg',       ring: 'outer', angle: 0   },
  { name: 'Bun',                src: '/ecosystem/bun.svg',        ring: 'outer', angle: 60  },
  { name: 'Cloudflare Workers', src: '/ecosystem/cloudflare.svg', ring: 'inner', angle: 108 },
  { name: 'Vercel',             src: '/ecosystem/vercel.svg',     ring: 'outer', angle: 120 },
  { name: 'Next.js',            src: '/ecosystem/next.svg',       ring: 'outer', angle: 180 },
  { name: 'Nuxt',               src: '/ecosystem/nuxt.svg',       ring: 'inner', angle: 216 },
  { name: 'Svelte',             src: '/ecosystem/svelte.svg',     ring: 'outer', angle: 240 },
  { name: 'Expo',               src: '/ecosystem/expo.svg',       ring: 'outer', angle: 300 },
  { name: 'C++',                src: '/ecosystem/cpp.png',        ring: 'inner', angle: 288 },
]

export function Ecosystem() {
  return (
    <section className="ecosystem">
      <div className="ecosystem-inner">
        <div className="orbit" aria-hidden>
          <div className="orbit-ring orbit-ring-1" />
          <div className="orbit-ring orbit-ring-2" />
          <div className="orbit-ring orbit-ring-3" />
          <div className="orbit-ring orbit-ring-4" />
          <div className="orbit-ring orbit-ring-5" />
          <div className="orbit-center">
            <span className="orbit-center-text" aria-hidden>ata</span>
          </div>
          {logos.map((logo) => (
            <div
              key={logo.name}
              className={`orbit-item orbit-item--${logo.ring}`}
              style={{ ['--angle' as string]: `${logo.angle}deg` }}
              title={logo.name}
            >
              <img src={logo.src} alt={logo.name} className="orbit-item-img" />
            </div>
          ))}
        </div>

        <div className="ecosystem-text">
          <div className="section-kicker">Your code,</div>
          <h2 className="section-title-xl gradient-text">Your runtime</h2>
          <p>
            <strong>ata compile</strong> emits a 0.5 KB pure-JS bundle with zero
            runtime dependencies. Drop it into any JavaScript environment
            (Node, Bun, Deno, Cloudflare Workers, the browser) and validate at
            native speed.
          </p>
          <p>
            For server‑side native performance, <strong>ata-validator</strong> wraps
            the C++ engine for Node.js, and the C library can be linked into any
            native application via CMake.
          </p>
        </div>
      </div>
    </section>
  )
}
