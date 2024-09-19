import { useEffect } from 'react'

export function HomeComponent() {
  useEffect(() => {
    console.log('Connect qr Code')
  }, [])

  return <h1>Home</h1>
}
