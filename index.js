const express = require('express');
const app = express();

// le package cors permet de spécifier la politique de cors
const cors = require('cors');

// le module express-session va nous permettre d'utiliser les sessions dans express (req.session)
const session = require('express-session');

// on ajoute un middleware, ici avec les options par défaut, n'importe quel domaine pourra interroger notre API
// voir la doc et les options si on veut être plus restrictif
app.use(cors())

require("dotenv").config();

const PORT = process.env.PORT ?? 3005;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// configuration de mes sessions
const sessionConfig = {
  secret: "un très grand slkajsbd ajszdh ljhazqd secret lqkdjs", // le secret va permettre de générer des identifiants de session plus ou moins complexe
  cookie: {},
  resave: false, // cet option permet de sauvegarder ou non la session à chaque requête
  saveUninitialized: true // cet option permet de sauvegarder une session même si elle est vide
};

app.use(session(sessionConfig));

const router = require("./app/router/router");

app.use(router);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`)
});