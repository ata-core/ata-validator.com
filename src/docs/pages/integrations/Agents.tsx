import { Link } from 'react-router-dom'
import { DocsCode } from '../../../components/DocsCode'

const MCP_BLOCKED = [
  { provider: 'ata', valid: '174 ns', invalid: '499 ns' },
  { provider: 'cfworker', valid: '2,788 ns', invalid: '837 ns' },
  { provider: 'ajv (SDK default)', valid: 'throws EvalError', invalid: 'throws EvalError' },
]

const MCP_ALLOWED = [
  { provider: 'ata', valid: '15 ns', invalid: '201 ns' },
  { provider: 'ajv (SDK default)', valid: '52 ns', invalid: '34 ns' },
  { provider: 'cfworker', valid: '2,737 ns', invalid: '831 ns' },
]

export default function IntegrationAgents() {
  return (
    <>
      <p className="dx-eyebrow">Integrations</p>
      <h1>Agents and MCP</h1>
      <p className="dx-lede">
        Every contact an agent has with the world goes through a JSON Schema: the tool
        definition it is prompted with, the arguments it produces, the structured output it
        returns, the config it is driven by. ata covers that loop end to end: describe the
        contract to the model, validate what comes back, explain the failure in words a model
        can act on, and pin the contract's identity with a hash.
      </p>

      <h2>The loop</h2>
      <DocsCode lang="js">{`import { Validator, describeSchema, toRetryMessage } from 'ata-validator'

// 1. the schema is part of the prompt
const prompt = describeSchema(schema)
// output: object
//   status: one of "AWAITING_CLEARANCE", "PART_SETTLED", "CLOSED_OUT"
//   amount: integer, at least 1
//   no other fields

// 2. the model's output is validated
const r = new Validator(schema).validate(fromTheModel)

// 3. a failure goes back to the model as instructions, not as a stack trace
if (!r.valid) retry(toRetryMessage(r.errors))
// /status: expected one of ["AWAITING_CLEARANCE", ...], found "partial"`}</DocsCode>
      <p>
        Whether the description and the retry message are worth anything is measured, not
        assumed. On schemas whose constraints are not inferable from a field name, first-attempt
        compliance went from 0 of 30 to 30 of 30 when the prompt carried the derived
        description, and retry recovery went from 0% to 100% when the retry message stated the
        violated constraint.{' '}
        <a href="https://github.com/mertcanaltin/retry-message-experiment" target="_blank" rel="noreferrer">
          The retry harness is public
        </a>
        , with the raw results. On schemas a model can guess from names alone, neither made a
        difference, and the write-up says so.
      </p>

      <h2>MCP: a validator provider for the official SDK</h2>
      <p>
        The Model Context Protocol TypeScript SDK validates structured tool results and
        elicitation responses through a pluggable <code>jsonSchemaValidator</code>. It ships two
        providers: one on the default validator most frameworks use, and one added specifically
        for Cloudflare Workers, because the default compiles schemas with{' '}
        <code>new Function</code> and edge runtimes refuse it.{' '}
        <code>@ata-project/mcp</code> is a third, needing no code generation either:
      </p>
      <DocsCode lang="js">{`import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { AtaJsonSchemaValidator } from '@ata-project/mcp'

const client = new Client(info, {
  jsonSchemaValidator: new AtaJsonSchemaValidator(),
})`}</DocsCode>
      <p>
        Verified end to end against SDK 1.30.0 over an in-memory transport, with a tool
        declaring an <code>outputSchema</code>: with code generation allowed, all three
        providers accept the same valid result and reject the same invalid one with the same
        MCP error. With code generation blocked, the way Workers and strict-CSP pages block it,
        the SDK's default provider fails the tool call even when the result is valid; the
        cfworker provider and ata keep answering. What that costs per validation, on an
        eight-field tool schema, medians of 7 interleaved rounds, Node 25, ata-validator 1.25.0:
      </p>
      <table className="dx-table">
        <thead>
          <tr><th>Code generation blocked</th><th>valid</th><th>invalid</th></tr>
        </thead>
        <tbody>
          {MCP_BLOCKED.map((r) => (
            <tr key={r.provider}>
              <td>{r.provider}</td>
              <td className="dx-num">{r.valid}</td>
              <td className="dx-num">{r.invalid}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="dx-table">
        <thead>
          <tr><th>Code generation allowed</th><th>valid</th><th>invalid</th></tr>
        </thead>
        <tbody>
          {MCP_ALLOWED.map((r) => (
            <tr key={r.provider}>
              <td>{r.provider}</td>
              <td className="dx-num">{r.valid}</td>
              <td className="dx-num">{r.invalid}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        The invalid rows include building the error message string, because a rejected tool
        call goes back to the model, so the message is part of the next prompt, not a log line.
        The provider reports errors in the same wording the SDK's own providers use, so
        swapping it changes no strings an agent already depends on.
      </p>

      <h2>Contract identity</h2>
      <p>
        An agent system's real failure mode is not invalid data, it is a stale contract:
        a tool schema changed and something still validates against the old one. Every module{' '}
        <code>ata build</code> emits carries <code>schemaHash</code>, a content hash of the
        schema it was compiled from, and <code>schemaHash(schema)</code> from{' '}
        <code>ata-validator/build</code> computes the same value at build time, so a deploy can
        detect the drift by comparing two strings instead of trusting a version label.
      </p>

      <h2>Where agents actually run</h2>
      <p>
        Agent infrastructure lives on edge runtimes, and edge runtimes refuse code generation.
        ata validates there on its interpreted engine at 100% of the official suite, and a
        schema compiled ahead of time into a standalone module does 27 million verdicts per
        second on Cloudflare Workers, where the platform's usual answer manages 188 thousand.
        The measurements and the demo are on{' '}
        <Link to="/docs/integrations/cloudflare-workers">the Workers page</Link>.
      </p>
    </>
  )
}
