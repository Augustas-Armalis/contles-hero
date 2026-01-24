import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LenisProvider from './components/LenisProvider.jsx'

// Get the base path from the current location (for GitHub Pages)
const basename = import.meta.env.PROD ? '/contles-hero' : ''

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <LenisProvider>
        <App />
      </LenisProvider>
    </BrowserRouter>
  </StrictMode>,
)
