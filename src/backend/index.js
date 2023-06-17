//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');
const { connectDatabase, closeDatabase } = require('./mysql-connector'); 
// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));
//let datoRecibido=[];
connectDatabase(utils);//Abre la base de datos
//=======[ Main module code ]==================================================

app.get('/devices/', function(req, res, next) {
    const sql = 'SELECT * FROM Devices';
    utils.query(sql, (error, results) => {  // consulta de la base de datos para insertar valores
    if (error) {
        console.error('Error en la consulta:', error);
        } else {
            console.log('Resultados de la consulta:', results);
            res.send(results).status(200);
        }
    });
    //closeDatabase(utils);// Cierra la base de datos
    
});

app.post('/devices/',function(req, res, next) {
    var estado = 0;
    var valor = req.body.operacion;  //se recibe el valor para preguntar que consulta va a realizar
    var sql="";
    var values;
   
    if(req.body.operacion == null){
         res.status(409);
         res.send("el texto no es valido o esta vacio");
    }else{
        if(JSON.parse(req.body.state) == true){
            estado = 1;
        }
        if(JSON.parse(req.body.state) == false){
            estado = 0;
        }

        if(valor == 1){
            sql = 'INSERT INTO Devices (name, description, state, type) VALUES (?, ?, ?, ?)';// consulta para insertar los datos
            values = [req.body.name, req.body.description,estado, req.body.type];
            utils.query(sql, values, (error, result) => {   // insertar valores en la base de datos
               if (error) { //si aparece un error se muestra
                    console.error('Error en la consulta de inserción:', error);
               } else {
                    console.log('Registro insertado con éxito. ID:', result.insertId);
                    res.status(200);
                }
            });
        }else if(valor == 2){
            sql ='UPDATE Devices SET name = ?, description = ?, state = ?, type = ? WHERE id = ?';// consulta para modificar los datos
            values = [req.body.name, req.body.description, estado, req.body.type, req.body.id];
            utils.query(sql, values, (error, result) => {   // modifica la base de datos 
                if (error) {    //si aparece un error se muestra
                    console.error('Error en la modificacion de la tabla:', error);
                } else {
                    console.log('Registro de una modificacion con exito:', result.insertId);
                    res.status(200);
                }
            });
        }else if(valor == 3){
            sql ='DELETE FROM Devices WHERE id = ?';// consulta para eliminar los datos
            values = [req.body.id];
            utils.query(sql, values, (error, result) => {   // elimina los datos de la base de datos 
                if (error) {    //si aparece un error se muestra
                    console.error('Error en el borrado:', error);
                } else {
                    console.log('Borrado con exito');
                    res.status(200);
                }
            });
        }else if(valor == 4){
            console.log("entro");
            sql = 'SELECT name, description, state FROM Devices WHERE name = ?';// consulta para modificar los datos
            values = [req.body.name];
            utils.query(sql, values, (error, result) => {   // elimina los datos de la base de datos 
                if (error) {    //si aparece un error se muestra
                    console.error('Error en la consulta:', error);
                } else {
                    console.log('Consulta exitosa. nombre:', result.insertId);
                    res.send(result).status(200);
                    console.log(result);
                }
            });
    
        }
    }
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
