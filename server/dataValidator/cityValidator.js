const CitySchema=require("../models/cityModel")
const cityeValidator=async(data)=>{
    if(!data.name)
        return {status:400, message:"the  city name is required"}
    if(data.name.trim()==="")
        return {status:400, message:"city name is required"}
        const name=await CitySchema.findOne({ _id: { $ne:data. _id },name:data.name})
        if(name)
            return {status:400, message:"city name must be unique"} 
    return {status:200, message:"success"}
}
module.exports={cityeValidator}