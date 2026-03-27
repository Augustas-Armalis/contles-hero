import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

function NotFound() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)

  // Subtle animated particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(95, 14, 236, ${p.o})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      style={{ background: 'var(--color-bg)', minHeight: '100svh', position: 'relative', overflow: 'hidden' }}
      className="flex flex-col"
    >
      {/* Particle canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Gradient blobs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(95,14,236,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Navbar */}
      <nav style={{ position: 'relative', zIndex: 10, padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 20, color: 'var(--color-text)', letterSpacing: '-0.04em' }}>
              contles
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              padding: '7px 16px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 520,
              color: 'var(--color-alt)',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-hover)'; e.currentTarget.style.color = 'var(--color-text)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--color-alt)' }}
          >
            ← Go back
          </button>
        </motion.div>
      </nav>

      {/* Main content */}
      <main
        style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}
      >
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative', marginBottom: 8 }}
        >
          <span
            style={{
              fontSize: 'clamp(100px, 20vw, 180px)',
              fontWeight: 800,
              letterSpacing: '-0.06em',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #5f0eec 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
              userSelect: 'none',
            }}
          >
            404
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="title"
          style={{ marginBottom: 16, color: 'var(--color-text)' }}
        >
          Page not found
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bigalt"
          style={{ maxWidth: 420, marginBottom: 40, color: 'var(--color-alt)' }}
        >
          Looks like this page wandered off. Let&apos;s get you back on track.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link to="/" className="big-button" style={{ textDecoration: 'none' }}>
            <p className="button-text" style={{ color: 'white' }}>Back to Home</p>
          </Link>
          <a
            href="https://join.contles.com"
            className="alt-small-button"
            style={{ textDecoration: 'none', padding: '8.5px 18px', fontSize: 18, fontWeight: 520, borderRadius: 12 }}
          >
            Join waitlist
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 16, color: 'var(--color-border)' }}
        >
          <div style={{ height: 1, width: 60, background: 'var(--color-border)' }} />
          <span style={{ fontSize: 13, color: 'var(--color-alt)', fontWeight: 500 }}>Quick links</span>
          <div style={{ height: 1, width: 60, background: 'var(--color-border)' }} />
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {[
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Terms of Service', to: '/terms' },
            { label: 'About', to: '/about' },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--color-alt)',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-hover)'; e.currentTarget.style.color = 'var(--color-text)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-alt)' }}
            >
              {label}
            </Link>
          ))}
        </motion.div>
      </main>

      {/* Footer note */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '20px 24px', color: 'var(--color-border)', fontSize: 13 }}
      >
        © {new Date().getFullYear()} Contles. All rights reserved.
      </motion.footer>
    </div>
  )
}

export default NotFound
