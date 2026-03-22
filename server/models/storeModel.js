const mongoose=require("mongoose")
const StoreSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
},
cityId:{
    type:mongoose.Types.ObjectId,
    ref:'City',
    required:true   
}


},{
       timestamps:true

})
module.exports=mongoose.model('Store',StoreSchema)