import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Docs from './Docs'
import ErrorCodePage from './ErrorCodePage'
import Playground from './playground/Playground'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/e" element={<ErrorCodePage />} />
        <Route path="/e/" element={<ErrorCodePage />} />
        <Route path="/e/:code" element={<ErrorCodePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
