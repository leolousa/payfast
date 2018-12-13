# payfast
Exemplo do curso de APIs com Node.js da Alura

NODE.JS
=======

O Node.js é uma plataforma, ou um ambiente de execução para códigos javascript escrita em cima da engine de Javascript do Chrome, a V8. Ele é todo baseado em eventos e suas operações são não-bloqueantes, o que lhe confere bastante eficiência e leveza.

O npm tem a função de gerenciar os projetos e pacotes JavaScript externos que precisemos utilizar em cada aplicação. Quando o Node é instalado, o npm também já vem por default e com certeza será muito útil em qualquer projeto desenvolvido sobre o Node, visto que é muito comum que se precise de libs externas para facilitar o desenvolvimento de certas funcionalidades.

Express.js é um projeto web server do Node.js. É uma biblioteca JavaScript construída sobre o módulo HTTP do Node.js, e nos fornece uma maneira mais simples de lidar com as requisições. Assim, precisaremos nos preocupar apenas com a lógica do nosso negócio.

1. Instalar o Node.js (https://nodejs.org/en/)
==============================================

  > node -v
  > npm init

2. Instalar o Express.js
========================

  > npm install express --save

  Código app.js:

  var express = require('express');
  var app = express();

  app.get('/produtos', function(req,res){
    res.send("<html><body><h1>Listagem de produtos</h1></body></html>");
  });

  app.listen(3000,function(){
    console.log("servidor rodando");
  });

  > node app.js


3. Instalar biblioteca para trabalhar com código HTML e JS na página
====================================================================

  3.1. EJS - Embedded Java Script (http://www.embeddedjs.com/)

  > npm instal ejs --save


  3.2. MARKO - (https://markojs.com/)

  > npm instal marko --save
  (obs.: no package.json, inserir a linha na entrada "start": "nodemon server.js --ignore *.marko.js", para evitar conflitos entre Nodemon e MARKO.


4. Instalar o Nodemon que monitor o Node e faz o redeploy automático da aplicação (-g global)
=============================================================================================

  > npm install -g nodemon
  à partir de agora rodamos a aplicação: >nodemon app

O nodemon é uma ferramenta que fica observando o código do projeto e já faz o reload automático sempre que detecta alguma alteração. Assim você não precisa ficar reiniciando a aplicação a cada nova mudança no código.

Quando ele é instalado, é mais interessante que seja feita uma instalação global para que assim ele fique disponível para todos os projetos que você criar utilizando Node. Por esse motivo, você precisa ter permissão de super usuário na máquina para que ele consiga escrever diretamente na pasta de instalação do node. Esse é o motivo de passarmos também o sudo no início do comando.


5. Banco de dados
=================

  Instale o driver do MySQL implementado em Javascript

  > npm install mysql --save


6. Carregador de rotas - express-load
=====================================

  >npm install express-load --save

  - Alternativamente podemos usar a biblioteca Consign:

  >npm install consign --save

7. Preenche a propriedade Body do request - body-parser
=======================================================

  >npm install body-parser --save


8. Validação de campos com o Express Validator
==============================================

  >npm install express-validator --save


9. MOCHA - Biblioteca para teste unitário em JS
===============================================

  >npm install mocha --save-dev

  Criar pasta 'test' na raiz do projeto, onde ficarão as classes de teste e em seguida para rodar os testes:

  > node node_modules/mocha/bin/mocha


10. SUPERTEST - Biblioteca de teste em JS
=========================================

  > npm install supertest --save-dev


11. SOCKET.IO - Biblioteca de eventos real-time em JS
=====================================================

  > npm install socket.io --save


12. RESTIFY - Biblioteca específica para implementar clientes Rest (Quando a sua API quiser consumir um serviço de outra API)
===============================================================================================================================

  > npm install restify --save


13. SOAP - Biblioteca para acesso a serviços Webservice SOAP (ex.: Correios)
============================================================================

  > npm install soap --save


14. MEMCACHED- Memory Object Caching System (para manipular o cache e armazenar dados em memória)
=================================================================================================

  Instalação no servidor:

  Linux Redhat/Fedora: > yum install memcached
  
  Linux Debian/Ubuntu: > apt-get install memcached

  Windows: http://s3.amazonaws.com/downloads.northscale.com/memcached-win64-1.4.4-14.zip
	- Descompacte e instale: <c:/<caminho-da-pasta>/memcached/memcached.exe  -d install
	- iniciar: c: /Proejetos/memcached/memcached.exe início -d
	- Como serviço: net start “memcached Server”
	- Alterar a qtd de memória (padrão: 64mb) no registro: HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Services/memcached Server
							     Altere o imagePath: “C: /Projetos/memcached/memcached.exe” -d RunService -m 512

  Uso da biblioteca na API como cliente:

  > npm install memcached --save



15. 
