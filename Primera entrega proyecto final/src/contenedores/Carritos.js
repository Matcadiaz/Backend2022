const ContenedorArchivo = require("./ContenedorArchivo");

class Carritos{

    constructor(rutaCarrito, rutaProducto){
        this.contenedorCarrito = new ContenedorArchivo(rutaCarrito);
        this.contenedorProducto = new ContenedorArchivo(rutaProducto) 
    }

    crearCarrito() {
        let carrito = {
            productos: [] 
        }
        return this.contenedorCarrito.guardar(carrito);
    }

    mostrarCarrito(){
        return this.contenedorCarrito.listarAll();
    }
    eliminarCarrito(id) {
        this.contenedorCarrito.borrar(id);
    }

    listarProductosCarrito(id) {
        return this.contenedorCarrito.listar(id).then(c => c.productos)
    }

    async agregarProducto(idCarrito, idProducto){
        let carrito =  this.contenedorCarrito.listar(idCarrito);
        let producto =  this.contenedorProducto.listar(idProducto);
        carrito.then(c => 
                producto.then(p => {
                    c.productos.push(p);
                    this.contenedorCarrito.actualizar(c, idCarrito)
        }));
    }

    eliminarProductoDelCarrito(idCarrito, idProducto){
        let carrito = this.contenedorCarrito.listar(idCarrito);
        carrito.then(c =>{
            let producto = c.productos.find(producto => producto.id == idProducto)
            let index = c.productos.indexOf(producto)
            c.productos.splice(index, 1);
            this.contenedorCarrito.actualizar(c, idCarrito);
        }) 
    }
}

module.exports = Carritos