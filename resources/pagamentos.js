
module.exports = function(app) {
  app.get('/pagamentos', function(req, res) {
    console.log('Recebida requisição!');
    res.send('OK.');
  });

}
