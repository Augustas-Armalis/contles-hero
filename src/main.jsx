import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LenisProvider from './components/LenisProvider.jsx'

// Use Vite's configured base so routing works on both:
// - custom domain root (BASE_URL = '/')
// - subpath deploys (e.g. BASE_URL = '/contles-hero/')
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <LenisProvider>
        <App />
      </LenisProvider>
    </BrowserRouter>
  </StrictMode>,
)
