import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        background: 'var(--color-bg)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 700, fontSize: 20, color: 'var(--color-text)', letterSpacing: '-0.04em' }}>
          contles
        </Link>
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
            fontFamily: 'inherit',
          }}
        >
          ← Go back
        </button>
      </nav>

      {/* Main */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        {/* Gradient blob */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(95,14,236,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'block',
            fontSize: 'clamp(96px, 18vw, 160px)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            lineHeight: 1,
            background: 'linear-gradient(135deg, #5f0eec 0%, #a855f7 60%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            userSelect: 'none',
            marginBottom: 8,
          }}
        >
          404
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: 'clamp(26px, 5vw, 38px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
            margin: '0 0 12px',
          }}
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: 'var(--color-alt)',
            maxWidth: 380,
            marginBottom: 36,
            lineHeight: 1.5,
          }}
        >
          Looks like this page wandered off. Let&apos;s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link to="/" className="big-button" style={{ textDecoration: 'none' }}>
            <p className="button-text" style={{ color: 'white' }}>Back to Home</p>
          </Link>
          <a href="https://join.contles.com" className="alt-small-button" style={{ textDecoration: 'none', padding: '8.5px 18px', fontSize: 18, fontWeight: 520, borderRadius: 12 }}>
            Join waitlist
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 14 }}
        >
          <div style={{ height: 1, width: 56, background: 'var(--color-border)' }} />
          <span style={{ fontSize: 13, color: 'var(--color-alt)', fontWeight: 500 }}>Quick links</span>
          <div style={{ height: 1, width: 56, background: 'var(--color-border)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap', justifyContent: 'center' }}
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
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-alt)',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
              }}
            >
              {label}
            </Link>
          ))}
        </motion.div>
      </main>

      <footer
        style={{
          textAlign: 'center',
          padding: '20px 24px',
          fontSize: 13,
          color: 'var(--color-border)',
        }}
      >
        © {new Date().getFullYear()} Contles. All rights reserved.
      </footer>
    </div>
  )
}

export default NotFound
