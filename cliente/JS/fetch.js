import { mostrarSpinner, ocultarSpinner } from "./formulario.js";

mostrarSpinner();

function fetchConfig(opciones) {
    mostrarSpinner();
    let { method, url, data } = opciones;
    let conf = {
        method: method || "get",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)// EN EL AXIOS ES EN ELDATA
    }
    return fetch(url, conf);
}
export async function getFetchAsync(url) {

    try {

        let res = await fetchConfig({ method: "get", "url": url });
        if (!res.ok) throw Error({ "status": res.status });
        
        return await res.json();


    } catch (e) {
        console.error(e);
    }finally{
        ocultarSpinner();
    }
}
export async function putFetchAsync(url, data) {

    try {

        let res = await fetchConfig({ method: "put", "url": url + "/" + data.id, "data": data });
        if (!res.ok) throw Error({ "status": res.status });
        return await res.json();

    } catch (e) {
        console.error(e);
    }finally{
        ocultarSpinner();
    }
}
export async function postFetchAsync(url,data) {

    try {

        let res = await fetchConfig({ method: "post", "url": url, "data": data });
        if (!res.ok) throw Error({ "status": res.status });
        return await res.json();

    } catch (e) {
        console.error(e);
    }finally{
        ocultarSpinner();
    }
}
export async function deleteFetchAsync(url, id) {

    try {

        let res = await fetchConfig({ method: "delete", "url": url + "/" + id });
        if (!res.ok) throw Error({ "status": res.status });
        return await res.json();

    } catch (e) {
        console.error(e);
    }finally{
        ocultarSpinner();
    }
}
//exito callback
export function getFetchCallback(url, exito) {
    const p = fetchConfig({ method: "get", "url": url });
    p.then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(res);
        }
    })
    .then((data) => exito(data))
    .catch(e => console.error(e.status))
    .finally(()=>ocultarSpinner());
}
export function getFetchPromise(url){
  return new Promise((exito,error)=>{
    const p = fetchConfig({ method:"get", "url": url});
    p.then(res=> res.ok?res.json():Promise.reject(res))
    .then(data=>exito(data))
    .catch(e=>error({"status":e.status}))
    .finally(()=>ocultarSpinner());
  });
}
export function postFetchCallback(url, exito,alta) {
    const p = fetchConfig({ method:"post", "url": url+"/"+alta.id,"data":alta});
    p.then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(res);
        }
    })
    .then((data) => exito(data))
    .catch(e => console.error(e.status))
    .finally(()=>ocultarSpinner());
}
export function postFetchPromise(url,alta){
    return new Promise(function (exito,error){
        const p = fetchConfig({ method:"post", "url": url+"/"+alta.id,"data":alta});
        p.then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                Promise.reject(res);
            }
        })
        .then((data) => exito(data))
        .catch(e => error(e.status))
        .finally(()=>ocultarSpinner());

    })

}
export function deleteFetchPromise(url,id) {
    return new Promise(function(exito,error){

        const p = fetchConfig({ method: "delete", "url": url+"/"+id });
        p.then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                Promise.reject(res);
            }
        })
        .then((data) => exito(data))
        .catch(e => error(e.status))
        .finally(()=>ocultarSpinner());



    });
  
}
export function deleteFetchCallback(url,id,exito){
    const p = fetchConfig({ method: "delete", "url": url+"/"+id });
    p.then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(res);
        }
    })
    .then((data) => exito(data))
    .catch(e => console.error(e.status))
    .finally(()=>ocultarSpinner());


}

export function putFetchCallback(url, exito,modificado) {
    const p = fetchConfig({ method: "put", "url": url+"/"+modificado.id,"data":modificado });
    p.then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(res);
        }
    })
    .then((data) => exito(data))
    .catch(e => console.error(e.status))
    .finally(()=>ocultarSpinner());
}
export function putFetchPromise(url,modificado){
    return new Promise(function(exito,error){
        const p = fetchConfig({ method: "put", "url": url+"/"+modificado.id,"data":modificado });
        p.then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                Promise.reject(res);
            }
        })
        .then((data) => exito(data))
        .catch(e => error(e.status))
        .finally(()=>ocultarSpinner());

    });
}