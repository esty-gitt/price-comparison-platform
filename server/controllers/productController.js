const ProductSchema = require("../models/productModel")
const { productValidator } = require("../dataValidator/productValidator")
const productService = require("../services/productService")
const mongoose = require("mongoose")
const getProducts = async (req, res) => {
    
    const products = await productService.getProducts()
    res.json(products)
}
const getProductById = async (req, res) => {
    const { _id } = req.params
        if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).send("type error")
    const product = await productService.getProductById(_id)
    if (!product)
        return res.status(404).send("the product not found")
    res.json(product)
}
const addProduct = async (req, res) => {
    const { name, barcode, img } = req.body
    const result = await productValidator({ name, barcode, img })
    if (result.status !== 200)
        return res.status(result.status).send(result.message)
    const newProduct = await productService.addProduct({ name, barcode, img })
    res.json(newProduct)
}
const updateProduct = async (req, res) => {
    const { _id, name, barcode, img } = req.body
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send("type error")
    const product = await productService.getProductById(_id)
    if (!product)
        return res.status(404).send("the product not found")
    const result = await productValidator({ _id, name, barcode, img })
    if (result.status !== 200)
        return res.status(result.status).send(result.message)
    const updateProduct = await productService.updateProduct({ _id, name, barcode, img })
    res.json(updateProduct)
}
const deleteProduct = async (req, res) => {
    const { _id } = req.params
    if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).send("type error")
    const daletedProduct = await productService.deleteProduct(_id)
    if (!daletedProduct)
        return res.status(404).send("the product not found")
    res.json(daletedProduct)
}
const getProductByName = async (req, res) => {
    const { name } = req.body
    const products = await productAccess.getProductByName(name)
}
module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct, getProductByName }