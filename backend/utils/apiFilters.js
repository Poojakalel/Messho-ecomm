class APIFilters{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
    }

    search()
    {
       const keyword=this.queryStr.keyword ? {
        name:{

            $regex:this.queryStr.keyword,
            $options:'i'

        },
       }:{}

       this.query=this.query.find({...keyword})
       return this;
    }

   filters(){

    // fields to remove

    const queryCopy={...this.queryStr}
    const fieldsToRemove=["keyword","page"];
    fieldsToRemove.forEach((el)=>delete queryCopy[el])

    // advanced filter for price,rating

    //  console.log(queryCopy)

     let queryStr=JSON.stringify(queryCopy)
     queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(match)=> `$${match}`)
    //  console.log(queryStr)

    this.query=this.query.find(JSON.parse(queryStr))
    return this;
   }

   pagination(resPerPage){
    const currentPage=Number(this.queryStr.page)||1
    const skip=resPerPage * (currentPage-1)

    // suppose if i have 10 result per page i want go to page no 2 then first skip 10  result 2-1=1 so 1*10=10 so that we have skip first 10 result

    this.query=this.query.limit(resPerPage).skip(skip)
    return this;
   }
}

export default APIFilters