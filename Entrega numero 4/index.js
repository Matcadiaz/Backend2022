const express = require ('express')
const v1Router = require('./src/v1/routes/router')


const app = express();

const PORT = 8080;

app.use(express.json()); //utilizo para que tome la inforación que se manda por body
app.use(express.urlencoded ({extended:true}));//parseo la info que le mando al body
app.use(express.static("public")); // método que me permite usar las carpetas estaticas.
app.use('/api/productos', v1Router);

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))