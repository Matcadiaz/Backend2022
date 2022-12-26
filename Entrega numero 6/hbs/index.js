const express = require('express')
const app = require('express')();
const http = require('http').Server(app)
const io = require('socket.io')(http)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/hbs'));

let productos = [];

app.get("/", (req, res) => {
  res.render('pages/formulario', {productos, title: "productos"});
});

app.get("/plantilla", (req, res)=>{
  res.sendFile(__dirname + "/public/tabla.hbs")
})

app.post("/productos", (req, res)=>{

  productos.push(req.body);
  io.sockets.emit('productos-cargados', productos);
  res.redirect('/');
})

io.on('connection', socket =>{
socket.emit('productos-cargados', productos)
})

const PORT = 8080;

const server = http.listen(PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});

server.on("error", (error) =>
  console.log(`An error ocurred on server ${error.message}`)
);