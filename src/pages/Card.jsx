import { useEffect } from 'react'

function Card() {
  useEffect(() => {
    window.location.replace('https://contles.com')
  }, [])

  return null
}

export default Card
