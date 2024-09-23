'use client'

import Image from 'next/image'
import style from './Connection.module.scss'
import { useConnectionWa } from './hooks/useConnectionWa'
import { WaConnectionStatus } from '@/models/enums/WaConnectionStatus'
import { formatConnectionStatus } from '@/utils/formatConnectionStatus'
import { Loading } from '@/components/_ui/Loading'

export function ConnectionComponent() {
  const { connection } = useConnectionWa()

  return (
    <div className={style.homeContainer}>
      {!connection ? (
        <Loading size={25} color="#ffffff7d" />
      ) : (
        <div className={style.connectionContainer}>
          {connection?.status === WaConnectionStatus.PENDING && (
            <>
              <h2>Leia o QR Code</h2>

              <Image
                width={400}
                height={400}
                src={connection?.qrcode || ''}
                alt="qrcode"
                className={style.connectionQrCode}
              />
            </>
          )}

          {connection?.status === WaConnectionStatus.CONNECTED && (
            <div className={style.connectionUser}>
              <h3>{connection?.user?.name}</h3>
              <h4>{connection?.user?.phone}</h4>
            </div>
          )}

          <b
            className={`${style.connectionStatus} ${style[connection?.status || '']}`}
          >
            {formatConnectionStatus(connection?.status || null)}
          </b>
        </div>
      )}
    </div>
  )
}
