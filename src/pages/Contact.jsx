import { useEffect } from 'react'

function Contact() {
  useEffect(() => {
    window.location.replace('https://join.contles.com')
  }, [])

  return null
}

export default Contact
