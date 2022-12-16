const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", { title: "PUGJS", mensaje: "Pug JS Works!!!" });
});

app.get("/datos", (req, res) => {
  const { min, max, titulo, nivel } = req.query;
  res.render("meter", { min, max, titulo, nivel });
});

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});

server.on("error", (error) =>
  console.log(`An error ocurred on server ${error.message}`)
);