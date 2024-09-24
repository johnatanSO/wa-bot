import type { Metadata } from 'next'
import '@/styles/global.scss'
import { AlertContextComponent } from '@/contexts/alertContext'

export const metadata: Metadata = {
  title: 'JChat',
  description: 'Realize a autenticação',
  icons: {
    icon: '../../../public/assets/icons/chat-bot-svg.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AlertContextComponent>{children}</AlertContextComponent>
      </body>
    </html>
  )
}
