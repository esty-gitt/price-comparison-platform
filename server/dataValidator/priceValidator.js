const ProductSchema = require("../models/productModel")
const StoreSchema = require("../models/storeModel")
const mongoose = require("mongoose")
const priceValidator = async (data) => {
    if (!data.price)
        return { status: 400, message: "the  city name is required" }
    if (! Number(data.price))
        return { status: 400, message: "invalid value" }
    if (!data.productId||!data.storeId)
        return { status: 400, message: "product and store id is required" }
    if (!mongoose.Types.ObjectId.isValid(data.productId)||!mongoose.Types.ObjectId.isValid(data.storeId))
        return { status: 400, message: "type error" }
    const product= await ProductSchema.find({_id:data.productId/*,barcode:data.productId.barcode*/})
    const store= await StoreSchema.find({_id:data.storeId/*,cityId:data.storeId.cityId*/})
    if (!product||!store)
        return { status: 404, message: "the product or the store not found" }
    return { status: 200, message: "success" }
}
module.exports = { priceValidator }