const { promises: fs } = require('fs')

class ContenedorArchivo{

    constructor(ruta) {
        this.path = ruta;
    }

    async listar(id) {
        try{
            const leer = await fs.readFile(this.path,"utf-8");
            const data = JSON.parse(leer);
            const obj = data.find( obj => obj.id == id)   
            return obj
        }catch(e){
            console.log(e);
        }
    }

    async listarAll() {

        const leer = await fs.readFile(this.path,"utf-8");
        return JSON.parse(leer)

    }

    async guardar(obj) {
        try{
            const leer = await fs.readFile(this.path,"utf-8");
            const data = JSON.parse(leer) 
            let id; 
            let newObject;
            if(obj.id === undefined){
                data.length === 0 ? (id = 1) : (id = data[data.length -1].id + 1);  
                newObject = { ...obj, id, timestamp: Date.now()};
                data.push(newObject); 
            } else {
                data.push(obj);
                newObject = obj
            }
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
            return newObject.id;    
        } catch (e){
            console.log(e);
        }
    }

    async actualizar(elem, id) {
        await this.borrar(id);
        elem.id = id;
        await this.guardar(elem)
    }

    async borrar(id) {
        try{
            const leer = await fs.readFile(this.path,"utf-8");
            const data = JSON.parse(leer);
            const obj = data.find( obj => obj.id == id)
            if(obj){
                let index = data.indexOf(obj);
                data.splice(index,1)
                await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            }
            
            return obj
        }catch(e){
            console.log(e);
        }

    }

    async borrarAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2), "utf-8")
        } catch (e){
            console.log(e)
        }
    }
}

module.exports = ContenedorArchivo