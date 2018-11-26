var express = require('express');       // Carrega o módulo do Express
var consign = require('consign');       // Carrega o módulo do Consign

module.exports = function() {
  var app = express();

  consign()
    .include('resources')
    .into(app);

  return app;
}