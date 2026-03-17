import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: '1. Introduction',
    content: `This Privacy Policy explains how Contles ("we," "our," "us") collects, uses, stores, and protects your personal data when you use our platform, website, and services (collectively, the "Service").

We are committed to protecting your privacy and handling your data in an open and transparent manner. By using Contles, you acknowledge that you have read and understood this Privacy Policy.`,
  },
  {
    title: '2. Who We Are',
    content: `Contles is a platform that connects brands and creators for collaboration, campaign management, and payments. We act as both a data controller and, in certain situations, a data processor.

If you have any questions about this Privacy Policy, please contact us at hello@contles.com.`,
  },
  {
    title: '3. Information We Collect',
    content: `We collect the following categories of personal data:

Account Information
• Full name, username, and profile picture
• Email address and phone number
• Date of birth (to verify age eligibility)

Professional / Creator Data
• Social media handles and platform links
• Audience demographics and engagement metrics
• Portfolio content and work samples

Financial Data
• Payment method details (processed by third-party processors — we do not store full card numbers)
• Transaction history and invoicing details
• Tax identification numbers where required by law

Usage & Technical Data
• IP address, browser type, and device information
• Pages visited, features used, and time spent on the platform
• Cookies and similar tracking technologies (see Section 10)

Communications
• Messages exchanged through the platform
• Support tickets and correspondence with our team`,
  },
  {
    title: '4. How We Use Your Information',
    content: `We use your personal data for the following purposes:

• Providing and improving the Service — to operate, maintain, and enhance the platform
• Account management — to create, manage, and secure your account
• Facilitating transactions — to process payments between brands and creators
• Communications — to send you important updates, notifications, and marketing (where you have opted in)
• Safety and security — to detect and prevent fraud, abuse, and other harmful activity
• Legal compliance — to meet our legal and regulatory obligations
• Analytics — to understand how users interact with the platform and improve our offerings`,
  },
  {
    title: '5. Legal Basis for Processing (GDPR)',
    content: `If you are in the European Economic Area (EEA), we process your personal data based on the following legal grounds:

Consent — where you have given us explicit permission (e.g., marketing emails). You can withdraw consent at any time.

Contract Performance — processing necessary to provide the Service to you, including account setup, payments, and collaboration tools.

Legal Obligations — processing required to comply with applicable laws, such as tax and financial regulations.

Legitimate Interests — processing for fraud prevention, platform security, and product improvement, where those interests are not overridden by your rights.`,
  },
  {
    title: '6. Data Sharing',
    content: `We do not sell your personal data. We may share your data with:

Service Providers — third-party vendors who help us operate the platform (e.g., payment processors, cloud hosting, analytics tools). They are contractually bound to protect your data.

Other Users — information you include in your public profile (e.g., creator bio, portfolio) is visible to other users of the platform.

Legal Authorities — when required by law, court order, or government request, or to protect the rights, property, or safety of Contles or others.

Business Transfers — in the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.

All third parties we work with are required to implement appropriate data protection measures.`,
  },
  {
    title: '7. Data Retention',
    content: `We retain your personal data only for as long as necessary to fulfill the purposes described in this Policy, or as required by law.

• Active accounts: Data is retained for the duration of your account
• Closed accounts: Core data is retained for up to 5 years for legal and tax compliance
• Transaction records: Retained for a minimum of 7 years as required by financial regulations
• Support communications: Retained for 3 years

When data is no longer needed, we securely delete or anonymize it.`,
  },
  {
    title: '8. Your Rights',
    content: `Under the GDPR and other applicable privacy laws, you have the following rights:

Right to Access — request a copy of the personal data we hold about you.

Right to Rectification — request correction of inaccurate or incomplete data.

Right to Erasure ("Right to be Forgotten") — request deletion of your personal data, subject to legal retention obligations.

Right to Restrict Processing — request that we limit how we use your data in certain circumstances.

Right to Data Portability — receive your data in a structured, machine-readable format.

Right to Object — object to processing based on legitimate interests or for direct marketing purposes.

Right to Withdraw Consent — where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.

To exercise any of these rights, contact us at hello@contles.com. We will respond within 30 days.`,
  },
  {
    title: '9. Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, alteration, or disclosure. These include:

• Encryption of data in transit (TLS/HTTPS) and at rest
• Access controls and role-based permissions
• Regular security audits and vulnerability assessments
• Incident response procedures

Despite our efforts, no system is 100% secure. If you suspect unauthorized access to your account, please contact us immediately at hello@contles.com.`,
  },
  {
    title: '10. Cookies',
    content: `We use cookies and similar technologies to enhance your experience on Contles. These include:

Essential Cookies — required for the platform to function (e.g., authentication, session management).

Analytics Cookies — help us understand how users interact with the platform (e.g., Google Analytics).

Preference Cookies — remember your settings and preferences.

You can manage cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.`,
  },
  {
    title: '11. International Data Transfers',
    content: `Contles is based in Lithuania (EU). Your data may be processed by our service providers in countries outside the European Economic Area. In such cases, we ensure that appropriate safeguards are in place, such as:

• Standard Contractual Clauses (SCCs) approved by the European Commission
• Transfers to countries with an EU adequacy decision

We do not transfer your data to countries without adequate protection unless the appropriate safeguards are in place.`,
  },
  {
    title: '12. Children\'s Privacy',
    content: `The Service is intended for users who are at least 16 years old. We do not knowingly collect personal data from children under 16.

If we become aware that we have collected data from a child under 16 without verified parental consent, we will take steps to delete that information promptly. If you believe this has occurred, please contact us at hello@contles.com.`,
  },
  {
    title: '13. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or platform features. When we make significant changes, we will notify you via email or a prominent notice within the platform.

The effective date at the top of this page reflects when this Policy was last updated. We encourage you to review this Policy periodically.`,
  },
  {
    title: '14. Contact Us',
    content: `If you have questions, concerns, or requests relating to this Privacy Policy or our data practices, please contact us:

Email: hello@contles.com

We aim to respond to all privacy-related inquiries within 5 business days. If you believe we have not adequately addressed your concern, you have the right to lodge a complaint with your local data protection authority.`,
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

function Privacy() {
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
              to="/terms"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--color-alt)' }}
            >
              Terms of Service
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
            Privacy Policy
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
            Your privacy matters to us. This policy explains exactly what data we collect, why we collect it, and how we protect it. We comply with the General Data Protection Regulation (GDPR) and other applicable privacy laws.
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
              to="/terms"
              className="font-medium transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-alt)' }}
            >
              Terms of Service
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

export default Privacy
