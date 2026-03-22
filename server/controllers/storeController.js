const  StoreSchema=require("../models/storeModel")
const {storeValidator}=require("../dataValidator/storeValidatore")
const mongoose=require("mongoose")
const storeService=require("../services/storeService")

const getStore=async(req,res)=>{
    const stores=await storeService.getStores()
    res.json(stores)
}
const getStoreById=async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send("type error")
    const {_id}=req.params
    const store=await storeService.getStoreById(_id)
    if(!store)
        return res.status(404).send("the store not found")
    res.json(store)
}
const addStore=async (req,res)=>{
    const {name,cityId}=req.body
    const result= await storeValidator({name,cityId})
    if(result.status!==200)
        return res.status(result.status).send(result.message)
    const newStore=await storeService.addStore({name,cityId})
    res.json(newStore)
}
const updateStore=async(req,res)=>{
    const {_id,name,cityId}=req.body
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send("type error")
    const store=await storeService.findById(_id)
    if(!store)
        return res.status(404).send("the store not found")
    const result=await storeValidator({_id,name,cityId})
    if(result.status!==200)
        return res.status(result.status).send(result.message)
    const updateStore=await storeService.updateStore({_id,name,cityId})
    res.json(updateStore)
}
const deleteStore=async (req,res)=>{
    const {_id}=req.params
    if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).send("type error")
    const deletedStore=await storeService.deleteStore(_id)
    if(!deletedStore)
        return res.status(404).send("the stoer not found")
    res.json(deletedStore)
}
const getListStoreByTotalPrice = async (req, res) => {
    const { cityId, items } = req.body
    //validatethe parametrs
    const amount=  await storeService.getListStoreByTotalPrice(cityId, items)
    console.log(amount,"amount")
    res.json(amount)
}

module.exports={getStore,getStoreById,addStore,updateStore,deleteStore,getListStoreByTotalPrice}