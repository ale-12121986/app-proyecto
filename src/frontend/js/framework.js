var xmlReq;
var valor;
class Framework {
    // El objeto respuesta es llamado para enviar a main.ts
    respuesta(callback, xmlReq) {
        xmlReq.onreadystatechange = () => {
            if (xmlReq.readyState == 4) {
                if (xmlReq.status == 200) {
                    callback.manejarRespueta(xmlReq.responseText);
                }
                else {
                    alert("Error al buscar los datos!");
                }
            }
        };
    }
    // Se realiza una consulta get con la que se va a cargar el select del boton listar de la base de datos 
    ejecutarBackEnd(method, url, callback, data) {
        xmlReq = new XMLHttpRequest();
        this.respuesta(callback, xmlReq);
        xmlReq.open(method, url, true);
        //valor={'name':data};
        xmlReq.send();
    }
    // Se realizan todos los envios de datos para realizar las consultas en la base de datos 
    //donde el operacon :number es el que me indica que operacion se va a realizar
    enviarBackEnd(method, url, callback, datoEnviar, operacion) {
        xmlReq = new XMLHttpRequest();
        if (operacion == 3) {
            valor = { 'id': datoEnviar.id, 'state': datoEnviar.state, 'operacion': operacion };
        }
        else if (operacion == 4) {
            valor = { 'name': datoEnviar.name, 'state': datoEnviar.state, 'operacion': operacion };
        }
        else {
            valor = { 'id': datoEnviar.id, 'description': datoEnviar.description, 'name': datoEnviar.name, 'state': datoEnviar.state, 'type': datoEnviar.type, 'operacion': operacion };
        }
        //console.log(JSON.stringify(valor));
        xmlReq.open(method, url, true);
        xmlReq.setRequestHeader('Content-Type', 'application/json');
        xmlReq.send(JSON.stringify(valor));
        this.respuesta(callback, xmlReq);
    }
}
