'use client'

import { socket } from '@/socket'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface SocketComponentProps {
  children: ReactNode
}

export const SocketContext = createContext({})

export function SocketComponent({ children }: SocketComponentProps) {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [transport, setTransport] = useState<string>('N/A')

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name)
      })

      socket.emit('getInstance', 'user_id')
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport('N/A')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <SocketContext.Provider value={{ isConnected, transport }}>
      {children}
    </SocketContext.Provider>
  )
}
