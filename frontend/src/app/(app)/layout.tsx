import type { Metadata } from 'next'
import '@/styles/global.scss'
import { Header } from '@/components/layout/Header'
import { AlertContextComponent } from '@/contexts/alertContext'
import { SocketContextComponent } from '@/contexts/socketContext'

export const metadata: Metadata = {
  title: 'JChat',
  description:
    'Chat Bot com funcionalidade de envio de mensagens em massa através do whatsapp.',
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
        <SocketContextComponent>
          <AlertContextComponent>
            <Header />

            {children}
          </AlertContextComponent>
        </SocketContextComponent>
      </body>
    </html>
  )
}
