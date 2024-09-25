import { app } from './app'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { WASocket } from '@whiskeysockets/baileys'
import { AppError } from '../../errors/AppError'
import { onConnectWa } from '../../../subscribers/baileys/onConnectWa'

const PORT = process.env.SERVER_PORT

const httpServer = createServer(app)

interface IInstances {
  waSocket: {
    [userId: string]: WASocket
  }
}

const instances: IInstances = {
  waSocket: {},
}

const io = new Server(httpServer)

io.on('connection', (clientSocket) => {
  console.log(`Socket conectado - ${clientSocket.id}`)

  clientSocket.on('disconnect', () => {
    console.log(`Socket desconectado - ${clientSocket.id}`)
  })

  clientSocket.on('getInstance', async (userId) => {
    console.log(
      '\n\n\n\n FAZENDO A BUSCA DA INSTÂNCIA DO WHATSAPP CONNECTION \n\n\n\n\n',
    )
    if (!userId) {
      throw new AppError('userId não enviado no emit socket (getInstance)')
    }

    onConnectWa(clientSocket, userId)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})

export { instances }
