import { AlertContext } from '@/contexts/alertContext'
import { AlertNotifyType } from '@/models/enums/AlertNotifyType'
import { IConnection } from '@/models/interfaces/IConnection'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { getInstanceWaService } from '@/services/instanceWa/getInstanceWa/GetInstanceWaService'

import { useContext, useEffect, useState } from 'react'

export function useInstanceWa() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [connection, setConnection] = useState<IConnection | null>(null)
  const [connectionStatusText, setConnectionStatusText] = useState<string>('')

  async function getInstanceWa() {
    getInstanceWaService(httpClientProvider)
      .then(({ data }) => {
        setConnection(data.item.connection)
        setConnectionStatusText(data.item.connection.status)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: AlertNotifyType.ERROR,
          open: true,
          text: `Erro ao tentar se conectar - ${err?.message}`,
        })
      })
  }

  useEffect(() => {
    getInstanceWa()
  }, [])

  return {
    connection,
    connectionStatusText,
  }
}
