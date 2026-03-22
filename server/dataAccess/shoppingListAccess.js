const ShoppingListSchema = require("../models/shoppingListModdel")
const getShoppingLists = async () => {
    const ShoppingLists = await ShoppingListSchema.find().lean()
    return ShoppingLists
}
const getShoppingListById = async (_id) => {
    const ShoppingList = await ShoppingListSchema.findById(_id).lean()
    return ShoppingList
}
const getShoppingListByUserId = async (_id) => {
    const ShoppingList = await ShoppingListSchema.find({ userId: _id }).populate({
        path: 'productsList.product',
        select: 'name barcode img'
    }).lean()
    return ShoppingList
}
const addShoppingList = async (dataShoppingList) => {
    const newShoppingList = await ShoppingListSchema.create({ nameList: dataShoppingList.nameList, productsList: dataShoppingList.productsList, userId: dataShoppingList.userId })
    return newShoppingList
}
const updateShoppingList = async (sL) => {
   
    let ShoppingList = await ShoppingListSchema.findById(sL._id)
    if (!ShoppingList)
        return undefined
    ShoppingList.nameList = sL.nameList
    ShoppingList.productsList = sL.productsList
    const updateShoppingList = await ShoppingList.save()
    let populatedShoppingList = await ShoppingListSchema.findById(updateShoppingList._id).populate({
        path: 'productsList.product',
        select: 'name barcode img'
    }).lean();
    return populatedShoppingList
}
const deleteShoppingList = async (_id) => {
    const ShoppingList = await ShoppingListSchema.findById(_id)
    if (!ShoppingList)
        return undefined
    const daletedShoppingList = await ShoppingList.deleteOne()
    const listShopping=await getShoppingListByUserId(ShoppingList.userId)
    return listShopping
}
module.exports = { getShoppingListByUserId, getShoppingLists, getShoppingListById, addShoppingList, updateShoppingList, deleteShoppingList }