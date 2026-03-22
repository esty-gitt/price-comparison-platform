const productAccess=require("../dataAccess/productAccess")
const getProducts=async()=>{
    return await productAccess.getProducts()
}
const getProductById=async (_id)=>{
    return await productAccess.getProductById(_id)
 }
 const addProduct=async (dataProduct)=>{
     return await productAccess.addProduct(dataProduct)
 }
 const updateProduct=async(dP)=>{
    return await productAccess.updateProduct(dP)
}
const deleteProduct=async (_id)=>{
   
    return await productAccess.deleteProduct(_id)
}
const getProductByName=async(name)=>{
    return await productAccess.getProductByName(name)
}
module.exports={getProductByName,getProducts,getProductById,addProduct,updateProduct,deleteProduct}