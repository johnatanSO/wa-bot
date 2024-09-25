'use client'

import '@/styles/global.scss'
import { SocketContextComponent } from '@/contexts/socketContext'
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const clientSocket = io(process.env.NEXT_PUBLIC_END_POINT || '', {
      forceNew: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    })

    clientSocket.on('connect', () => {
      console.log('Conexão com o backend estabelecida com sucesso')
    })

    clientSocket.on('disconnect', () => {
      console.log('Conexão com o backend perdida')
    })

    setSocket(clientSocket)

    return () => {
      clientSocket.close()
    }
  }, [])

  return (
    <SocketContextComponent socket={socket} setSocket={setSocket}>
      {children}
    </SocketContextComponent>
  )
}
