
export function mostrarSpinner(){
    document.querySelector("#spinner").classList.remove("d-none");
}
export function ocultarSpinner(){
    document.querySelector("#spinner").classList.add("d-none");
}
export  function cargarFormularioCrud(dato){
    document.forms["form-crud"].txtNombre.value=dato.nombre;
    
    document.forms["form-crud"].rdoEditorial.value=dato.editorial;
 
    document.forms["form-crud"].txtAlias.value=dato.alias;
    document.forms["form-crud"].rangeFuerza.value=dato.fuerza;
    document.forms["form-crud"].selecArmas.value=dato.armas;
    document.forms["form-crud"].txtHidden.value=dato.id;
}
export function resetFormulario(){
    document.forms["form-crud"].reset();
    document.forms["form-crud"].txtHidden.setAttribute("value","");
    document.getElementById("span-mensaje").textContent="";
    document.forms["form-crud"]["alta-modificacion"].innerHTML='<i class="fa-solid fa-floppy-disk">GUARDAR';
    document.forms["form-crud"].btnEliminar.classList.add("d-none");
    document.forms["form-crud"].btnCancelar.classList.add("d-none");
    ocultarSpinner();

}
export function mostrarMensaje(texto){
    const $span= document.getElementById("span-mensaje");
    $span.innerHTML= "&#10060";
    $span.innerHTML+=texto;
    console.log($span.textContent);
    console.log($span.parentElement);
    
    $span.parentElement.open=true;//DIALOG
    setTimeout(() => {
        $span.parentElement.removeAttribute("open");
        resetFormulario();
    }, 4000);

}
export function modoModificar(){
    document.forms["form-crud"]["alta-modificacion"].innerHTML="MODIFICAR";
    mostrarEliminarYCancelar();
}
function mostrarEliminarYCancelar(){
    document.forms["form-crud"].btnEliminar.classList.remove("d-none");
    document.forms["form-crud"].btnCancelar.classList.remove("d-none");
}

export function cargarSelect(datos){

    const $selec=document.querySelector("select");
  //  alert($selec);
    const frag=document.createDocumentFragment();
    for (let index = 0; index < datos.length; index++) {
        const element = datos[index];
        
        const $option= document.createElement("OPTION");

        $option.setAttribute("value",element);
        $option.textContent=element;
        if(index==0){
            $option.setAttribute("selected",true); 
        }
        frag.appendChild($option);    
           
    }
$selec.appendChild(frag);
}
export function obtenerDelFormularioCrud(){
    const {txtNombre,txtAlias,rangeFuerza,rdoEditorial,selecArmas,txtHidden}=document.forms["form-crud"];
    return {
        "id":parseInt(txtHidden.value.trim()),
        "nombre":txtNombre.value.trim(),
        
        "alias":txtAlias.value.trim(),
        
        "fuerza":parseInt(rangeFuerza.value.trim()),
        
        "editorial":rdoEditorial.value.trim(),
        
        "armas":selecArmas.value.trim(),
        

    }
}
export function crearCheckbox(contenedor,obj){
    const fragmento=document.createDocumentFragment();
    for (const clave of obj) {
        if(clave!="id"){
            //SETEO
            const input=document.createElement("INPUT");
            input.setAttribute("type","checkbox");
            input.setAttribute("value",clave);
            //IMPORTANTE EL MISMO  NOMBRE PARA OBTENER VALORES;
            input.setAttribute("data-mostrar",clave);
            input.setAttribute("name","control-mostrar");
            input.setAttribute("id","control-"+clave);
            input.setAttribute("checked","true");
            const label=document.createElement("LABEL");
            label.setAttribute("for","control-"+clave);
            label.textContent=clave;
            //ESTILO
            // label.classList.add("mx-1","fs-light","form-label");
            // input.classList.add("form-check-input","f1-5");
            //agrego a fragmento
            fragmento.appendChild(input);
            fragmento.appendChild(label);     
        }
    
    }
    contenedor.appendChild(fragmento);
  
}
export function crearOptionesSelect(contenedor,dato){
  const fragmento=document.createDocumentFragment();
  
  const option=document.createElement("option");
  option.setAttribute("value","Todos");
  option.textContent="Todos";
  option.setAttribute("selected","true");
  option.classList.add("option-select");
  fragmento.appendChild(option);

  for (const valor of dato) {
    const option=document.createElement("option");
    option.setAttribute("value",valor);
    option.textContent=valor;
    option.classList.add("option-select");
    
    fragmento.appendChild(option);

  }
  contenedor.appendChild(fragmento);
}
export function cargarResultPromedio(contenedor,resul){
    contenedor.value=resul;
}