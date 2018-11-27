module.exports = function(app) {
  
  app.get('/pagamentos', function(req, res) {
    console.log('Recebida requisição!');
    res.send('OK.');
  });

  app.post('/pagamentos/pagamento', function(req, res) {
    var pagamento = req.body;
    console.log('Processando a rewuisição de um novo pagamento!');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date();

    var conn = app.persistencia.connectionFactory();            // Acessa a pasta que tem o módulo de conexão com o BD
    var pagamentoDAO = new app.persistencia.PagamentoDAO(conn);

    pagamentoDAO.salva(pagamento, function(erro, resultado) {
      console.log('Pagamento criado');
      res.json(pagamento);
    });

  });

}
