module.exports = function(app) {
  
  app.get('/pagamentos', function(req, res) {
    console.log('Recebida requisição!');
    res.send('OK.');
  });

  app.post('/pagamentos/pagamento', function(req, res) {

    // Definindo as validações
    req.assert('forma_de_pagamento', 'Forma de pagamento é obrigatoria!').notEmpty();
    req.assert('valor', 'Valor é obrigatorio e deve ser decimal!').notEmpty().isFloat();

    // Verifica se há erros de validação
    var erros = req.validationErrors();

    if (erros) {
      console.log('erros de validação encontrados!');
      res.status(400).send(erros);
      return
    }

    var pagamento = req.body;
    console.log('Processando a rewuisição de um novo pagamento!');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date();

    var conn = app.persistencia.connectionFactory();                // Acessa a pasta que tem o módulo de conexão com o BD
    var pagamentoDAO = new app.persistencia.PagamentoDAO(conn);

    pagamentoDAO.salva(pagamento, function(erro, resultado) {
      if(erro) {
        console.log('Erro ao inserir no banco: ' + erro);
        res.status(500).send(erro);
      } else {
        console.log('Pagamento criado');
        res.location('/pagamentos/pagamento/' + resultado.insertId);  // Envia a URL do recurso criado no resultado
        res.status(201).json(pagamento);
      }
    });



  });

}
