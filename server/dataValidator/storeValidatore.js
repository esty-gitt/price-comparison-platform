const citySchema=require("../models/cityModel")
const mongoose=require("mongoose")
const storeValidator=async(data)=>{
    if(!mongoose.Types.ObjectId.isValid(data.cityId))
        return {status:400, message:"type error"} 
    const city=await citySchema.findById(data.cityId)
    if(!city)
        return {status:404, message:"the city not found"}
    if(!data.name)
        return {status:400, message:"store name is required"}
    if(data.name.trim()==="")
        return {status:400, message:"store name is required"}
    return {status:200, message:"success"}
}
module.exports={storeValidator}