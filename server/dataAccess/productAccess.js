const ProductSchema=require("../models/productModel")
const getProducts=async()=>{
    const products=await ProductSchema.find().lean()
    return products
}
const getProductById=async (_id)=>{
    const product=await ProductSchema.findById(_id).lean()
    return product
 }
 const addProduct=async (dataProduct)=>{

     const newProduct=await ProductSchema.create({name:dataProduct.name,barcode:dataProduct.barcode,img:dataProduct.img})
     return newProduct
 }
 const updateProduct=async(dP)=>{
    let product=await ProductSchema.findById(dP._id)
    if(!product)
        return undefined
    product.name=dP.name
    product.barcode=dP.barcode
    product.img=dP.img
    const updateProduct=await product.save()
    return updateProduct
}
const deleteProduct=async (_id)=>{
    const product=await ProductSchema.findById(_id)
    if(!product)
        return undefined
    const daletedProduct= await product.deleteOne()
    return daletedProduct
}
const getProductByName=async(name)=>{
    const products=await ProductSchema.find({name:{ $regex: partialName, $options: 'i'}})
    return products
}
module.exports={getProductByName,getProducts,getProductById,addProduct,updateProduct,deleteProduct}