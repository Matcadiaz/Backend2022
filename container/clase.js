const fs = require("fs").promises //agrego promises para evitar el error del await!

class Container{
    constructor(path){
        this.path = path
    }

    async save(objeto){
        try{
            const leer = await fs.readFile(this.path,"utf-8"); // leo el archivo
            const data = JSON.parse(leer) // lo parseo para que me traiga el json y verlo en forma de objeto
            let id; 
                data.length === 0 ? (id = 1) : (id = data[data.length -1].id + 1); // creo la variable id y le asigno el id = 1 al primer objeto. Luego corroboro por cada uno de ellos que si tiene id, le vaya sumando uno y se lo asigne. 
            const newProduct = { ...objeto, id};
            data.push(newProduct); // a cada objeto asignado con su id, lo pusheo para meterlo en la lista
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
            return newProduct.id;    
        } catch (e){
            console.log(e);
        }
    }
    
    async getById(id){
        try{
            const leer = await fs.readFile(this.path,"utf-8");
            const data = JSON.parse(leer);
            const obj = data.find( obj => obj.id === id)
                if(!obj){
                    return null
                }
                 return obj
        }catch(e){
            console.log(e);
        }
    }

    async getAll(){
        const leer = await fs.readFile(this.path,"utf-8");
        return JSON.parse(leer)
    }

    async deleteById(id){
        try{
            const leer = await fs.readFile(this.path,"utf-8");
            const data = JSON.parse(leer);
            const obj = data.find( obj => obj.id === id)
            if(obj){
                let index = data.indexOf(obj);
                data.splice(index,1)
                await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            }

        }catch(e){
            console.log(e);
        }
    }

    async deleteAll(){
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2), "utf-8")
        } catch (e){
            console.log(e)
        }
    }
}   

module.exports = Container
