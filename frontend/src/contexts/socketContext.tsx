'use client'

import { ReactNode, createContext, useState } from 'react'
import { Socket } from 'socket.io-client'

interface SocketComponentProps {
  children: ReactNode
}

interface ISocketContext {
  socket: Socket | null
  setSocket: (socket: Socket) => void
}

export const SocketContext = createContext({} as ISocketContext)

export function SocketContextComponent({ children }: SocketComponentProps) {
  const [socket, setSocket] = useState<Socket | null>(null)

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  )
}
