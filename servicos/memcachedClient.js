/**
 * Módulo de tratamento do cache - MemCached
 */


var memcached = require('memcached');

module.exports = function() {
  return createMencachedClient;
}

function createMencachedClient() {
  var cliente = new memcached('localhost:11211', {
    retries: 10, // Tentativas por request
    retry: 10000, // Tentativas de acessar o servidor e milesegundos
    remove: true // Remover do cluster um nó que esteja morto/sem respostas
  });
  return cliente;
}



/**
 * EXEMPLOS
 */
// Seta um chave no cache
//cliente.set('pagamento-20', {'id': 20}, 60000, function(erro) {
//  console.log('NOva chave adicionada ao cache: pagamento-20');
//});


// Consulta a chave no cache
//cliente.get('pagamento-20', function(erro, retorno) {
//  if(erro || !retorno){
//    console.log('MISS - chave não encontrada');
//  } else {
//    console.log('HIT = valor: ' + JSON.stringify(retorno));
//  }
//});