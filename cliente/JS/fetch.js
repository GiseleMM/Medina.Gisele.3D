

function fetchConfig(opciones) {
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
export async function getFetchAsyn(url) {

    try {

        let res = await fetchConfig({ method: "get", "url": url });
        if (!res.ok) throw Error({ "status": res.status });
        return await res.json();

    } catch (e) {
        console.error(e);
    }
}
async function putFetchAsyn(url, data) {

    try {

        let res = await fetchConfig({ method: "put", "url": url + "/" + data.id, "data": data });
        if (!res.ok) throw Error({ "status": res.status });
        return await res.json();

    } catch (e) {
        console.error(e);
    }
}
async function postFetchAsyn(url) {

    try {

        let res = await fetchConfig({ method: "post", "url": url, "data": data });
        if (!res.ok) throw Error({ "status": res.status });
        return await res.json();

    } catch (e) {
        console.error(e);
    }
}
async function deleteFetchAsyn(url, id) {

    try {

        let res = await fetchConfig({ method: "delete", "url": url + "/" + id });
        if (!res.ok) throw Error({ "status": res.status });
        return await res.json();

    } catch (e) {
        console.error(e);
    }
}
//exito callback
export function getFetchPromise(url, exito) {
    const p = fetchConfig({ method: "get", "url": url });
    p.then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(res);
        }
    })
    .then((data) => exito(data))
    .catch(e => console.error(e.status));
}
export function postFetchPromise(url, exito,alta) {
    const p = fetchConfig({ method: "post", "url": url,"data":alta });
    p.then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(res);
        }
    })
    .then((data) => exito(data))
    .catch(e => console.error(e.status));
}

export function deleteFetchPromise(url,id) {
    const p = fetchConfig({ method: "delete", "url": url+"/"+id });
    p.then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(res);
        }
    })
    .then((data) => exito(data))
    .catch(e => console.error(e.status));
}

export function putFetchPromise(url, exito,modificado) {
    const p = fetchConfig({ method: "put", "url": url+"/"+modificado.id,"data":modificado });
    p.then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(res);
        }
    })
    .then((data) => exito(data))
    .catch(e => console.error(e.status));
}
