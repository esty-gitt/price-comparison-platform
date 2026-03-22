const mongoose=require("mongoose")
const ShppingListSchama=new mongoose.Schema({
    nameList:{
        type:String,
        trim:true,
        required:true
    },
    productsList:{
        type:[{
            product:{
            type:mongoose.Types.ObjectId,
            ref:'Product',
            required:true  
        },
        quantity:
        {
            type:Number,
            default:1,
        }}
    ],
        
        
        default:[]
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true 
    } , 
},{
    timestamps:true
})
module.exports=mongoose.model('ShppingList',ShppingListSchama)