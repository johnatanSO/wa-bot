import { SocketContext } from '@/contexts/socketContext'
import { IConnection } from '@/models/interfaces/IConnection'
import { getLocalUser } from '@/utils/functions/storage/getLocalUser'
import { useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export function useConnectionWa() {
  const { setSocket } = useContext(SocketContext)
  const [connection, setConnection] = useState<IConnection | null>(null)

  async function getInstanceWa(clientSocket: Socket) {
    const user = await getLocalUser()

    if (!user) return

    clientSocket.emit('getInstance', user._id)
    clientSocket.on('connectionWa', ({ connection }) => {
      console.log('connection', connection)
      setConnection(connection)
    })
  }

  useEffect(() => {
    const clientSocket = io(process.env.NEXT_PUBLIC_END_POINT || '', {
      forceNew: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    })

    setSocket(clientSocket)
    getInstanceWa(clientSocket)

    return () => {
      clientSocket.off('connectionWa')
    }
  }, [])

  return {
    connection,
  }
}
