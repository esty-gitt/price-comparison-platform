const priceService = require("../services/priceService")
const { priceValidator } = require("../dataValidator/priceValidator")
const mongoose = require("mongoose")
const getPrices = async (req, res) => {
    const prices = await priceService.getPrices()
    res.json(prices)
}
const getPriceById = async (req, res) => {
    const { _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send("type error")
    const price = await priceService.getPriceById(_id)
    if (!price)
        return res.status(404).send("the price not found")
    res.json(price)
}
const addPrice = async (req, res) => {
    const { price, productId, storeId } = req.body
    const result = await priceValidator({ price, productId, storeId })
    if (result.status !== 200)
        return res.status(result.status).send(result.message)
    const newPrice = await priceService.addPrice({ price, productId, storeId })
    res.json(newPrice)
}
const updatePrice = async (req, res) => {
    const { _id, price, productId, storeId } = req.body
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send("type error")
    const changePrice = await priceService.getPriceById(_id)
    if (!changePrice)
        return res.status(404).send("the price not found")
    const result = await priceValidator({ _id, price, productId, storeId })
    if (result.status !== 200)
        return res.status(result.status).send(result.message)
    const updatePrice = await priceService.updatePrice({ _id, price, productId, storeId })
    res.json(updatePrice)
}
const deletePrice = async (req, res) => {
    const { _id } = req.params
    if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).send("type error")
    const daletedPrice = await priceService.deletePrice(_id)
    if (!daletedPrice)
        return res.status(404).send("the price not found")
    res.json(daletedPrice)
}
module.exports = { getPrices, getPriceById, addPrice, updatePrice, deletePrice }