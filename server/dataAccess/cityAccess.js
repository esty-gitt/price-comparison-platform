const CitySchema=require("../models/cityModel")
const getCities=async()=>{
    const cities=await CitySchema.find().lean()
    return cities
}
const getCityById=async (_id)=>{
    const city=await CitySchema.findById(_id).lean()
   return city
}
const addCity=async (dataCity)=>{
    const newCity=await CitySchema.create({name:dataCity.name})
    return newCity
}
const updateCity=async(dataCity)=>{
    let city=await CitySchema.findById(_id)
    if(!city)
        return undefined   
    city.name=dataCity.name
    const updateCity=await city.save()
    return updateCity
}
const deleteCity=async (_id)=>{
    const city=await CitySchema.findById(_id)
    if(!city)
        return undefined
    const deletedCity= await city.deleteOne()
   return deletedCity
}
module.exports={getCities,getCityById,addCity,updateCity,deleteCity}