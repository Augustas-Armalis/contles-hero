import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: '1. Introduction',
    content: `Welcome to Contles ("we," "our," "us"). These Terms of Service ("Terms") govern your access to and use of our platform, including our website, applications, and services (collectively, the "Service").

By accessing or using Contles, you agree to be bound by these Terms. If you do not agree, please do not use the Service.`,
  },
  {
    title: '2. Eligibility',
    content: `You must be at least 16 years old to use our Service. By using Contles, you represent and warrant that you meet this age requirement and that you have the legal capacity to enter into these Terms.

If you are using Contles on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.`,
  },
  {
    title: '3. Description of Service',
    content: `Contles is a platform that connects brands and creators for collaboration, campaign management, and payments. Through Contles, brands can discover and work with creators, manage campaigns, and process payments — all in one place.

We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.`,
  },
  {
    title: '4. User Accounts',
    content: `To access certain features, you must create an account. You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized use

You may not share your account with others or create multiple accounts for the same person or entity.`,
  },
  {
    title: '5. User Responsibilities',
    content: `By using Contles, you agree not to:

• Violate any applicable laws or regulations
• Engage in fraudulent, deceptive, or manipulative activity
• Misrepresent your identity, affiliations, or follower/audience metrics
• Use the platform for unauthorized advertising, spam, or unsolicited communications
• Attempt to reverse-engineer, scrape, or exploit the platform
• Post or transmit harmful, offensive, or illegal content
• Interfere with the integrity or performance of the Service`,
  },
  {
    title: '6. Payments and Fees',
    content: `Contles facilitates payments between brands and creators. Key points:

• We may charge service fees, which will be clearly disclosed before any transaction
• All fees are non-refundable unless explicitly stated otherwise
• You are responsible for any applicable taxes related to your use of the Service
• We use third-party payment processors and are not liable for their errors or failures

We are not responsible for disputes between users regarding deliverables unless explicitly stated in a written agreement with Contles.`,
  },
  {
    title: '7. Intellectual Property',
    content: `Users retain ownership of all content they create and upload to the platform. By submitting content, you grant Contles a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute your content solely for the purpose of operating and promoting the platform.

The Contles name, logo, and all associated branding are the exclusive property of Contles. You may not use them without our prior written consent.`,
  },
  {
    title: '8. Creator and Brand Relationships',
    content: `Contles acts as a marketplace facilitator. We are not a party to any agreement between brands and creators unless explicitly stated. Users are solely responsible for:

• Negotiating and fulfilling their agreements
• Ensuring their content complies with advertising standards and regulations (e.g., disclosing paid partnerships)
• Resolving disputes between themselves

We encourage users to clearly define deliverables, timelines, and payment terms before beginning any collaboration.`,
  },
  {
    title: '9. Termination',
    content: `We may suspend or terminate your account at any time, with or without notice, for:

• Violations of these Terms
• Fraudulent or harmful behavior
• Extended periods of inactivity
• Legal or regulatory requirements

Upon termination, your right to access the Service ceases immediately. Sections that by their nature should survive termination will continue to apply.`,
  },
  {
    title: '10. Disclaimer of Warranties',
    content: `The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. Contles does not warrant that:

• The Service will be uninterrupted or error-free
• Results obtained through the Service will be accurate or reliable
• Any defects will be corrected

Your use of the Service is entirely at your own risk.`,
  },
  {
    title: '11. Limitation of Liability',
    content: `To the maximum extent permitted by applicable law, Contles and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service.

Our total liability to you for any claims arising from these Terms shall not exceed the fees you paid to Contles in the three months preceding the claim.`,
  },
  {
    title: '12. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of the Republic of Lithuania, without regard to conflict of law principles.

Any disputes arising from these Terms shall be submitted to the exclusive jurisdiction of the courts of Vilnius, Lithuania.`,
  },
  {
    title: '13. Changes to Terms',
    content: `We may update these Terms from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. When we make material changes, we will notify you via email or a prominent notice on the platform.

Continued use of the Service after any changes constitutes your acceptance of the updated Terms. If you disagree with the new Terms, you must stop using the Service.`,
  },
  {
    title: '14. Contact',
    content: `If you have questions or concerns about these Terms, please reach out to us:

Email: hello@contles.com

We aim to respond to all inquiries within 5 business days.`,
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

function Terms() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/branding/logo.svg" alt="Contles" className="h-[28px] w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--color-alt)' }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="text-sm font-semibold transition-colors"
              style={{ color: 'var(--color-brands)' }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 pb-24">
        {/* Header */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-6 px-3 py-1.5 rounded-full border"
            style={{
              color: 'var(--color-brands)',
              borderColor: 'var(--color-brands)',
              backgroundColor: 'color-mix(in srgb, var(--color-brands) 8%, transparent)',
            }}
          >
            Legal
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
            style={{ color: 'var(--color-black, #0a0a0a)' }}
          >
            Terms of Service
          </h1>
          <p className="text-base" style={{ color: 'var(--color-alt)' }}>
            Effective Date: March 17, 2025 &nbsp;·&nbsp; Last updated: March 17, 2025
          </p>
        </motion.div>

        {/* Intro card */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 mb-10 border"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-brands) 6%, transparent)',
            borderColor: 'color-mix(in srgb, var(--color-brands) 20%, transparent)',
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-alt)' }}>
            Please read these Terms carefully before using Contles. They explain your rights and responsibilities when using our platform. By creating an account or using any part of our Service, you agree to these Terms.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-1">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.title}
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.05 * i }}
              className="rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: 'var(--color-white)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="px-7 py-6">
                <h2
                  className="text-base font-semibold mb-3"
                  style={{ color: 'var(--color-black, #0a0a0a)' }}
                >
                  {section.title}
                </h2>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: 'var(--color-alt)' }}
                >
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-alt)' }}>
            Questions? Email us at{' '}
            <a
              href="mailto:hello@contles.com"
              className="font-medium underline underline-offset-2"
              style={{ color: 'var(--color-brands)' }}
            >
              hello@contles.com
            </a>
          </p>
          <div className="flex gap-4 text-sm">
            <Link
              to="/privacy"
              className="font-medium transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-alt)' }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="font-semibold transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-brands)' }}
            >
              Back to Home →
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Terms
