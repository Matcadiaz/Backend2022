const express = require('express');
const Carritos = require('../contenedores/Carritos');

const { Router } = express;
const carritoRouter = new Router();

let contenedorCarrito = new Carritos('dataBase/carritos.JSON', 'dataBase/productos.JSON');

carritoRouter.get('/', async (req, res) => {
    let result = await contenedorCarrito.mostrarCarrito()
    res.json(result)
})

carritoRouter.get('/:id/productos', async (req, res) => {
    let result = await contenedorCarrito.listarProductosCarrito(req.params.id)
    res.json(result)
}) 

carritoRouter.post('/', async (req, res) =>{
    let result = await contenedorCarrito.crearCarrito(req.body)
    res.json({id:result})
})

carritoRouter.post('/:id/productos', (req, res) => {
   res.json(null) 
   contenedorCarrito.agregarProducto( req.params.id, req.body.id)
   
})

carritoRouter.delete('/:id', async (req, res) =>{
    res.json(contenedorCarrito.eliminarCarrito(req.params.id))
})

carritoRouter.delete('/:id/productos/:id_prod', async (req, res)=>{
    res.json(contenedorCarrito.eliminarProductoDelCarrito(req.params.id, req.params.id_prod))
})

module.exports = carritoRouter