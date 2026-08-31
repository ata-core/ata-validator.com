import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ErrorCodePage from './ErrorCodePage'
import Playground from './playground/Playground'
import DocsLayout from './docs/DocsLayout'
import Home from './docs/pages/Home'
import Introduction from './docs/pages/Introduction'
import QuickStart from './docs/pages/QuickStart'
import Installation from './docs/pages/Installation'
import HowItWorks from './docs/pages/HowItWorks'
import Errors from './docs/pages/Errors'
import TypeScriptPage from './docs/pages/TypeScript'
import Dialects from './docs/pages/Dialects'
import Api from './docs/pages/Api'
import ErrorCodes from './docs/pages/ErrorCodes'
import Integrations from './docs/pages/Integrations'
import Benchmarks from './docs/pages/Benchmarks'
import Performance from './docs/pages/Performance'
import Compliance from './docs/pages/Compliance'
import Faq from './docs/pages/Faq'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocsLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/playground" element={<Playground />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Introduction />} />
          <Route path="quick-start" element={<QuickStart />} />
          <Route path="installation" element={<Installation />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="errors" element={<Errors />} />
          <Route path="typescript" element={<TypeScriptPage />} />
          <Route path="dialects" element={<Dialects />} />
          <Route path="api" element={<Api />} />
          <Route path="error-codes" element={<ErrorCodes />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="benchmarks" element={<Benchmarks />} />
          <Route path="performance" element={<Performance />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="faq" element={<Faq />} />
          <Route path="*" element={<Navigate to="/docs" replace />} />
        </Route>
        <Route path="/e" element={<ErrorCodePage />} />
        <Route path="/e/" element={<ErrorCodePage />} />
        <Route path="/e/:code" element={<ErrorCodePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
