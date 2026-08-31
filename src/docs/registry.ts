// One entry per documentation page. The sidebar, the prev/next pager and the
// search palette all read this list, so a new page is added in one place.

export type DocPage = {
  slug: string        // route under /docs, '' is the index
  title: string
  group: string
  summary: string     // shown in search results
  keywords?: string[] // extra search terms that are not in the title
}

// The overview sits above the groups in the sidebar and at the head of the
// previous/next chain. It is the site's front page and a documentation page at
// the same time.
export const HOME_PAGE: DocPage = {
  slug: '/',
  title: 'Overview',
  group: '',
  summary: 'What ata-validator is, in one page',
  keywords: ['home', 'start', 'ata'],
}

export const DOC_PAGES: DocPage[] = [
  {
    slug: '',
    title: 'Introduction',
    group: 'Getting started',
    summary: 'What ata-validator is and what it is for',
    keywords: ['about', 'overview', 'json schema'],
  },
  {
    slug: 'quick-start',
    title: 'Quick start',
    group: 'Getting started',
    summary: 'Install, validate a schema, read the result',
    keywords: ['install', 'first', 'example', 'getting started'],
  },
  {
    slug: 'installation',
    title: 'Installation',
    group: 'Getting started',
    summary: 'npm install, optional native packages, pure-JS setups',
    keywords: ['npm', 'native', 'addon', 'musl', 'RE2', 'browser', 'edge'],
  },
  {
    slug: 'how-it-works',
    title: 'How it works',
    group: 'Guides',
    summary: 'Compile once, validate many times, and the three engines',
    keywords: ['codegen', 'interpreter', 'closure', 'engine', 'compile'],
  },
  {
    slug: 'errors',
    title: 'Errors',
    group: 'Guides',
    summary: 'The error object, renderers and diagnostics with source locations',
    keywords: ['renderPretty', 'renderCompact', 'diagnostics', 'messages', 'codes'],
  },
  {
    slug: 'typescript',
    title: 'TypeScript',
    group: 'Guides',
    summary: 'defineSchema, Infer<S> and the chainable builder',
    keywords: ['types', 'inference', 'Infer', 'defineSchema', 'builder', 't'],
  },
  {
    slug: 'dialects',
    title: 'Dialects',
    group: 'Guides',
    summary: 'Draft 2020-12, draft 7 and the JSON Schema v1 dialect',
    keywords: ['draft-07', '2020-12', 'v1', 'propertyDependencies', '$dynamicRef'],
  },
  {
    slug: 'api',
    title: 'API reference',
    group: 'Reference',
    summary: 'Validator, options, methods and the standalone build',
    keywords: ['validate', 'isValidObject', 'validateJSON', 'options', 'coerceTypes'],
  },
  {
    slug: 'error-codes',
    title: 'Error codes',
    group: 'Reference',
    summary: 'Every ATA code with an explanation page',
    keywords: ['ATA1001', 'codes', 'reference'],
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    group: 'Ecosystem',
    summary: 'Fastify, react-jsonschema-form, Vite and Standard Schema',
    keywords: ['fastify', 'rjsf', 'vite', 'standard schema', 'node'],
  },
  {
    slug: 'benchmarks',
    title: 'Benchmarks',
    group: 'Ecosystem',
    summary: 'Measured throughput, cost per call and memory per validator',
    keywords: ['bench', 'ops', 'throughput', 'memory', 'numbers', 'speed'],
  },
  {
    slug: 'performance',
    title: 'Performance',
    group: 'Ecosystem',
    summary: 'What is measured, how it is measured, and the current figures',
    keywords: ['benchmark', 'speed', 'memory', 'footprint', 'ops'],
  },
  {
    slug: 'compliance',
    title: 'Compliance',
    group: 'Ecosystem',
    summary: 'Test suite results for the current release',
    keywords: ['test suite', 'bowtie', 'coverage', 'json schema test suite'],
  },
  {
    slug: 'faq',
    title: 'FAQ',
    group: 'Ecosystem',
    summary: 'Common questions about runtimes, stability and support',
    keywords: ['questions', 'node versions', 'stability', 'browser'],
  },
]

export const DOC_GROUPS = ['Getting started', 'Guides', 'Reference', 'Ecosystem']

export const docHref = (slug: string) =>
  slug === '/' ? '/' : slug ? `/docs/${slug}` : '/docs'

// Order of the previous/next chain across the whole site.
export const DOC_CHAIN: DocPage[] = [HOME_PAGE, ...DOC_PAGES]

export const ATA_VERSION = '1.11.0'
