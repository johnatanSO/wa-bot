import type { Metadata } from 'next'
import '@/styles/global.scss'
import { Header } from '@/components/layout/Header'
import { AlertContextComponent } from '@/contexts/alertContext'

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
        <AlertContextComponent>
          <Header />

          {children}
        </AlertContextComponent>
      </body>
    </html>
  )
}
