import { describe, expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { DOC_CHAIN, DOC_PAGES, docHref } from './registry'
import DocsLayout from './DocsLayout'
import Home from './pages/Home'
import Introduction from './pages/Introduction'
import QuickStart from './pages/QuickStart'
import Installation from './pages/Installation'
import HowItWorks from './pages/HowItWorks'
import Errors from './pages/Errors'
import TypeScriptPage from './pages/TypeScript'
import Dialects from './pages/Dialects'
import Api from './pages/Api'
import ErrorCodes from './pages/ErrorCodes'
import Integrations from './pages/Integrations'
import Benchmarks from './pages/Benchmarks'
import Performance from './pages/Performance'
import Compliance from './pages/Compliance'
import Faq from './pages/Faq'

const ELEMENTS: Record<string, React.ReactElement> = {
  '': <Introduction />,
  'quick-start': <QuickStart />,
  installation: <Installation />,
  'how-it-works': <HowItWorks />,
  errors: <Errors />,
  typescript: <TypeScriptPage />,
  dialects: <Dialects />,
  api: <Api />,
  'error-codes': <ErrorCodes />,
  integrations: <Integrations />,
  benchmarks: <Benchmarks />,
  performance: <Performance />,
  compliance: <Compliance />,
  faq: <Faq />,
}

const renderAt = (slug: string) =>
  renderToStaticMarkup(
    <MemoryRouter initialEntries={[docHref(slug)]}>
      <Routes>
        <Route path="/" element={<DocsLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={ELEMENTS['']} />
          {Object.entries(ELEMENTS)
            .filter(([s]) => s !== '')
            .map(([s, el]) => (
              <Route key={s} path={s} element={el} />
            ))}
        </Route>
      </Routes>
    </MemoryRouter>,
  )

describe('documentation shell', () => {
  test('every registered page has a route and renders', () => {
    for (const page of DOC_PAGES) {
      expect(Object.keys(ELEMENTS)).toContain(page.slug)
      const html = renderAt(page.slug)
      expect(html).toContain('<h1>')
      expect(html).toContain(page.title)
    }
  })

  test('the sidebar lists every page on every page', () => {
    const html = renderAt('api')
    for (const page of DOC_PAGES) {
      expect(html).toContain(`href="${docHref(page.slug)}"`)
    }
  })

  test('the current page is marked active in the sidebar', () => {
    expect(renderAt('errors')).toContain('class="active"')
  })

  test('pages carry previous and next links', () => {
    const html = renderAt('errors')
    expect(html).toContain('Previous')
    expect(html).toContain('Next')
  })

  test('the front page renders inside the shell and starts the chain', () => {
    const html = renderAt('/')
    expect(html).toContain('dx-article-home')
    expect(html).toContain('dx-sidebar')
    expect(html).not.toContain('Previous')
    expect(html).toContain('Next')
  })

  test('the last page in the chain has no next link', () => {
    expect(renderAt(DOC_CHAIN[DOC_CHAIN.length - 1].slug)).not.toContain('>Next<')
  })
})
