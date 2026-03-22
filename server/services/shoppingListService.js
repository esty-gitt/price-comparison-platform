const shoppingListAccess=require("../dataAccess/shoppingListAccess")
const getShoppingLists=async()=>{
    return await shoppingListAccess.getShoppingLists()
}
const getShoppingListById=async (_id)=>{
    return await shoppingListAccess.getShoppingListById(_id)
 }
 const getShoppingListByUserId=async (_id)=>{
    return await shoppingListAccess.getShoppingListByUserId(_id)
 }
 const addShoppingList=async (dataShoppingList)=>{
     return await shoppingListAccess.addShoppingList(dataShoppingList)
 }
 const updateShoppingList=async(dP)=>{
    console.log(dP.userId)
    return await shoppingListAccess.updateShoppingList(dP)
}
const deleteShoppingList=async (_id)=>{
   
    return await shoppingListAccess.deleteShoppingList(_id)
}

module.exports={getShoppingListByUserId,getShoppingLists,getShoppingListById,addShoppingList,updateShoppingList,deleteShoppingList}