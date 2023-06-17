//=======[ Settings, Imports & Data ]==========================================

var mysql = require('mysql');
var conexiones = false;
const dbConfig = {
    host     : 'mysql-server',
    port     : '3306',
    user     : 'root',
    password : 'userpass',
    database : 'smart_home'
};
const connection = mysql.createConnection(dbConfig);
//=======[ Main module code ]==================================================
function connectDatabase(connection) {
    if(conexiones == true){
        connection = mysql.createConnection(dbConfig);
    }
    conexiones = false;
    connection.connect(function(err) {
        if (err) {
            console.error('Error while connect to DB: ' + err.stack);
            return;
        }
        console.log('Connected to DB under thread ID: ' + connection.threadId);
    });
}

function closeDatabase() {
  connection.end(function(err) {
    if (err) {
      console.error('Error al cerrar la conexión: ' + err.stack);
      return;
    }
    console.log('Conexión cerrada correctamente');
    conexiones = true;
});
}
module.exports = connection;
module.exports.connectDatabase = connectDatabase;
module.exports.closeDatabase = closeDatabase;
//=======[ End of file ]=======================================================
