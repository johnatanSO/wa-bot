import { app } from './app'
import { Server } from 'socket.io'

const PORT = process.env.SERVER_PORT

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})

const io = new Server()

io.on('connection', (socket) => {
  console.log(`Socket conectado - ${socket.id}`)
})