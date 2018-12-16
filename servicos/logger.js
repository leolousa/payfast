/**
 * Implementação do Serviço de log da aplicação
 */

var winston = require('winston');

var fs = require('fs');

if(!fs.existsSync('logs')) {          // Verifica se existe a pasta de log, senão cria.
 fs.mkdirSync('logs')
}

module.exports = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:MM:SS' // Formato da data e hora
        }),
        winston.format.printf(info => {
          return `PAYFAST: ${info.timestamp} - ${info.level}: ${info.message}`
        })
      ),
      filename: 'logs/payfast.log',
      maxsize: 100000, // Apróx. 100 Mb
      maxFiles: 10
    })
  ]
});
