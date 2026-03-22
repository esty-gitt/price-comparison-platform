const PriceSchema = require("../models/priceModel")
const getPricesByBarcodes=async(items,stores)=>{
      const productsId = items.map((item) => {
        return item.product._id
    })
    const prices = await PriceSchema.find({
        productId: { $in: productsId },
        storeId: { $in: stores }
    })
const priceProduct = [];
items.forEach(item => {
    const s = prices.filter(p => p.productId.toString() === item.product._id);
    s.forEach(priceObj => {
        priceProduct.push({ price: priceObj, quantity: item.quantity });
    });
});
    return priceProduct
}
const getPrices=async()=>{
    const prices=await PriceSchema.find().populate([{
        path: 'productId',
        select: 'name'},
        {path:'storeId',
        select:'name'}
    ]).lean()
    return prices
}
const getPriceById=async (_id)=>{
    const price=await PriceSchema.findById(_id).populate([{
        path: 'productId',
        select: 'name'},
        {path:'storeId',
        select:'name'}
    ]).lean()
    return price
}
const addPrice=async (dataPrice)=>{
    const newPrice1=await PriceSchema.create({price:dataPrice.price,productId:dataPrice.productId,storeId:dataPrice.storeId})
    const newPrice=await getPriceById(newPrice1._id)
    return newPrice
}
const updatePrice=async(dataPrice)=>{
    let changePrice=await PriceSchema.findById(dataPrice._id)
    if(!changePrice)
        return undefined
    changePrice.price=dataPrice.price
    changePrice.productId=dataPrice.productId
    changePrice.storeId=dataPrice.storeId
    const updatePrice=await changePrice.save()
    const updatePrices=await PriceSchema.find().populate([{
        path: 'productId',
        select: 'name'},
        {path:'storeId',
        select:'name'}
    ]).lean().lean()
    console.log(updatePrices)
    return updatePrices
}
const deletePrice=async (_id)=>{
    const price=await PriceSchema.findById(_id)
    console.log(price)
    if(!price)
        return undefined
    const daletedPrice= await price.deleteOne()
    const s=await PriceSchema.find().lean()
   return s
}
module.exports={getPricesByBarcodes,getPrices,getPriceById,addPrice,updatePrice,deletePrice}

