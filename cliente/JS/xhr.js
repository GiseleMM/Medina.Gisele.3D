import { mostrarSpinner, ocultarSpinner } from "./formulario.js";


export function XHR(optiones){
let {method,url,dato,exito,error}=optiones;
// mostrarSpinner();
    const xhr=new XMLHttpRequest();
    xhr.open(method,url);
    xhr.setRequestHeader("Content-type","application/json;charset=UTF-8");
    xhr.addEventListener("readystatechange",()=>{
        if(xhr.readyState==4){
            if(xhr.status>=200 && xhr.status<300){
                
                exito(JSON.parse(xhr.responseText));
               
            }else{
                error({"status":xhr.status,"statusText":xhr.statusText});

            }
            // ocultarSpinner();
        }
    });
    xhr.send(JSON.stringify(dato));
}
export function XhrPromise(optiones){
  mostrarSpinner();
    let {method,url,dato}=optiones;
    return new Promise(function(resolve,reject){

        const xhr=new XMLHttpRequest();
        xhr.open(method,url);
        xhr.setRequestHeader("Content-type","application/json;charset=UTF-8");

        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState==4){
                if(xhr.status>=200 && xhr.status<300){
                    
                    resolve(JSON.parse(responseText));
                   
                }else{
                    reject({"status":xhr.status,"statusText":xhr.statusText});
    
                }
                ocultarSpinner();
            }
        });
        

        xhr.send(JSON.stringify(dato));
    });
    


    };
  

function xhrConf(optiones){
    let {method,url}=optiones;
    const xhr=new XMLHttpRequest();
    xhr.open(method,url);
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
    return xhr;
}
const get = (url, handlerExito) => {
  mostrarSpinner();
    let xhr =xhrConf({ "method": "get", "url": url });
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          handlerExito(JSON.parse(xhr.responseText))
  
        } else {
          console.error({ "status": xhr.status, "statusText": xhr.statusText, "f": "funcion get a " + url })
        }
        ocultarSpinner();
      }
    })
    xhr.send();
  }
  
  const getPromise = (url) => {
    return new Promise(function (resolve, reject) {
      const xhr =xhrConf({ method: "get", "url": url });
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject({ "status": xhr.status, "statusText": xhr.statusText, "f": "funcion get a " + url });
          }
        }
      });
      xhr.send();
    })
  
  }
  const post = (url, dato, handlerExito) => {
    const xhr =xhrConf({ method: "post", "url": url });
    xhr.addEventListener("readystatechange", () => {
  
      if (xhr.readyState == 4) {
  
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log("ESTOY EN STATUS ");
          handlerExito(JSON.parse(xhr.responseText));
        } else {
          console.error({ "status": xhr.status, "statusText": xhr.statusText });
        }
      }
    })
    xhr.send(JSON.stringify(dato));
  
  }
  
  const postPromise = (url, dato) => {
    return new Promise(function (exito, fracaso) {
      const xhr =xhrConf({ method: "post", "url": url });
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            exito(JSON.parse(xhr.responseText));
          } else {
            fracaso({ "status": xhr.status, "statusText": xhr.statusText })
          }
        }
      })
      xhr.send(JSON.stringify(dato));
    });
  
  }
  const deleteXhr = (url, id, handler) => {
    let xhr =xhrConf({ method: "delete", "url": url + "/" + id });
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          if (xhr.responseText == "{}") {
            handler(true);
          } {
            handler(false);
          }
        }
      }
    });
    xhr.send();
  
  }
  const deletePromise = (url, id) => {
    return new Promise(function (exito, fracaso) {
      let xhr =xhrConf({ method: "delete", "url": url + "/" + id });
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            exito(true);
          } {
            fracaso(false);
          }
  
        }
      });
      xhr.send();
    });
  }
  const put = (url, dato, handlerExito) => {
    mostrarSpinner();
    let xhr =xhrConf({ method: "put", "url": url + "/" + dato.id });
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          handlerExito(JSON.parse(xhr.responseText));
        } else {
          console.log({ "status": xhr.status });
  
        }
        ocultarSpinner();
      }
    })
    xhr.send(JSON.stringify(dato));
  
  }
  
export default{
    get,
    getPromise,
    post,
    postPromise,
    put,
    deleteXhr,
    deletePromise
}
  