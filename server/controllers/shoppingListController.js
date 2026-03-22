const { shoppingListValidator } = require("../dataValidator/shoppingListValidator")
const ShoppingListService = require("../services/shoppingListService")
const mongoose = require("mongoose")
const getShoppingLists = async (req, res) => {
    const ShppingLists = await ShoppingListService.getShoppingLists();
    res.json(ShppingLists)
}
const getShoppingListById = async (req, res) => {
    const { _id } = req.params
        if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).send("type error")
    const ShppingList = await ShoppingListService.getShoppingListById(_id)
    if (!ShppingList)   
        return res.status(404).send("the ShppingList not found")
    res.json(ShppingList)
}
const getShoppingListUserId = async (req, res) => {
    const { _id } = req.params
        if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).send("type error")
    const ShppingList = await ShoppingListService.getShoppingListByUserId(_id)
    if (!ShppingList)   
        return res.status(404).send("the ShppingList not found")
    res.json(ShppingList)
}
const addShoppingList = async (req, res) => {
    const { nameList, productsList, userId } = req.body
    console.log(productsList)
    const result = await shoppingListValidator({ nameList, productsList, userId })
    if (result.status !== 200)
        return res.status(result.status).send(result.message)
    const newShppingList = await ShoppingListService.addShoppingList({nameList, productsList, userId })
    res.json(newShppingList)
}
const updateShoppingList = async (req, res) => {
    const { _id, nameList, productsList, userId } = req.body
    console.log(productsList)
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send("type error")
    const ShppingList = await ShoppingListService.getShoppingListById(_id)
    if (!ShppingList)
        return res.status(404).send("the ShppingList not found")
    const result = await shoppingListValidator({ _id, nameList, productsList, userId  })
    if (result.status !== 200)
        return res.status(result.status).send(result.message)
    const updateShppingList = await ShoppingListService.updateShoppingList({ _id, nameList, productsList, userId })
    res.json(updateShppingList)
}
const deleteShoppingList = async (req, res) => {
    const { _id } = req.params
    if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).send("type error")
    const daletedShppingList = await ShoppingListService.deleteShoppingList(_id)
    if (!daletedShppingList)
        return res.status(404).send("the ShppingList not found")
    res.json(daletedShppingList)
}

module.exports = { getShoppingLists, getShoppingListById, addShoppingList, updateShoppingList, deleteShoppingList,getShoppingListUserId }