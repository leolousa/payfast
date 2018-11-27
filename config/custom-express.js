var express = require('express');       // Carrega o módulo do Express
var consign = require('consign');       // Carrega o módulo do Consign
var bodyParser = require('body-parser');// Carrega o módulo body-parser


module.exports = function() {
  var app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  consign()
    .include('resources')               // Inclui a pasta 'resources'
    .then('persistencia')               // Inclui a pasta 'persistencia'
    .into(app);

  return app;
}