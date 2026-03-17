import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    number: '01',
    title: 'Introduction',
    content: `Welcome to Contles ("we," "our," "us"). These Terms of Service ("Terms") govern your access to and use of our platform, including our website, applications, and services (collectively, the "Service").

By accessing or using Contles, you agree to be bound by these Terms. If you do not agree, please do not use the Service.`,
  },
  {
    number: '02',
    title: 'Eligibility',
    content: `You must be at least 16 years old to use our Service. By using Contles, you represent and warrant that you meet this age requirement and that you have the legal capacity to enter into these Terms.

If you are using Contles on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.`,
  },
  {
    number: '03',
    title: 'Description of Service',
    content: `Contles is a platform that connects brands and creators for collaboration, campaign management, and payments. Through Contles, brands can discover and work with creators, manage campaigns, and process payments — all in one place.

We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.`,
  },
  {
    number: '04',
    title: 'User Accounts',
    content: `To access certain features, you must create an account. You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized use

You may not share your account with others or create multiple accounts for the same person or entity.`,
  },
  {
    number: '05',
    title: 'User Responsibilities',
    content: `By using Contles, you agree not to:

• Violate any applicable laws or regulations
• Engage in fraudulent, deceptive, or manipulative activity
• Misrepresent your identity, affiliations, or audience metrics
• Use the platform for spam or unsolicited communications
• Attempt to reverse-engineer, scrape, or exploit the platform
• Post or transmit harmful, offensive, or illegal content
• Interfere with the integrity or performance of the Service`,
  },
  {
    number: '06',
    title: 'Payments and Fees',
    content: `Contles facilitates payments between brands and creators. Key points:

• We may charge service fees, which will be clearly disclosed before any transaction
• All fees are non-refundable unless explicitly stated otherwise
• You are responsible for any applicable taxes related to your use of the Service
• We use third-party payment processors and are not liable for their errors or failures

We are not responsible for disputes between users regarding deliverables unless explicitly stated in a written agreement with Contles.`,
  },
  {
    number: '07',
    title: 'Intellectual Property',
    content: `Users retain ownership of all content they create and upload to the platform. By submitting content, you grant Contles a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute your content solely for the purpose of operating and promoting the platform.

The Contles name, logo, and all associated branding are the exclusive property of Contles. You may not use them without our prior written consent.`,
  },
  {
    number: '08',
    title: 'Creator and Brand Relationships',
    content: `Contles acts as a marketplace facilitator. We are not a party to any agreement between brands and creators unless explicitly stated. Users are solely responsible for:

• Negotiating and fulfilling their agreements
• Ensuring their content complies with advertising standards and regulations
• Resolving disputes between themselves

We encourage users to clearly define deliverables, timelines, and payment terms before beginning any collaboration.`,
  },
  {
    number: '09',
    title: 'Termination',
    content: `We may suspend or terminate your account at any time, with or without notice, for:

• Violations of these Terms
• Fraudulent or harmful behavior
• Extended periods of inactivity
• Legal or regulatory requirements

Upon termination, your right to access the Service ceases immediately. Sections that by their nature should survive termination will continue to apply.`,
  },
  {
    number: '10',
    title: 'Disclaimer of Warranties',
    content: `The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. Contles does not warrant that the Service will be uninterrupted, error-free, or that any defects will be corrected.

Your use of the Service is entirely at your own risk.`,
  },
  {
    number: '11',
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by applicable law, Contles and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service.

Our total liability to you for any claims arising from these Terms shall not exceed the fees you paid to Contles in the three months preceding the claim.`,
  },
  {
    number: '12',
    title: 'Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of the Republic of Lithuania, without regard to conflict of law principles.

Any disputes arising from these Terms shall be submitted to the exclusive jurisdiction of the courts of Vilnius, Lithuania.`,
  },
  {
    number: '13',
    title: 'Changes to Terms',
    content: `We may update these Terms from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. When we make material changes, we will notify you via email or a prominent notice on the platform.

Continued use of the Service after any changes constitutes your acceptance of the updated Terms.`,
  },
  {
    number: '14',
    title: 'Contact',
    content: `If you have questions or concerns about these Terms, please reach out to us at hello@contles.com. We aim to respond to all inquiries within 5 business days.`,
  },
]

function Terms() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <img src="/branding/logo.svg" alt="Contles" className="h-[26px] w-auto" />
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-sm font-medium" style={{ color: 'var(--color-alt)' }}>
              Privacy Policy
            </Link>
            <Link to="/" className="alt-small-button small-button-text" style={{ color: 'var(--color-text)' }}>
              ← Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-white)' }}>
        <motion.div
          className="max-w-5xl mx-auto px-6 py-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div
            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest mb-8 px-3 py-1.5 rounded-full border"
            style={{
              color: 'var(--color-brands)',
              borderColor: 'color-mix(in srgb, var(--color-brands) 30%, transparent)',
              backgroundColor: 'var(--color-brand-bg)',
            }}
          >
            Legal Document
          </div>

          <h1
            className="title mb-5"
            style={{ color: 'var(--color-black)', letterSpacing: '-2.5px' }}
          >
            Terms of Service
          </h1>

          <p className="bigalt mb-8" style={{ color: 'var(--color-alt)', maxWidth: 520, margin: '0 auto 2rem' }}>
            By using Contles you agree to these terms. Please read them carefully — they protect both you and us.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--color-alt)' }}>
            <span
              className="px-3 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
            >
              Effective: March 17, 2025
            </span>
            <span
              className="px-3 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
            >
              Governed by Lithuanian law
            </span>
            <span
              className="px-3 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
            >
              Ages 16+
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-16 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">

          {/* Sidebar TOC */}
          <motion.aside
            className="hidden lg:block sticky top-24"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-alt)' }}>
              Contents
            </p>
            <ul className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.number}>
                  <a
                    href={`#section-${s.number}`}
                    className="flex items-center gap-2 text-xs py-1 transition-colors hover:text-[var(--color-brands)]"
                    style={{ color: 'var(--color-alt)' }}
                  >
                    <span className="font-mono opacity-50">{s.number}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.aside>

          {/* Sections */}
          <div className="space-y-0">
            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.number}
                id={`section-${section.number}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.03 }}
                className="py-8 border-b"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <span
                    className="font-mono text-xs font-semibold shrink-0"
                    style={{ color: 'var(--color-brands)', opacity: 0.7 }}
                  >
                    {section.number}
                  </span>
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: 'var(--color-text)', letterSpacing: '-0.5px' }}
                  >
                    {section.title}
                  </h2>
                </div>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line pl-8"
                  style={{ color: 'var(--color-alt)', lineHeight: '1.75' }}
                >
                  {section.content}
                </p>
              </motion.div>
            ))}

            {/* CTA footer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                  Questions about these Terms?
                </p>
                <a
                  href="mailto:hello@contles.com"
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-brands)' }}
                >
                  hello@contles.com
                </a>
              </div>
              <div className="flex gap-3">
                <Link to="/privacy" className="alt-small-button small-button-text" style={{ color: 'var(--color-alt)', fontSize: 14 }}>
                  Privacy Policy
                </Link>
                <Link to="/" className="small-button small-button-text" style={{ color: '#fff', fontSize: 14 }}>
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Terms
