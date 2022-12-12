const Container = require("./clase");

const productos = new Container("./productos.txt");

async function ejecutar(){

    const objeto1 = {
        nombre: "microprocesador",
        precio: 10000,
        thumbnail: "url" 
    }

    const objeto2 = {
        nombre: "motherboard",
        precio: 30000,
        thumbnail: "url" 
    }

    const objeto3 = {
        nombre: "fuente",
        precio: 10000,
        thumbnail: "url" 
    }

    // await productos.save(objeto1)
    // await productos.save(objeto2)
    // await productos.save(objeto3)
    // await productos.getById(1).then(a => console.log(a))
    // await productos.deleteById(2)
    // await productos.getAll().then(a=>console.log(a))
    // await productos.deleteAll()
}

ejecutar()
