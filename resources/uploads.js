/**
 * Implementação da rota de upload:
 * Lembrar ao cliente para mandar no Header:
 * Content-Type: application/octet-stream
 * filename: <nome-do-arquivo>.<extensão>
 */
var fs = require('fs');

module.exports = function(app) {

  app.post('/upload/imagem', function(req, res) {
    console.log('Recebendo imagem...');

    var arquivo = req.headers.filename; // Header com o nome do arquivo
    
    req.pipe(fs.createWriteStream('files/' + arquivo))
    .on('finish', function() {
      console.log('Arquivo escrito!');
      res.status(201).send('Upload completo!');
    });
  });

}