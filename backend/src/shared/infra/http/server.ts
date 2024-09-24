import { app } from './app'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { Baileys } from '../../../subscribers/baileys/Baileys'
import { WASocket } from '@whiskeysockets/baileys'
import { AppError } from '../../errors/AppError'

const PORT = process.env.SERVER_PORT

const httpServer = createServer(app)
const baileys = new Baileys()

interface IInstances {
  waSocket: {
    [userId: string]: WASocket
  }
}

const instances: IInstances = {
  waSocket: {},
}

const io = new Server(httpServer, {
  pingInterval: 5000,
  pingTimeout: 3600000,
  transports: ['websocket', 'polling'],
})

io.on('connection', (clientSocket) => {
  console.log(`Socket conectado - ${clientSocket.id}`)

  clientSocket.on('disconnect', () => {
    console.log('Socket desconectado')
  })

  clientSocket.on('getInstance', (userId) => {
    if (!userId) {
      throw new AppError('userId não enviado no emit socket (getInstance)')
    }

    baileys.onConnect(clientSocket, userId)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})

export { instances }
