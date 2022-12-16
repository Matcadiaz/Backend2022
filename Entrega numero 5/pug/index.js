const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

let productos = [];

app.get("/", (req, res) => {
  res.render('pages/formulario', {productos, title: "productos"});
});

app.post("/productos", (req, res)=>{

  productos.push(req.body);

  res.redirect('/');
})

app.get('/productos', (req, res)=>{
  res.render('pages/tablaHtml', {productos, title: "productos"})
})

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});

server.on("error", (error) =>
  console.log(`An error ocurred on server ${error.message}`)
);