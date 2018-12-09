// Módulo de Pagamentos com suas rotas
const PAGAMENTO_CRIADO = "CRIADO";
const PAGAMENTO_CONFIRMADO = "CONFIRMADO";
const PAGAMENTO_CANCELADO = "CANCELADO";

module.exports = function(app) {
  
  app.get('/pagamentos', function(req, res) {                         // Lista pagamentos
    console.log('Recebida requisição!');
    res.send('OK.');
  });

  app.delete('/pagamentos/pagamento/:id', function(req, res) {        // Cancela pagamento
    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = PAGAMENTO_CANCELADO;

    var conn = app.persistencia.connectionFactory();                  // Acessa a pasta que tem o módulo de conexão com o BD
    var pagamentoDAO = new app.persistencia.PagamentoDAO(conn);
    
    pagamentoDAO.atualiza(pagamento, function(erro) {
      if (erro) {
        res.status(500).send(erro);
        return;
      }
      console.log('pagamento cancelado')
      res.status(204).send(pagamento)
    });
  });

  app.put('/pagamentos/pagamento/:id', function(req, res) {           // Confirma pagamento
    
    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = PAGAMENTO_CONFIRMADO;

    var conn = app.persistencia.connectionFactory();                  // Acessa a pasta que tem o módulo de conexão com o BD
    var pagamentoDAO = new app.persistencia.PagamentoDAO(conn);
    
    pagamentoDAO.atualiza(pagamento, function(erro) {
      if (erro) {
        res.status(500).send(erro);
        return;
      }
      console.log('pagamento confirmado')
      res.send(pagamento)
    });

  });

  app.post('/pagamentos/pagamento', function(req, res) {              // Salva pagamento

    // Definindo as validações
    req.assert('pagamento.forma_de_pagamento', 'Forma de pagamento é obrigatoria!').notEmpty();
    req.assert('pagamento.valor', 'Valor é obrigatorio e deve ser decimal!').notEmpty().isFloat();

    // Verifica se há erros de validação
    var erros = req.validationErrors();

    if (erros) {
      console.log('erros de validação encontrados!');
      res.status(400).send(erros);
      return
    }

    var pagamento = req.body["pagamento"];                            // Pega a chave 'pagamento' no corpo da requisição
    console.log('Processando a requisição de um novo pagamento!');

    pagamento.status = PAGAMENTO_CRIADO;                                      // Seta dados ao pagamento
    pagamento.data = new Date();

    var conn = app.persistencia.connectionFactory();                  // Acessa a pasta que tem o módulo de conexão com o BD
    var pagamentoDAO = new app.persistencia.PagamentoDAO(conn);

    pagamentoDAO.salva(pagamento, function(erro, resultado) {
      if(erro) {
        console.log('Erro ao inserir no banco: ' + erro);
        res.status(500).send(erro);
      } else {
        pagamento.id = resultado.insertId;
        console.log('Pagamento criado');

        if (pagamento.forma_de_pagamento == 'cartao') {
          var cartao = req.body["cartao"];

          var clienteCartoes = new app.servicos.clienteCartoes();
          
          clienteCartoes.autoriza(cartao,
            function(exception, request, response, retorno) {
              if (exception) {
                console.log(exception);
                res.status(400).send(exception);
                return;
              }
              console.log(retorno);

              res.location('/pagamentos/pagamento/' + pagamento.id);  // Envia a URL do recurso criado no resultado
        
              var response = {
                dados_do_pagamento: pagamento,
                cartao: retorno,
                links: [
                  {
                    href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
                    rel: 'Confirmar',
                    method: 'PUT'
                  },
                  {
                    href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
                    rel: 'Cancelar',
                    metho: 'DELETE'
                  }
                ]
              };


              res.status(201).json(response);
              return;
          });
          

        } else {
          res.location('/pagamentos/pagamento/' + pagamento.id);  // Envia a URL do recurso criado no resultado
        
          var response = {
            dados_do_pagamento: pagamento,
            links: [
              {
                href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
                rel: 'Confirmar',
                method: 'PUT'
              },
              {
                href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
                rel: 'Cancelar',
                metho: 'DELETE'
              }
            ]
          };
          
          res.status(201).json(response);
        }

        
      }
    });

  });

}
