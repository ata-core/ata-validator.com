export default function IntegrationStandards() {
  return (
    <>
      <p className="dx-eyebrow">Integrations</p>
      <h1>Standards and runtimes</h1>
      <p className="dx-lede">
        The pieces that make ata pluggable without a named integration: a standard interface,
        and the places the engine itself is verified.
      </p>

      <h2>Standard Schema V1</h2>
      <p>
        A <code>Validator</code> implements the Standard Schema V1 interface, so form libraries,
        ORMs and RPC layers that accept that shape can take an ata schema with no adapter.
      </p>

      <h2>Node.js</h2>
      <p>
        A vendored integration for validating <code>node.config.json</code> was prototyped in
        nodejs/node#62603. It is parked as a draft while the discussion about which validation
        API core should expose continues, so ata is not part of Node.js today.
      </p>

      <h2>Bowtie</h2>
      <p>
        ata takes part in Bowtie, the cross-implementation JSON Schema test harness, so its
        results can be compared against other implementations on the official suite without
        anyone taking our word for it.
      </p>
    </>
  )
}
