const express = require('express');
const app = express();
const session = require('express-session');
const multer = require('multer');

// le package cors permet de spécifier la politique de cors
const cors = require('cors');
const middlewareLogin = require('./app/middleware/middlewareLogin');

// on ajoute un middleware, ici avec les options par défaut, n'importe quel domaine pourra interroger notre API
// voir la doc et les options si on veut être plus restrictif
app.use(cors())

require("dotenv").config();

const PORT = process.env.PORT ?? 3005;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const mutipartParser = multer();
app.use(mutipartParser.none());

const router = require("./app/router/router");



app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: (1000*60*60), // ça fait une heure
  }
}))


app.use(router);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`)
})