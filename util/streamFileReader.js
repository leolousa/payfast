/**
 * Implementação do fs do Node com o stream mode.
 * Utilizando o fs.createReadStream a leitura do arquivo é assíncrona
 * enquanto inicia a leitura, fazemos a escrita do arquivo. 
 */
var fs = require('fs');         // Importa módulo de arquivos do Node

fs.createReadStream('imagem.png')
  .pipe(fs.createWriteStream('imagem2.png'))
  .on('finish', function() { // 'on' é um listener que escuta a lable 'finish' ao final de cada parte do stream
    console.log('Arquivo escrito com stream!')
  });