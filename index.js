const express = require('express');
const app = express();
// le package cors permet de spécifier la politique de cors
const cors = require('cors');

// on ajoute un middleware, ici avec les options par défaut, n'importe quel domaine pourra interroger notre API
// voir la doc et les options si on veut être plus restrictif
app.use(cors())

require("dotenv").config();

const PORT = process.env.PORT ?? 3000;

app.use(express.urlencoded({ extended: true }));

const router = require("./app/router/router");

app.use(router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});