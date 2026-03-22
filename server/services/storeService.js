const storeAccess = require("../dataAccess/storeAccess")
const priceAccess = require("../dataAccess/priceAccess")
const getStores = async () => {
    return await storeAccess.getStores()
}
const getStoreById = async (_id) => {
    return await storeAccess.getStoreById(_id)
}
const getListStoreByTotalPrice = async (cityId, items) => {
    const stores = await storeAccess.getStoreByCity(cityId)
    const storesId = stores.map(store => store._id)
    const prices = await priceAccess.getPricesByBarcodes(items, storesId)
    const amount = stores.map((store) => {
        const pricesByStore = prices.filter(price => price.price.storeId.equals(store._id))
        if(items.length!==pricesByStore.length)
            return null;
        const pricesByQuantity = pricesByStore.map((elem) => {
            return elem.price.price*elem.quantity
        })
        const total = pricesByQuantity.reduce((accumulator, price) => accumulator + price, 0)
        const totalStore = { total, storeName: store.name }
        return totalStore
    }
    )
    const filteredAmount = amount.filter((entry) => entry !== null);
    const result = filteredAmount.sort((a, b) => a.total - b.total);
    console.log("result", result)
    return result
}
const addStore = async (dataStore) => {
    return await storeAccess.addStore(dataStore)
}
const updateStore = async (dataStore) => {

    return await storeAccess.updateStore(dataStore)
}
const deleteStore = async (_id) => {
    return await storeAccess.deleteStore(_id)
}
module.exports = { getListStoreByTotalPrice, getStores, getStoreById, addStore, updateStore, deleteStore }