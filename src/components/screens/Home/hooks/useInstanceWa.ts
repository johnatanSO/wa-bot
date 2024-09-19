import { AlertContext } from '@/contexts/alertContext'
import { AlertNotifyType } from '@/models/enums/AlertNotifyType'
import { WaConnectionStatus } from '@/models/enums/WaConnectionStatus'
import { IConnection } from '@/models/interfaces/IConnection'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { getInstanceWaService } from '@/services/instanceWa/getInstanceWa/GetInstanceWaService'

import { useContext, useEffect, useState } from 'react'

export function useInstanceWa() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [qrcodeUrl, setQrcodeUrl] = useState<string | null>(null)

  async function getInstanceWa() {
    getInstanceWaService(httpClientProvider)
      .then(({ data }) => {
        const { connection } = data.item

        switch (connection.status) {
          case WaConnectionStatus.CONNECTED: {
            onConnected(connection)
            break
          }
          case WaConnectionStatus.DISCONNECTED: {
            onDisconected(connection)
            break
          }
          case WaConnectionStatus.PENDING: {
            onPending(connection)
            break
          }
        }
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

  function onConnected(connection: IConnection) {
    console.log('Conectado')
  }

  function onDisconected(connection: IConnection) {
    console.log('Desconectado')
  }

  function onPending(connection: IConnection) {
    console.log('Conectar')
    setQrcodeUrl(connection.qrcode || null)
  }

  useEffect(() => {
    getInstanceWa()
  }, [])

  return {
    qrcodeUrl,
  }
}
