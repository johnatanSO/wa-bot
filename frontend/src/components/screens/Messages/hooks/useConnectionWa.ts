import { SocketContext } from '@/contexts/socketContext'
import { WaConnectionStatus } from '@/models/enums/WaConnectionStatus'
import { IConnection } from '@/models/interfaces/IConnection'
import { getLocalUser } from '@/utils/functions/storage/getLocalUser'
import { useContext, useEffect, useState } from 'react'

export function useConnectionWa() {
  const { socket } = useContext(SocketContext)

  const [connection, setConnection] = useState<IConnection | null>(null)

  async function getInstanceWa() {
    const user = await getLocalUser()

    if (!user) return

    if (!connection) {
      socket?.emit('getInstance', user._id)
    }

    socket?.on('connectionWa', ({ connection }) => {
      setConnection(connection)
    })
  }

  useEffect(() => {
    if (socket) {
      getInstanceWa()
    }

    return () => {
      socket?.off('connectionWa')
    }
  }, [socket])

  return {
    connection,
  }
}
