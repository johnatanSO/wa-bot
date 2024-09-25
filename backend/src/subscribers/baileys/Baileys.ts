import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys'
import { Socket } from 'socket.io'
import qrcode, { QRCodeToDataURLOptions } from 'qrcode'
import { WaConnectionStatus } from '../../models/enums/WaConnectionStatus'
import { instances } from '../../shared/infra/http/server'

async function onConnectWa(socket: Socket, userId: string) {
  console.log('Rodando o onConnectWa - ', {
    userId,
    socket,
  })

  try {
    const { state, saveCreds } = await useMultiFileAuthState(
      `./src/creds/${userId}`,
    )

    const waSocket = makeWASocket({
      auth: state,
      printQRInTerminal: false,
    })

    waSocket.ev.on('connection.update', async (update) => {
      console.log('Rodando o connection.update')
      const { connection, lastDisconnect, qr } = update || {}

      if (qr) {
        console.log('Verificação se tem o qr')

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

          console.log('Fazendo emit do QR Code')
          socket.emit('connectionWa', {
            success: true,
            connection: {
              qrcode: base64,
              status: WaConnectionStatus.PENDING,
            },
          })
          console.log('Já fez o emit do QR Code')
        })

        // await removeCreds(userId)
      }

      if (connection === 'open') {
        console.log('Verificação do connection ===  open')

        console.log('Fazendo o emit de conectado com sucesso')
        socket.emit('connectionWa', {
          success: true,
          connection: {
            status: WaConnectionStatus.CONNECTED,
            user: {
              name: waSocket?.user?.name,
              phone: waSocket?.user?.id?.split(':'),
            },
          },
        })
        console.log('Já fez o emit de conectado com sucesso')
      }

      if (connection === 'close') {
        console.log('Verificação de connection === close')
        const loggedOut =
          (lastDisconnect?.error as any)?.output?.statusCode !==
          DisconnectReason.loggedOut

        if (loggedOut) {
          console.log('Caiu dentro do loggedOut - Reconectando')
          await onConnectWa(socket, userId)
          console.log('Fez a recursividade da função')
          return
        }

        // await removeCreds(userId)

        console.log('Conexão encerrada')
      }
    })

    waSocket.ev.on('creds.update', saveCreds)

    instances.waSocket[userId] = waSocket
    console.log(`Instance WaSocket (${userId}): ${instances.waSocket[userId]}`)
  } catch (err) {
    console.log('Erro no onConnect do Baileys - ', err.message)
  }
}

export { onConnectWa }
