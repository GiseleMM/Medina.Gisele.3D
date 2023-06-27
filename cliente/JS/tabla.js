
export function crearTabla(array){
    const $tabla=document.createElement("TABLE");
    if(Array.isArray(array) && (array.length>0)){

        
        $tabla.appendChild(crearTHead(array[0]));
        $tabla.appendChild(crearTBody(array));
    }
    $tabla.classList.add("table","table-hover","table-striped","table-dark")
    return $tabla;
}
function crearTBody(array){
    const tbody= document.createElement("TBODY");
    array.forEach(element => {
        const tr=document.createElement("TR");
        const keys=Object.keys(element);
       keys.sort((a,b)=>b.localeCompare(a,'es', { sensitivity: 'base' }));
      for (let index = 0; index < keys.length; index++) {
        const key= keys[index];
        if(key=="id") 
        {
           tr.setAttribute("data-id",element.id);
        }else{
           const td= document.createElement("TD");
           td.textContent=element[key];
           tr.appendChild(td);
        }
   
    
       }
       tbody.appendChild(tr);
        
        
    });
    return tbody;

}

function crearTHead(lista){
    const thead=document.createElement("THEAD");
  
    const tr= document.createElement("TR");
    let claves=Object.keys(lista);
    //ORDENO 
    claves.sort((a,b)=>b.localeCompare(a,'es', { sensitivity: 'base' }));
    for (const iterator of claves) {
        if(iterator.toLowerCase()=="id")continue;

        const th= document.createElement("TH");
        th.textContent=iterator;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
}
export function eliminarTabla(tabla){

    if( tabla instanceof HTMLTableElement){
        while(tabla.hasChildNodes()){
            tabla.removeChild(tabla.firstElementChild);
        }
        tabla.parentElement.removeChild(tabla);
    }
}
export function actualizarTabla(contenedor,dato){
    if(contenedor!=null && dato!=null){
        while(contenedor.hasChildNodes()){
            
         contenedor.removeChild(contenedor.firstChild);
        }
        contenedor.appendChild(crearTabla(dato));
    }
}
export function obtenerElementoSeleccionadoTabla(td,lista){
    let id= td.parentElement.dataset.id;
    console.log(id);
    let indice=lista.findIndex(item=>item.id==id);
    console.log(indice);
    if(indice===-1){return null}
    return lista[indice];

}
