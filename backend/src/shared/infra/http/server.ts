import { app } from './app'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { Baileys } from '../../../subscribers/baileys/Baileys'

const PORT = process.env.SERVER_PORT

const httpServer = createServer(app)

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
    console.log('userId', userId)

    const baileys = new Baileys()

    baileys.onConnect(clientSocket, userId)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
