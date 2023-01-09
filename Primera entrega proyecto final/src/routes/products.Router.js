const express = require('express');
const ContenedorArchivo = require('../contenedores/ContenedorArchivo');


const { Router } = express;
const productosRouter = new Router();

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
        descripcion: `ruta '${ruta}' metodo '${metodo}' no autorizado`
    }
  
    return error
}

const administrador = false

function soloAdmins(req, res, next) {
    if (!administrador) {
        res.json(crearErrorNoEsAdmin(req.originalUrl, req.method))
    } else {
        next()
    }
}

let contenedorProductos = new ContenedorArchivo('dataBase/productos.JSON');


productosRouter.get('/:id?', async (req, res) => {
    let result;
    
    if(req.params.id == undefined){
        result = await contenedorProductos.listarAll()
        res.json(result)
    } else {
        result = await contenedorProductos.listar(req.params.id)
        res.json(result)
    }
}) 

productosRouter.post('/',soloAdmins, async (req, res) =>{
    let result = await contenedorProductos.guardar(req.body)
    res.json({id:result})
})

productosRouter.put('/:id',soloAdmins, async (req, res) =>{
    contenedorProductos.actualizar(req.body, req.params.id)
})

productosRouter.delete('/:id',soloAdmins, async (req, res) =>{
    res.json(contenedorProductos.borrar(req.params.id))
})

module.exports = productosRouter