var express = require('express');       // Carrega o módulo do express
var app = express();

app.listen(3000, function() {
  console.log('Servidor rodando na porta 3000!')
});

app.get('/teste', function(req, res) {
  console.log('Recebida requisição!');
  res.send('OK.');
});
