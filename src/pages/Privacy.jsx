import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    number: '01',
    title: 'Introduction',
    content: `This Privacy Policy explains how Contles ("we," "our," "us") collects, uses, stores, and protects your personal data when you use our platform, website, and services (collectively, the "Service").

We are committed to protecting your privacy and handling your data in an open and transparent manner. By using Contles, you acknowledge that you have read and understood this Privacy Policy.`,
  },
  {
    number: '02',
    title: 'Who We Are',
    content: `Contles is a platform that connects brands and creators for collaboration, campaign management, and payments. We are based in Lithuania and act as both a data controller and, in certain situations, a data processor.

If you have any questions about this Privacy Policy, please contact us at hello@contles.com.`,
  },
  {
    number: '03',
    title: 'Information We Collect',
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
• Cookies and similar tracking technologies

Communications
• Messages exchanged through the platform
• Support tickets and correspondence with our team`,
  },
  {
    number: '04',
    title: 'How We Use Your Information',
    content: `We use your personal data for the following purposes:

• Providing and improving the Service — to operate, maintain, and enhance the platform
• Account management — to create, manage, and secure your account
• Facilitating transactions — to process payments between brands and creators
• Communications — to send you important updates and notifications
• Safety and security — to detect and prevent fraud, abuse, and other harmful activity
• Legal compliance — to meet our legal and regulatory obligations
• Analytics — to understand how users interact with the platform and improve our offerings`,
  },
  {
    number: '05',
    title: 'Legal Basis for Processing (GDPR)',
    content: `If you are in the European Economic Area (EEA), we process your personal data based on the following legal grounds:

Consent — where you have given us explicit permission (e.g., marketing emails). You can withdraw consent at any time.

Contract Performance — processing necessary to provide the Service to you, including account setup, payments, and collaboration tools.

Legal Obligations — processing required to comply with applicable laws, such as tax and financial regulations.

Legitimate Interests — processing for fraud prevention, platform security, and product improvement, where those interests are not overridden by your rights.`,
  },
  {
    number: '06',
    title: 'Data Sharing',
    content: `We do not sell your personal data. We may share your data with:

Service Providers — third-party vendors who help us operate the platform (e.g., payment processors, cloud hosting, analytics tools). They are contractually bound to protect your data.

Other Users — information you include in your public profile (e.g., creator bio, portfolio) is visible to other platform users.

Legal Authorities — when required by law, court order, or government request, or to protect the rights, property, or safety of Contles or others.

Business Transfers — in the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.`,
  },
  {
    number: '07',
    title: 'Data Retention',
    content: `We retain your personal data only for as long as necessary to fulfill the purposes described in this Policy, or as required by law:

• Active accounts: Data is retained for the duration of your account
• Closed accounts: Core data is retained for up to 5 years for legal and tax compliance
• Transaction records: Retained for a minimum of 7 years as required by financial regulations
• Support communications: Retained for 3 years

When data is no longer needed, we securely delete or anonymize it.`,
  },
  {
    number: '08',
    title: 'Your Rights',
    content: `Under the GDPR and other applicable privacy laws, you have the following rights:

Right to Access — request a copy of the personal data we hold about you.

Right to Rectification — request correction of inaccurate or incomplete data.

Right to Erasure — request deletion of your personal data, subject to legal retention obligations.

Right to Restrict Processing — request that we limit how we use your data in certain circumstances.

Right to Data Portability — receive your data in a structured, machine-readable format.

Right to Object — object to processing based on legitimate interests or for direct marketing purposes.

Right to Withdraw Consent — where processing is based on consent, you may withdraw it at any time.

To exercise any of these rights, contact us at hello@contles.com. We will respond within 30 days.`,
  },
  {
    number: '09',
    title: 'Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, alteration, or disclosure. These include:

• Encryption of data in transit (TLS/HTTPS) and at rest
• Access controls and role-based permissions
• Regular security audits and vulnerability assessments
• Incident response procedures

Despite our efforts, no system is 100% secure. If you suspect unauthorized access to your account, please contact us immediately at hello@contles.com.`,
  },
  {
    number: '10',
    title: 'Cookies',
    content: `We use cookies and similar technologies to enhance your experience on Contles. These include:

Essential Cookies — required for the platform to function (e.g., authentication, session management).

Analytics Cookies — help us understand how users interact with the platform (e.g., Google Analytics).

Preference Cookies — remember your settings and preferences.

You can manage cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.`,
  },
  {
    number: '11',
    title: 'International Data Transfers',
    content: `Contles is based in Lithuania (EU). Your data may be processed by our service providers in countries outside the European Economic Area. In such cases, we ensure appropriate safeguards are in place, such as:

• Standard Contractual Clauses (SCCs) approved by the European Commission
• Transfers only to countries with an EU adequacy decision

We do not transfer your data to countries without adequate protection unless appropriate safeguards are in place.`,
  },
  {
    number: '12',
    title: "Children's Privacy",
    content: `The Service is intended for users who are at least 16 years old. We do not knowingly collect personal data from children under 16.

If we become aware that we have collected data from a child under 16 without verified parental consent, we will take steps to delete that information promptly. If you believe this has occurred, please contact us at hello@contles.com.`,
  },
  {
    number: '13',
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or platform features. When we make significant changes, we will notify you via email or a prominent notice within the platform.

The effective date at the top of this page reflects when this Policy was last updated.`,
  },
  {
    number: '14',
    title: 'Contact Us',
    content: `If you have questions, concerns, or requests relating to this Privacy Policy or our data practices, please contact us:

Email: hello@contles.com

We aim to respond to all privacy-related inquiries within 5 business days. If you believe we have not adequately addressed your concern, you have the right to lodge a complaint with your local data protection authority.`,
  },
]

function Privacy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <img src="/branding/logo.svg" alt="Contles" className="h-[26px] w-auto" />
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="text-sm font-medium" style={{ color: 'var(--color-alt)' }}>
              Terms of Service
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
            Privacy Policy
          </h1>

          <p className="bigalt mb-8" style={{ color: 'var(--color-alt)', maxWidth: 520, margin: '0 auto 2rem' }}>
            We take your privacy seriously. Here's exactly what data we collect, why we collect it, and how we keep it safe.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs" style={{ color: 'var(--color-alt)' }}>
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
              GDPR Compliant
            </span>
            <span
              className="px-3 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
            >
              Lithuania, EU
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
                  Questions about your privacy?
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
                <Link to="/terms" className="alt-small-button small-button-text" style={{ color: 'var(--color-alt)', fontSize: 14 }}>
                  Terms of Service
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

export default Privacy
