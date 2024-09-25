import { SocketContext } from '@/contexts/socketContext'
import { IConnection } from '@/models/interfaces/IConnection'
import { getLocalUser } from '@/utils/functions/storage/getLocalUser'
import { useContext, useEffect, useState } from 'react'

export function useConnectionWa() {
  const { socket } = useContext(SocketContext)

  const [connection, setConnection] = useState<IConnection | null>(null)

  async function getInstanceWa() {
    const user = await getLocalUser()

    if (!user) return

    socket?.emit('getInstance', user._id)

    socket?.on('connectionWa', ({ connection }) => {
      setConnection(connection)
      socket?.off('getInstance')
    })
  }

  useEffect(() => {
    console.log('Socket atualizou')

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
