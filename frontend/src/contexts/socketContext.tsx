'use client'

import { ReactNode, createContext } from 'react'
import { Socket } from 'socket.io-client'

interface SocketComponentProps {
  children: ReactNode
  socket: Socket | null
  setSocket: (socketInstance: Socket) => void
}

interface ISocketContext {
  socket: Socket | null
  setSocket: (socket: Socket) => void
}

export const SocketContext = createContext({} as ISocketContext)

export function SocketContextComponent({
  children,
  socket,
  setSocket,
}: SocketComponentProps) {
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  )
}
