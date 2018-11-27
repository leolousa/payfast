var mysql = require('mysql');

function createDBConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'payfast'
  });
}

module.exports = function() {
  return createDBConnection;
}