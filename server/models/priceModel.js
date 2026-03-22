const mongoose=require("mongoose")
const PriceSchema= new mongoose.Schema({
    price:{
        type:Number,
        required:true,
        
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:true
    },
    storeId:{
        type:mongoose.Types.ObjectId,
        ref:'Store',
        required:true 
    }
},{
    timestamps:true
})
module.exports=mongoose.model('Price',PriceSchema)