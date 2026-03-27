import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Card from './pages/Card'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()

  useEffect(() => {
    const gtag = window?.gtag
    if (typeof gtag !== 'function') return

    const page_path = `${location.pathname}${location.search}${location.hash}`
    gtag('event', 'page_view', {
      page_path,
      page_title: document.title,
    })
  }, [location.pathname, location.search, location.hash])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/card" element={<Card />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/contacts" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
