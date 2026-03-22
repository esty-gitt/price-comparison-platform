const priceAccess = require("../dataAccess/priceAccess")
const getPricesByBarcodes=async(barcodes,storeName)=>{
    return await priceAccess.getPricesByBarcodes() 
}
const getPrices=async()=>{
    return await priceAccess.getPrices()
}
const getPriceById=async (_id)=>{
     return await priceAccess.getPriceById(_id)
}
const addPrice=async (dataPrice)=>{
   return await priceAccess.addPrice(dataPrice)
}
const updatePrice=async(dataPrice)=>{
   return await priceAccess.updatePrice(dataPrice)
}
const deletePrice=async (_id)=>{
    return await priceAccess.deletePrice(_id)
    
}
module.exports={getPricesByBarcodes,getPrices,getPriceById,addPrice,updatePrice,deletePrice}

