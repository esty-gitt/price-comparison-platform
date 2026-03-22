const cityService=require("../services/cityService")
const {cityeValidator}=require("../dataValidator/cityValidator")
const mongoose=require("mongoose")
const getCities=async(req,res)=>{
    const cities=await cityService.getCities()
    res.json(cities)
}
const getCityById=async (req,res)=>{
    const {_id}=req.params
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send("type error")
    const city=await cityService.getcityById(_id)
    if(!city)
        return res.status(404).send("the city not found")
    res.json(city)
}
const addCity=async (req,res)=>{
    const {name}=req.body
    const result= await cityeValidator({name})
    if(result.status!==200)
        return res.status(result.status).send(result.message)
    const newCity=await cityService.addCity({name})
    res.json(newCity)
}
const updateCity=async(req,res)=>{
    const {_id,name}=req.body
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send("type error")
    const  city=await cityService.findById(_id)
    if(!city)
        return res.status(404).send("the city not found")
    const result=await cityeValidator({_id,name})
    if(result.status!==200)
        return res.status(result.status).send(result.message)
    const updateCity=await cityService.updateCity({_id,name})
    res.json(updateCity)
}
const deleteCity=async (req,res)=>{
    const {_id}=req.params
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send("type error")
    const deletedCity=await cityService.deleteCity(_id)
    if(!deletedCity)
        return res.status(404).send("the city not found")
    res.json(deletedCity)
}
module.exports={getCities,getCityById,addCity,updateCity,deleteCity}