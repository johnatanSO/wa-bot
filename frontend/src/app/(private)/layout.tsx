import type { Metadata } from 'next'
import '@/styles/global.scss'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Whatsapp Bot',
  description: 'Whatsapp Bot Messages',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />

        {children}
      </body>
    </html>
  )
}
