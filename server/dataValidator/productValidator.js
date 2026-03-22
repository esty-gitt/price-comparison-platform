const ProductSchema = require("../models/productModel")
const mongoose = require("mongoose")
const productValidator = async (data) => {
    if (!data.barcode)
        return { status: 400, message: "barcode is required" }
    if (data.barcode.trim() === "")
        return { status: 400, message: "barcode is required" }
    const barcode = await ProductSchema.findOne({ _id: { $ne: data._id }, barcode: data.barcode })
    console.log(barcode)
    if (barcode)
        return { status: 400, message: "barcode  must be unique" }
    return { status: 200, message: "success" }
}

module.exports = { productValidator }