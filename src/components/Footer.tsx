export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h5>Packages</h5>
          <a href="https://www.npmjs.com/package/ata-validator" target="_blank">ata-validator (npm)</a>
          <a href="https://www.npmjs.com/package/fastify-ata" target="_blank">fastify-ata (npm)</a>
        </div>
        <div className="footer-col">
          <h5>GitHub</h5>
          <a href="https://github.com/ata-core/ata-validator" target="_blank">ata-validator</a>
          <a href="https://github.com/ata-core/fastify-ata" target="_blank">fastify-ata</a>
          <a href="https://github.com/ata-core/ata-playground" target="_blank">ata-playground</a>
          <a href="https://github.com/ata-core/ata-validator/issues" target="_blank">Issues</a>
        </div>
        <div className="footer-col">
          <h5>Resources</h5>
          <a href="https://json-schema.org/" target="_blank">JSON Schema</a>
          <a href="https://simdjson.org/" target="_blank">simdjson</a>
          <a href="https://github.com/google/re2" target="_blank">RE2</a>
        </div>
        <div className="footer-col">
          <h5>Author</h5>
          <a href="https://github.com/mertcanaltin" target="_blank">Mert Can Altin</a>
          <a href="https://x.com/mecaltin" target="_blank">X / Twitter</a>
        </div>
      </div>
      <div className="footer-cta">
        <p>Free & open source. MIT licensed.</p>
        <a href="https://github.com/ata-core/ata-validator" target="_blank" className="btn btn-primary">
          Star on GitHub
        </a>
      </div>
      <div className="footer-bottom">
        &copy; 2026 Mert Can Altin. MIT License.
      </div>
    </footer>
  )
}
