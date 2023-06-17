var M;
var lista = [];
var ulDisp;
var iDispositivo;
//var cargaDispositivo;
function cargarValor(valor) {
    var leerDato;
    switch (valor) {
        case 1:
            leerDato = "Lampara";
            break;
        case 2:
            leerDato = "Cocina";
            break;
        case 3:
            leerDato = "Aire";
            break;
        case 4:
            leerDato = "Heladera";
            break;
        case 5:
            leerDato = "Persiana";
            break;
        default:
            console.log("Opción no válida");
            break;
    }
    return leerDato;
}
class Main {
    constructor() {
        this.framework = new Framework();
        this.dispositivo = new Array();
        ulDisp = document.getElementById("listaDisp");
        //alert(JSON.stringify(obj));
    }
    blanquear(element) {
        element.innerHTML = "";
    }
    manejarRespueta(respueta) {
        lista = JSON.parse(respueta);
        //ulDisp.innerHTML=respueta;
        this.blanquear(ulDisp);
        console.log(lista);
        for (var disp of lista) {
            var item = `<li class="collection-item avatar">
        <div>`;
            if (disp.name == "Lampara") {
                item +=
                    '<img src="static/images/lightbulb.png" alt = "" class="circle" >';
            }
            else if (disp.name == "Cocina") {
                item += '<img src="static/images/cocina.png" alt = "" class="circle" >';
            }
            else if (disp.name == "Aire") {
                item += '<img src="static/images/aire.png" alt = "" class="circle" >';
            }
            else if (disp.name == "Heladera") {
                item +=
                    '<img src="static/images/freezer.png" alt = "" class="circle" >';
            }
            else if (disp.name == "Persiana") {
                item += '<img src="static/images/window.png" alt = "" class="circle" >';
            }
            item += `<span class="titulo">${disp.name}</span>
          <p>
          ${disp.description}
          </p>
          <a href="#!" class="secondary-content">
              <div class="switch">
                  <label>
                  Off
                  `;
            if (disp.state) {
                item += `<input type="checkbox" checked id="ck_${disp.id}">`;
            }
            else {
                item += `<input type="checkbox" id="ck_${disp.id}" >`;
            }
            item += `
                  <span class="lever"></span>
                  On
                  </label>
              </div>
          </a>`;
            if (disp.name == "Aire" || disp.name == "Persiana" || disp.name == "Cocina") {
                item += ` <div class = "right-align">
            <p class="range-field">
              <input type="range" id="typ_${disp.id}" min="0" max="10" value="${disp.type}"/>
            </p>
          `;
            }
            item += `<button class="btn-floating btn-large waves-effect waves-light blue" ><i id="bte_${disp.id}"  class="material-icons" >edit</i></button>`;
            item += `<button class="btn-floating btn-large waves-effect waves-light blue"><i id="btd_${disp.id}" class="material-icons">delete</i></button>
          </div>
          </div>
      </li>`;
            ulDisp.innerHTML += item;
        }
        for (var disp of lista) {
            var checkPrender = document.getElementById("ck_" + disp.id);
            checkPrender.addEventListener("click", this);
            var precionarBotonEdit = document.getElementById("bte_" + disp.id);
            precionarBotonEdit.addEventListener("click", this);
            var precionarBotonDelete = document.getElementById("btd_" + disp.id);
            precionarBotonDelete.addEventListener("click", this);
        }
    }
    obtenerDispositivo() {
        this.framework.ejecutarBackEnd("GET", "http://localhost:8000/devices", this);
    }
    enviarDispositivo(dato, valor) {
        this.framework.enviarBackEnd("POST", "http://localhost:8000/devices", this, dato, valor);
    }
    handleEvent(event) {
        lista = [];
        var elemento = event.target;
        var cargaDispositivo = new Device();
        console.log(elemento);
        //Se consulta por la opcion lista, se hace una lista de los objetos que estan en la base de datos
        if (event.target.id == "btnListar") {
            this.obtenerDispositivo();
            //Se consulta con los elementos que se 
        }
        else if (elemento.id.startsWith("ck_")) {
            alert("El elemento " + elemento.id + " cambia de estado a =" + elemento.checked);
        }
        // Se consulta por la opcion editar, se buscar por la opcion de elemento id que la busquera empieza por btd_
        if (elemento.id.startsWith("btd_")) {
            console.log("El elemento " + elemento.id);
            cargaDispositivo.id = parseInt(elemento.id.substring(4));
            cargaDispositivo.state = false;
            this.enviarDispositivo(cargaDispositivo, 3);
            this.obtenerDispositivo();
            //Se consulta por la opcion de buscar y editar, se edita por la opcion de elemento id que la busquera empieza por bte_
        }
        else if (event.target.id == "btnAgregar" || elemento.id.startsWith("bte_")) {
            //Si se presiona el boton de editar etra al if y se carga el el valir de id
            if (elemento.id.startsWith("bte_")) {
                cargaDispositivo.id = parseInt(elemento.id.substring(4));
            }
            else {
                // si se presiona el boton de agregar inserta el valor que se trae del input
                iDispositivo = (document.getElementById("iDispositivo"));
                cargaDispositivo.id = parseInt(iDispositivo);
            }
            //se cargan los valores para agregar y editar
            var iDescripcion = (document.getElementById("iDescripcion"));
            var iTipoDispositivo = (document.getElementById("iTipoDispositivo"));
            var iEstado = document.getElementById("iswitch");
            var iTipo = document.getElementById("iTipo");
            cargaDispositivo.description = iDescripcion.value;
            cargaDispositivo.name = cargarValor(parseInt(iTipoDispositivo.value));
            // se vambia el valor de 1 y 0 a true o false para ser cargado en el objeto de Device
            if (iEstado.checked) {
                cargaDispositivo.state = true;
            }
            else {
                cargaDispositivo.state = false;
            }
            cargaDispositivo.type = parseInt(iTipo.value);
            //Se entra en la sub rutina para entrar 
            if (elemento.id.startsWith("bte_")) {
                this.enviarDispositivo(cargaDispositivo, 2);
                this.obtenerDispositivo();
            }
            else {
                this.enviarDispositivo(cargaDispositivo, 1);
            }
            // si entras el boton buscar te trae los valores de un modal  para realizar una consulta
            // y cargar la tabla 
        }
        if (event.target.id == "btnBuscar") {
            var iTipoDispositivo2 = (document.getElementById("iTipoDispositivo2"));
            cargaDispositivo.name = cargarValor(parseInt(iTipoDispositivo2.value));
            cargaDispositivo.state = false;
            this.enviarDispositivo(cargaDispositivo, 4);
        }
    }
}
// Se realiza la configuracion para el funcionamiento de los botonos
window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
    var elemsC = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elemsC, { autoClose: true });
    var elems2 = document.querySelectorAll('.modal');
    var instances2 = M.Modal.init(elems2);
    var main = new Main();
    var btnListar = document.getElementById("btnListar");
    btnListar.addEventListener("click", main);
    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", main);
    var btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.addEventListener("click", main);
});
