import { ocultarSpinner,mostrarSpinner } from "./formulario.js";

function axiosConf(optiones){
mostrarSpinner();
    let {method,url,dato}=optiones;
    console.log(method,url,dato);
   return axios({

        method:method,
        url:url,
        data:JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json'
          }
    })
};
export function getAxiosPromise(url,exito){
const a=axiosConf({method:"get","url":url});
a.then(({data})=>exito(data))
.catch(({response})=>console.log(response.message));
};
export function getAxiosPromiseSinCallbakc(url){
     return new Promise( function(exito,error){
        const get=axiosConf({method:"get","url":url});
       get.then(({data})=>exito(data));
        get.catch(({response})=>error(response.message));
     })
}

export async function  getAsyncAxios(url){
    try {
        const {data} =await axiosConf({method:"get","url":url});
        return data;     
    } catch (error) {
        console.log(error.message);
    }

}
export function postAxiosCallback(url,alta,exito){
    const post=axiosConf({method:"post","url":url,"dato":alta});
    post.then(({data})=>exito(data))
    .catch(({response})=>console.log(response.message));
    
}
export function postAxiosPomise(url,alta){
    return new Promise(function(exito,error){
        const post=axiosConf({method:"post","url":url,"dato":alta});
        post.then(({data})=>exito(data))
        .catch(({response})=>error(response.message));
    })
}
export async function postAsyncAxios(url,alta){
    try {
        const {data}=await axiosConf({method:"post","url":url,"dato":alta});
        return data      
    } catch (error) {
        console.log(error.message);
        
    }
    
}
export function deleteAxiosCallback(url,id,exito){
const del=axiosConf({method:"delete","url":url+"/"+id})    ;
del.then(({data})=>exito(data))
.catch(({response})=>console.error(response.message));
}
export function deleteAxiosPromise(url,id){
    return new Promise((exito,error)=>{
        const del=axiosConf({method:"delete","url":url+"/"+id})    ;
        del.then(({data})=>exito(data))
        .catch(({response})=>error(response.message));
        }       
    )
}
export async function deleteAxiosAsync(url,id){
    try {
        let {data}=await axiosConf({method:"delete","url":url+"/"+id})    ;
        return data;
    } catch (error) {
        console.log(error.message);
    }

}
export function putAxiosCallback(url,modificado,exito){
    const put=axiosConf({method:"put","url":url+"/"+modificado.id,"dato":modificado})  ;
    put.then(({data})=>exito(data))
    .catch(e=>console.log(e))
    .finally(()=>ocultarSpinner());
}
export function putAxiosPromise(url,modificado){
return new Promise((exito,error)=>{
    const put=axiosConf({method:"put","url":url+"/"+modificado.id,"dato":modificado})  ;
    put.then(({data})=>exito(data))
    .catch(e=>error(e.message))
    .finally(()=>ocultarSpinner());

});
  
}
export async function putAxiosAsync(url,modificado){
    try {
        const put= await axiosConf({method:"put","url":url+"/"+modificado.id,"dato":modificado})  ;
        return put.data;
    } catch (error) {
        console.log(error.message);
    }finally{
        ocultarSpinner();
    }
}