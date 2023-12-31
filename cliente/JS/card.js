import XHR, { } from "./xhr.js";
import { getFetchCallback } from "./fetch.js";


const API = "http://localhost:3000/superHeroes";

const $contenedorCards = document.getElementById("container-cards");
// let data = [];
//sin spinner
// XHR({method:"get",url:API,exito:crearTarjetas,error:(e)=>console.log(e)});
// XHR.get(API,(res)=>{ 
//     console.log(res);
//     data=res;

//     crearTarjetas(data,contenedorCards);

// });
getFetchCallback(API, (res) => crearTarjetas(res, $contenedorCards));


function crearTarjetas(datos, contenedor) {


  if (Array.isArray(datos) && datos.length > 0) {
    //creo fragmento
    const frag = document.createDocumentFragment();

    datos.forEach(element => {
      const divCol = document.createElement("DIV");
      divCol.classList.add("col", "m-2");

      const article = document.createElement("ARTICLE");
      article.classList.add("card", "bg-transparent", "rounded", "border-0");

      const divheader = document.createElement("DIV");
      divheader.classList.add("card-header");
      divheader.innerHTML = `<h2 class="text-capitalize">${element.nombre}</h2>`;


      const divBody = document.createElement("DIV");
      divBody.classList.add("card-body");
      const divTitle = document.createElement("DIV");
      divTitle.innerHTML = `<h3 class="text-muted text-capitalize">${element.alias}</h2>`;

      const ul = document.createElement("UL");
      ul.classList.add("list-group");
      ul.innerHTML = `<li class="list-group-item"><i class="fa-solid fa-heart-pulse"></i> Fuerza ${element.fuerza}</li>`;
      ul.innerHTML += `<li class="list-group-item"><i class="fa-solid fa-robot"></i>Arma ${element.armas}</li>`;
      ul.innerHTML += `<li class="list-group-item">Editorial ${element.editorial}</li>`;
      article.appendChild(divheader); //agrego el header al article
      divBody.appendChild(divTitle); // agrego el titulo al body
      divBody.appendChild(ul); //agrego el ul al body 
      article.appendChild(divBody);//agrego elbody al article
      divCol.appendChild(article); // agrego el article al div col
      frag.appendChild(divCol);//agrego al fragmento todo



    });
    contenedor.appendChild(frag);

  }
}