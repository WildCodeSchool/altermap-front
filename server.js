const { Pool } = require("pg");
const express = require("express");
const app = express();
const port = 4000;
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORTPG
});

app.get("/", (req, res) => {
  pool.query("SELECT * from construction_sites", (err, results) => {
    if (err) {
      res.status(500).send("Vous n'êtes pas au bon endroit !");
    } else {
      res.redirect("/api/v1/");
    }
  });
});

app.get("/api/v1", (req, res) => {
  pool.query("SELECT * from construction_sites", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des ordinateurs");
    } else {
      res.send(results);
    }
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${port}`);
});
