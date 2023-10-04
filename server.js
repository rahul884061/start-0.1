const express = require('express')
const { Socket } = require('socket.io')
const app = express()
const http = require('http').createServer(app)



const PORT = process.env.PORT || 8080

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// socket

const io = require('socket.io')(http)

const users = {};

io.on('connection', (socket) => {


    socket.on('new-user-joined', name => {
        console.log("NEW USER: ", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
      });



    socket.on('message', (msg) => {
        console.log(msg)
        socket.broadcast.emit('message', msg)
    })
})