const express = require('express');
const moment = require('moment/moment');
const classContainer = require('./container/clase')


const app = express();

const PORT = 8080;

const data = new classContainer('./productos/productos.txt')

app.get("/productos", async (req, res)=> {//agrego el async para informarle al get que trabajo con funciones asincronas
    const products = await data.getAll()
    res.send(products)
})

app.get("/random", async (req, res)=>{
    const products = await data.getAll()
    const random = parseInt(Math.random()* products.length)
    res.send(products[random]);
})


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))