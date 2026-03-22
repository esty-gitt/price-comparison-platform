const mongoose=require("mongoose")
const ProductSchama=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    barcode:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    img:{
        type:String
    }

    
},{
    timestamps:true
})
module.exports=mongoose.model('Product',ProductSchama)