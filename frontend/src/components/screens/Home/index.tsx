'use client'

import Image from 'next/image'
import style from './Home.module.scss'
import { useInstanceWa } from './hooks/useInstanceWa'
import { WaConnectionStatus } from '@/models/enums/WaConnectionStatus'
import { formatConnectionStatus } from '@/utils/formatConnectionStatus'

export function HomeComponent() {
  const { connection } = useInstanceWa()

  return (
    <div className={style.homeContainer}>
      <div className={style.connectionContainer}>
        {connection?.status === WaConnectionStatus.PENDING && (
          <Image
            width={400}
            height={400}
            src={connection?.qrcode || ''}
            alt="qrcode"
            className={style.connectionQrCode}
          />
        )}

        <b className={style.connectionStatus}>
          {formatConnectionStatus(connection?.status || null)}
        </b>
      </div>
    </div>
  )
}
