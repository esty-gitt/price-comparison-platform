const StoreSchema = require("../models/storeModel")
const getStores = async () => {
    const stores = await StoreSchema.find().lean()
    return stores
}
const getStoreById = async (_id) => {
    const store = await StoreSchemaSchema.findById(_id).lean()
    return store
}
const getStoreByCity = async (cityId) => {
    const stores = await StoreSchema.find({ cityId: cityId }).lean()
    return stores
}
const addStore = async (dataStore) => {
    const newStore = await StoreSchema.create({ name: dataStore.name, cityId: dataStore.cityId })
    return newStore
}
const updateStore = async (dataStore) => {
    let store = await getStoreById(dataStore._id)
    if(!store)
        return undefined
    store.name = dataStore.name
    store.cityId = dataStore.cityId
    const updateStore = await store.save()
    return updateStore
}
const deleteStore=async(_id)=>{
    const store=await StoreSchema.findById(_id)
        if(!store)
            return undefined
        const deletedStore= await store.deleteOne()
        return deletedStore
}
module.exports = { getStores, getStoreByCity, getStoreById, addStore,updateStore,deleteStore }

