// Módulos de customização a serem incluídos ao Express

var express = require('express');             // Carrega o módulo do Express
var consign = require('consign');             // Carrega o módulo do Consign
var bodyParser = require('body-parser');      // Carrega o módulo body-parser
var validator = require('express-validator'); // Carrega o módulo do express-validator
var morgan = require('morgan');               // Carrega o módulo do Morgan
var logger = require('../servicos/logger.js');// Carrega o logger.js para uso


module.exports = function() {
  var app = express();

  // Middlewares
  app.use(morgan("common", {
    stream: {
      write: function(mensagem) {
        logger.info(mensagem);
      }
    }
  }));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(validator());

  // Adiciona as pastas do projeto para poder invocar nos arquivos .js
  consign()                                   // Invoca o consign()
    .include('resources')                     // Inclui a pasta 'resources'
    .then('persistencia')                     // Inclui a pasta 'persistencia'
    .then('servicos')                         // Inclui a pasta 'servicos'
    .into(app);

  return app;
}