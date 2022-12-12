const express = require('express');
const Container = require('../../services/Container')

const container = new Container();
const router = express();

router
    .get('/', (req, res) => {
        const productos = container.getAll();
        res.send(productos)
    })

    .get('/:id', (req, res) => {
            const id = req.params.id;
            const productById = container.getById(parseInt(id));
            res.send(productById)
    })

    .post('/', (req, res) => {
        const obj = req.body;
        const newObj = container.save(obj)
        res.send(newObj)
    })
    .put('/:id', (req, res) => {
        const id = req.params.id;
        const obj = req.body;
        const updatedProduct = container.updateById(parseInt(id), obj);
        res.send(updatedProduct)})
    
    .delete('/:id', (req, res) => {
        const id = req.params.id;
        const deleteProduct = container.deleteById(parseInt(id));
        res.send(deleteProduct)}
    )


module.exports =  router;