import makeWASocket, {
  DisconnectReason,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys'
import { Socket } from 'socket.io'
import qrcode, { QRCodeToDataURLOptions } from 'qrcode'
import { WaConnectionStatus } from '../../models/enums/WaConnectionStatus'
// import { removeCreds } from './removeCreds'
import pino from 'pino'
import { instances } from '../../shared/infra/http/server'

export class Baileys {
  async onConnect(socket: Socket, userId: string) {
    try {
      console.log('Inciando conexão com o WaSocket', userId)

      const { state, saveCreds } = await useMultiFileAuthState(
        `./src/creds/${userId}`,
      )

      const waSocket = makeWASocket({
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(
            state.keys,
            pino({ level: 'silent' } as any) as any,
          ),
        },
        printQRInTerminal: false,
      })

      instances.waSocket[userId] = waSocket

      waSocket.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update || {}

        if (qr) {
          console.log('Gerando qrcode')

          const optsQrcode: QRCodeToDataURLOptions = {
            scale: 4,
            errorCorrectionLevel: 'H',
            color: {
              light: '#ffffff',
              dark: '#000000',
            },
          }

          qrcode.toDataURL(qr, optsQrcode, (error, base64) => {
            if (error) {
              console.error(error)
              return
            }

            socket.emit('connectionWa', {
              success: true,
              connection: {
                qrcode: base64,
                status: WaConnectionStatus.PENDING,
              },
            })
          })

          // await removeCreds(userId)
        }

        if (connection === 'open') {
          console.log('Conectado com sucesso no Whatsapp')

          socket.emit('connectionWa', {
            success: true,
            connection: {
              status: WaConnectionStatus.CONNECTED,
              user: {
                name: waSocket?.user?.name || '--',
                phone: waSocket?.user?.id || '--',
              },
            },
          })
        }

        if (connection === 'close') {
          const loggedOut =
            (lastDisconnect?.error as any)?.output?.statusCode !==
            DisconnectReason.loggedOut

          if (loggedOut) {
            console.log('Reconectando')
            await this.onConnect(socket, userId)
            return
          }

          // await removeCreds(userId)

          console.log('Conexão encerrada')
        }
      })

      waSocket.ev.on('creds.update', saveCreds)
    } catch (err) {
      console.log('Erro no onConnect do Baileys - ', err.message)
    }
  }
}

export { instances }
