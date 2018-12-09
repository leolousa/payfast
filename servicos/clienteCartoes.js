// Serviços de acesso a API de cartões cardfast

var restifyClient = require('restify-clients');                 //Importe do Restify

function CartoesClient() {
  this._cliente = restifyClient.createJsonClient({
    url: 'http://localhost:3001/'                               // Criando do cliente com a url do serviço
  });
}


CartoesClient.prototype.autoriza = function(cartao, callback) {
  this._cliente.post('/cartoes/autoriza', cartao, callback);    // Fazendo o post para o serviço
}

module.exports = function() {
  return CartoesClient;
}