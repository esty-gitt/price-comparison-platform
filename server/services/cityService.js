const cityAccess = require("../dataAccess/cityAccess")
const getCities=async()=>{
    return await cityAccess.getCities()
}
const getcityById=async (_id)=>{
     return await cityAccess.getCityById(_id)
}
const addCity=async (dataCity)=>{
   return await cityAccess.addCity(dataCity)
}
const updateCity=async(dataCity)=>{
   return await cityAccess.updateCity(dataCity)
}
const deleteCity=async (_id)=>{
    return await cityAccess.deleteCity(_id)
    
}
module.exports={getCities,getcityById,addCity,updateCity,deleteCity}

