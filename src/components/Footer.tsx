export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h5>Project</h5>
          <a href="https://github.com/mertcanaltin/ata-validator" target="_blank">GitHub</a>
          <a href="https://www.npmjs.com/package/ata-validator" target="_blank">npm</a>
          <a href="https://github.com/mertcanaltin/ata-validator/issues" target="_blank">Issues</a>
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
      <div className="footer-bottom">
        &copy; 2026 Mert Can Altin. MIT License.
      </div>
    </footer>
  )
}
