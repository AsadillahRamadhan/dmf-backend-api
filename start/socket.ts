import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

// Buat instance server Socket.IO baru
const io = new Server(server.getNodeServer(), {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log(`🔌 Klien terhubung: ${socket.id}`)

  socket.on('chat:message', (data) => {
    console.log('Pesan diterima:', data)
    socket.broadcast.emit('chat:new-message', data)
  })

  // Event listener saat klien terputus
  socket.on('disconnect', () => {
    console.log(`🔌 Klien terputus: ${socket.id}`)
  })
})

export default io