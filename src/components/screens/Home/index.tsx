'use client'

import Image from 'next/image'
import style from './Home.module.scss'
import { useInstanceWa } from './hooks/useInstanceWa'

export function HomeComponent() {
  const { qrcodeUrl } = useInstanceWa()

  return (
    <div className={style.homeContainer}>
      <span>1</span>
      <Image src={qrcodeUrl || ''} alt="qrcode" />
    </div>
  )
}
