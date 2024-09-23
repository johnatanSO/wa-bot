import { IConnection } from '@/models/interfaces/IConnection'
import { socket } from '@/socket'
import { useEffect, useState } from 'react'

export function useConnectionWa() {
  const [connection, setConnection] = useState<IConnection | null>(null)

  useEffect(() => {
    function onSetConnection({ connection }: { connection: IConnection }) {
      setConnection(connection)
    }

    socket.on('connectionWa', onSetConnection)

    return () => {
      socket.off('connectionWa', onSetConnection)
    }
  }, [])

  return {
    connection,
  }
}
