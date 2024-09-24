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

    if (connection?.status !== WaConnectionStatus.CONNECTED) {
      socket?.emit('getInstance', user._id)
    }

    socket?.on('connectionWa', ({ connection }) => {
      console.log('connection', connection)
      setConnection(connection)
    })
  }

  useEffect(() => {
    if (socket) {
      getInstanceWa()
    }
  }, [socket])

  return {
    connection,
  }
}
