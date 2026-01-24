import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <nav className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-2xl font-bold text-purple-600 hover:text-purple-800 transition-colors">
              Contles
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              Home
            </Link>
          </motion.div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-8">About Us</h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-lg text-gray-700"
          >
            <p>
              This is your second page. You can customize this content to tell your story,
              share your mission, or provide more information about your project.
            </p>
            <p>
              The page includes smooth animations powered by Framer Motion and is styled
              with Tailwind CSS for a modern, responsive design.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <Link
              to="/"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

export default About
