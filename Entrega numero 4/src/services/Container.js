

class Container{
    constructor(){
        this.productos = [];
    }

    save(obj) {
        let id; 
                this.productos.length === 0 ? (id = 1) : (id = this.productos[this.productos.length -1].id + 1); 
        const newProduct = {id, ...obj};
        this.productos.push(newProduct);
        return newProduct;
    }

    getAll(){
        return this.productos;
    }

    getById(id){
        const obj = this.productos.find((producto) => producto.id === id);
        if(obj){
            return obj;
        } else {
            return ("Error: objeto no encontrado!")
        }
    }

    updateById(id, obj){
         const findObj = this.productos.find((producto)=> producto.id === id);
         if (findObj){
            const filterById = this.productos.filter((producto)=> producto.id !== id);
            const newObj = {id, ...obj};
            this.productos = [...filterById, newObj];
            return newObj;
         } else {
            return ("Error: objeto no encontrado!")
         }
    }

    deleteById(id){
        const findObj = this.productos.find((producto)=> producto.id === id);
         if (findObj){
            const index = this.productos.indexOf(findObj);
            const deleteProduct = this.productos.splice(index,1) ;
            return deleteProduct;
         } else {
            return ("Error: objeto no encontrado!")
         }
    }
    
}

module.exports = Container;