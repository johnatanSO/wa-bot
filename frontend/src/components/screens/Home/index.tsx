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
            width={350}
            height={350}
            src={connection.qrcode || ''}
            alt="qrcode"
          />
        )}

        <p>{formatConnectionStatus(connection?.status || null)}</p>
      </div>
    </div>
  )
}
