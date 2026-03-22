const mongoose=require("mongoose")
const connectDB=async()=>{
    try
    {
        console.log("ff")
        await mongoose.connect(process.env.uriDB)
    }
    catch(error)
    {
        console.log(`error in the connection to the DB`+error)
    }
}
module.exports=connectDB