import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  WASocket,
} from '@whiskeysockets/baileys'
import { Socket } from 'socket.io'
import qrcode, { QRCodeToDataURLOptions } from 'qrcode'
import { WaConnectionStatus } from '../../models/enums/WaConnectionStatus'
import { instances } from '../../shared/infra/http/server'
import { removeCreds } from './removeCreds'

// TODO: Separar essas funções em arquivos únicos
async function onConnectWa(socket: Socket, userId: string) {
  console.log('Rodando o onConnectWa - ', {
    userId,
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

      if (qr) await onGenerateQrCode({ qr, socket, userId })

      if (connection === 'open') await onSuccessConection({ socket, waSocket })

      if (connection === 'close') {
        console.log('Verificação de connection === close')
        console.log('lastDisconnect', lastDisconnect)
        const loggedOut =
          (lastDisconnect?.error as any)?.output?.statusCode !==
          DisconnectReason.loggedOut

        if (loggedOut) {
          console.log('Caiu dentro do loggedOut - Reconectando')
          await onConnectWa(socket, userId)
          console.log('Fez a recursividade da função')
          return
        }

        await onCloseConnection({ socket, userId })
      }
    })

    waSocket.ev.on('creds.update', saveCreds)

    instances.waSocket[userId] = waSocket
    console.log(`Instance WaSocket (${userId}): ${instances.waSocket[userId]}`)
  } catch (err) {
    console.log('Erro no onConnect do Baileys - ', err.message)
  }
}

async function onGenerateQrCode({
  userId,
  socket,
  qr,
}: {
  userId: string
  socket: Socket
  qr: string
}) {
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

  await removeCreds(userId)
}

async function onSuccessConection({
  waSocket,
  socket,
}: {
  waSocket: WASocket
  socket: Socket
}) {
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

async function onCloseConnection({
  socket,
  userId,
}: {
  socket: Socket
  userId: string
}) {
  await removeCreds(userId)

  socket.emit('connectionWa', {
    success: true,
    connection: {
      status: WaConnectionStatus.DISCONNECTED,
    },
  })

  console.log('Conexão encerrada')
}

export { onConnectWa }
