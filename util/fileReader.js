/**
 * Implementação do fs do Node, que armazena o arquivo em buffer (buffer mode).
 * Utilizando o fs.readFile só executará a função de callback após o arquivo
 * 'imagem.png' ser todo carregado na memória! Tamanho máximo da V8 JS Engine: 1Gb
 */
var fs = require('fs');         // Importa módulo de arquivos do Node

fs.readFile('imagem.png', function(erro, buffer) {
  console.log('Arquivo lido!');

  fs.writeFile('imagem2.png', buffer, function(err) {
    console.log('Arquivo escrito');
  });
});