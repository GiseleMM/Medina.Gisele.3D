function axionConf(optiones){
    let {method,url,dato}=optiones;
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
const a=axionConf({method:"get","url":url});
a.then(({data})=>exito(data))
.catch(({response})=>console.log(response.message));
};

export async function  getAsyncAxios(url){
    try {
        const {data} =await axionConf({method:"get","url":url});     
    } catch (error) {
        console.log(error.message);
    }

}
export function postAxiosPromise(url,alta,exito){
    const post=axionConf({method:"post","url":url,"dato":alta});
    post.then(({data})=>exito(data))
    .catch(({response})=>console.log(response.message));
    
}
export async function postAsyncAxios(url,alta){
    try {
        const {data}=await axionConf({method:"post","url":url,"dato":alta});      
    } catch (error) {
        console.log(error.message);
        
    }
  
    
    
}