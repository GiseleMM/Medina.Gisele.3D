
import XHR,{} from "./xhr.js";

import { crearTabla, eliminarTabla ,actualizarTabla,obtenerElementoSeleccionadoTabla} from "./tabla.js";
import { camposVacios, cantidadCaracteresInvalida, cantidadInvalidasEnteras } from "./validaciones.js";
import { modoModificar, mostrarMensaje, cargarSelect, resetFormulario, cargarFormularioCrud,obtenerDelFormularioCrud,crearCheckbox,crearOptionesSelect,cargarResultPromedio } from "./formulario.js";
import { SuperHeroe } from "./SuperHeroe.js";



const API="http://localhost:3000/superHeroes";
const  ARMAS="http://localhost:3000/armas";
const $contenedorTabla=document.querySelector("#section-tabla");
const $contenedorCheckboxControl = document.getElementById("control-tabla-checkbox");
const $selectFiltros = document.getElementById("select-filtros");
const $resulPromedio = document.getElementById("result-promedio");
console.log($contenedorTabla);
// ["armadura","espada","martillo","escudo","arma de fuego", "flechas" ];

//TRAIGO ARMAS PARA CONTRUIR EL FORM
//CARGO SELECT
// cargarSelect(traerDatos("armas"));
XHR.get(ARMAS,(res)=>{
    console.log(res);
    console.log(res.map(({nombre})=>nombre));
    cargarSelect(res.map(({nombre})=>nombre));
});

let lista=[];

XHR.get(API,(res)=>{
    //OBTENGO LA LISTA EN MEMORIA map a clase 
    lista = res.map(item => {
        return new SuperHeroe(item.id,item.nombre,item.fuerza, item.alias,item.editorial, item.armas);});

    //CREO TABLA Y LO AGREGO AL DOM

document.querySelector("#section-tabla").appendChild(crearTabla(lista));
let k = Object.keys(lista[0]);
crearCheckbox($contenedorCheckboxControl, k);

crearOptionesSelect($selectFiltros,["MARVEL","DC"]);
calcularPromedio(lista);
});

//CREO VALOR DE SPAN PARA FOOTER
const fecha=new Date().getFullYear();
document.getElementById("span-footer-fecha").textContent=fecha.toString();



//ME TRAIGO LOS ELEMENTOS DEL FORM
const $formulario = document.forms[0];
const { txtNombre, rdoEditorial, txtAlias, rangeFuerza, selecArmas, txtHidden } = $formulario;



//AGREGO EL MANEJADOR AL EVENTO SUBMIT
$formulario.addEventListener("submit", e => {
    e.preventDefault();

    // console.log(e.target);//FORM
    // console.log(e.type);//SUBMI

 
        let errores = [];
        for (const input of [txtNombre, txtAlias]) {

            if (camposVacios(input)) {

                errores.push("es necesario completar todos los campos");
                break;// SI HAY ALGUN CAMPO VACIO NO VEO LO DEMAS
            }

        };
        if(cantidadCaracteresInvalida(255,txtNombre))errores.push("no debe superar los 255 caracteres")

        if(cantidadInvalidasEnteras(rangeFuerza,0,51))errores.push("fuerza de rango");

      
        if (errores.length > 0) {
         
            let mensaje = errores.join("&#10007;");//USO INNERHTML
            console.log(mensaje);
            mostrarMensaje(mensaje);


        } else {

            if (txtHidden.value.trim() == "") {
                //ALTA
           
                const nuevo=obtenerDelFormularioCrud();
                console.log(nuevo);
              
                handlerAlta(nuevo);
                actualizarSubtitulo("Modificar");
                resetFormulario();

            }
            else {
                //MODIFICACION
        
                const modificado= obtenerDelFormularioCrud();
                // modificarEntidad(datoModificado);
          
                handlerModificar(modificado);
                resetFormulario();
            }
        }


});

function handlerAlta(obj) {
    let p = XHR.postPromise(API, obj);
    p.then(res => {
        // id, nombre,fuerza,alias,editorial,armas
      const aux = new SuperHeroe(res.id,res.nombre,res.rangeFuerza,res.alias,res.rdoEditorial,res.armas);
      lista.push(aux);
      console.log(lista);
      actualizarTabla(contenedorTabla, lista);
  
    }).catch(e => console.error(e));
  
  }
  function handlerDelete(id) {
    let indice = lista.findIndex(item => item.id == id);
    if (indice != -1) {
      //elimino de api y luego de memoria
      // deleteXhr(API, id, (res) => res ? anuncios.splice(indice, 1) : console.log("Error en eliminacion"));
      let p = XHR.deletePromise(API, id);
      p.then(res => lista.splice(indice, 1))
        .catch(error => console.log("no se pudo eliminar"));
  
  
    }
  }
  function handlerModificar(obj) {
  
    let indice = lista.findIndex(item => item.id == obj.id);
    if (indice != -1) {
      XHR.put(API, obj, (res) => {
        const aux = new SuperHeroe(res.id,res.nombre,res.rangeFuerza,res.alias,res.rdoEditorial,res.armas);
        lista.splice(indice, 1, aux);
        actualizarTabla($contenedorTabla, lista);
      });
  
    }
  }


function actualizarSubtitulo(texto){

    const $contenedorSubtitulo=document.getElementById("subtitulo");
 $contenedorSubtitulo.textContent=texto;

}


///ORDENAMIENTO-----------------------------------------------------------------------------------


function ordenarDatosPorNumericos(criterio) {
    const copia = [...listaLS];
     copia.sort((a, b) => a[criterio] - b[criterio]);
    return copia;

}
function ordenarDatosPorString(criterio) {
    const copia = [...listaLS];
     copia.sort((a, b) =>{
  
        return a[criterio].localeCompare(b[criterio])
     } );
return copia;
}

function ordenarDatosPorNombre() {
    return ordenarDatosPorString("nombre");
}
function ordenarDatosPorAlias() {
    return ordenarDatosPorString("alias");
}
function ordenarDatosPorArmas() {
    return ordenarDatosPorString("armas");
}
function ordenarDatosPorFuerza(){
return ordenarDatosPorNumericos("fuerza");
}
function ordenarDatosPorEditorial(){
    return ordenarDatosPorNumericos("editorial");
    }

//DELEGACION DE EVENTO ---------------------------------------------------------------------------------------------
document.addEventListener("click", event => {
    let emisor = event.target;
    if(emisor.matches("input[type='range']")){

        let valor=emisor.value;
        document.getElementById("fuerzaSmall").textContent="fuerza: "+valor;
    }
    if (emisor.matches("td")) {
        const seleccionado=obtenerElementoSeleccionadoTabla(emisor,lista);
        console.log(seleccionado);
        cargarFormularioCrud(seleccionado);
        modoModificar();
        actualizarSubtitulo("Modificacion");

    }

    if (emisor.matches("input[name='btnEliminar']")) {
        let id = document.forms[0].txtHidden.value;
       handlerDelete(id);
        resetFormulario();
      
    }
    if (emisor.matches("input[name='btnCancelar']")) {
        resetFormulario();
        actualizarSubtitulo("Llene el formulario de alta");
    }
    if (emisor.matches("th")) {
        console.log(emisor);
        // alert(emisor.textContent);
        switch (emisor.textContent) {
            case "nombre":
                actualizarTabla(ordenarDatosPorNombre());

                break;
            case "alias":
                actualizarTabla(ordenarDatosPorAlias());
                break;
            case "armas":
                actualizarTabla(ordenarDatosPorArmas());
                break;
            case "fuerza":
                actualizarTabla(ordenarDatosPorFuerza());
                break;
                case "editorial":
                    actualizarTabla(ordenarDatosPorEditorial());

            default:
                break;
        }
    }


});

//DELEGACION DE EVENTO EVENTO CHANGE
//EVENTO CHANGE DEL DOCUMENTO----------------------------------------------------------------------------------------------
document.addEventListener("change", (e) => {
    const emisor = e.target;
    if( (emisor.matches("#select-filtros")) || (emisor.matches("input[name='control-mostrar']"))) {
  
  handlerConfiguracionTabla();  
  
    }
     
  });


  function handlerConfiguracionTabla(){
    cargarResultPromedio($resulPromedio, calcularPromedio(lista));
    const selecValue = document.getElementById("select-filtros").value;
    let filtrada;
    if(selecValue.toLowerCase().trim()!=="todos"){
        filtrada=lista.filter(({editorial})=>editorial.toLowerCase().trim()==selecValue.toLowerCase().trim());
    }else{
      filtrada=[...lista];
    }
  
    actualizarTabla($contenedorTabla, filtrada);
    const coleccionQueMostrar = document.querySelectorAll("input[name='control-mostrar']");
    console.log(coleccionQueMostrar);
    const array = [];
    for (const input of coleccionQueMostrar) {
      console.log(input.dataset.mostrar);
      if (input.checked == true) {
        array.push(input.dataset.mostrar);
      }
  
    }
    const mapeado = filtrada.map(a => {
      //PARA Q LUEGO PUEDO SELECCIONARLO
      const obj = {"id":a.id};
      for (const clave of array) {
        obj[clave] = a[clave];
  
      }
      return obj;
    });
    actualizarTabla($contenedorTabla, mapeado);
  
  }
  function calcularPromedio(dato) {
    if (dato.length == 0) return 0;
    const selecValue = document.getElementById("select-filtros").value;
   
    if (selecValue.toLowerCase() == "todos") {
      let total = dato.map(({ fuerza }) => parseFloat(fuerza)).reduce((acum, act) => acum + act);
      return total / dato.length;
    } else {
      let filtrado = dato.filter(({ editorial }) => editorial.toLowerCase().trim() == selecValue.toLowerCase().trim());
      if (filtrado.length == 0) return 0;
      let mapeado = filtrado.map(({ fuerza }) => parseFloat(fuerza));
      let total = mapeado.reduce((acumu, act) => acumu + act);
      return total / filtrado.length;
    }
  
  }






