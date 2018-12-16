/**
 * Módulo que permite a aplicação rodar
 * de maneira distribuída permitindo o uso 
 * de todos os processadores da CPU.
 * Permite abrir uma nova thread para cada núcleo. 
 */

var cluster = require ('cluster');
var os = require('os');

const CPUS = os.cpus();               // Retorna o número de núcleos do processador do sistema

console.log('executando thread');

if (cluster.isMaster) {
  console.log('thread master');

  CPUS.forEach(function(){ 
    cluster.fork()
  });

  cluster.on("listening", worker => {
    console.log("cluster %d conectado", worker.process.pid);
  });

  cluster.on("disconnect", worker => {
    console.log("cluster %d desconectado", worker.process.pid);
  });

  cluster.on("exit", function(worker)  {
    console.log("cluster %d perdido", worker.process.pid);
    cluster.fork();
  });

} else {
  console.log('thread slave');
  require('./index.js');
}