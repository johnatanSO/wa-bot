'use client'

import { io } from 'socket.io-client'

export const socket = io(process.env.NEXT_PUBLIC_END_POINT || '', {
  forceNew: true,
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
})
