// Módulos de customização a serem incluídos ao Express

var express = require('express');             // Carrega o módulo do Express
var consign = require('consign');             // Carrega o módulo do Consign
var bodyParser = require('body-parser');      // Carrega o módulo body-parser
var validator = require('express-validator'); // Carrega o módulo do express-validator

module.exports = function() {
  var app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(validator());

  consign()                                   // Invoca o consign()
    .include('resources')                     // Inclui a pasta 'resources'
    .then('persistencia')                     // Inclui a pasta 'persistencia'
    .then('servicos')                         // Inclui a pasta 'servicos'
    .into(app);

  return app;
}