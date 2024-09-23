import makeWASocket, {
  DisconnectReason,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys'
import { Socket } from 'socket.io'
import qrcode, { QRCodeToDataURLOptions } from 'qrcode'
import { WaConnectionStatus } from '../../models/enums/WaConnectionStatus'
import { removeCreds } from './removeCreds'
import pino from 'pino'

export class Baileys {
  async onConnect(socket: Socket) {
    // Essa função salva os dados em arquivos .json na pasta /creds
    // Não é o melhor método, as credenciais deveriam ser salvar no banco de dados, esta implementação é temporária.
    const { state, saveCreds } = await useMultiFileAuthState(`./src/creds`)

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

        await removeCreds(socket.id)
      }

      if (connection === 'open') {
        console.log('Conectado com sucesso no Whatsapp')

        socket.emit('connectionWa', {
          success: true,
          connection: {
            status: WaConnectionStatus.CONNECTED,
            user: {
              name: waSocket.user.name,
              phone: waSocket.user.id.split(':'),
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

          await removeCreds(socket.id)

          await this.onConnect(socket)
          return
        }

        await removeCreds(socket.id)

        console.log('Conexão encerrada')
      }
    })

    waSocket.ev.on('creds.update', saveCreds)
  }
}
