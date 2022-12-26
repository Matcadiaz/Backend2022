const express = require('express')
const app = require('express')();
const http = require('http').Server(app)
const io = require('socket.io')(http)

const port = 3000

app.use(express.static('public'))

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

const messages = [
    { author: "Juan", text: "Hola, que tal?"},
    { author: "Pedro", text: "Muy bien, Y vos?"},
    { author: "Ana", text: "Genial"}
]

io.on('connection', socket => {
    console.log("usuario conectado" + socket.id);
    socket.emit('messages', messages);

    socket.on('new-message', data =>{
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
})

const server = http.listen(port, ()=>{
    console.log(`Escuchando app en el puerto ${server.address().port}`);
})
