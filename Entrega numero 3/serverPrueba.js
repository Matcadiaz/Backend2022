const express = require('express');
const moment = require('moment/moment');
const classContainer = require('./container/clase')


const app = express();

const PORT = 8070;

const frase = 'Hola mundo cómo están'

app.get('/api/frase', (req, res) => {
    res.send(JSON.stringify(frase))

})


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))