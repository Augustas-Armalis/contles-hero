import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

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
    </Routes>
  )
}

export default App
