
export const getPriceQueryParams=(searchParams,key,value)=>{

    const hasValueParam=searchParams.has(key);

    if(value && hasValueParam){
        searchParams.set(key,value)
    }
    else if(value){
       searchParams.append(key,value)
    }
    else if(hasValueParam){
        searchParams.delete(key)
    }

    return searchParams;

}