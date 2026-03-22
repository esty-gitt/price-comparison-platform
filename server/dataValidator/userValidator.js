const UserSchema=require("../models/userModel")
const userValidator=async(data)=>{
    if(!data.name||!data.userName||!data.password)
        return {status:400, message:"the name & the userName password is required"}
    if(data.name.trim()===""||data.userName.trim()==="")
        return {status:400, message:"user name is required"}
        const user=await UserSchema.findOne({ _id: { $ne:data. _id },userName:data.userName})
        if(user)
            return {status:400, message:"user name must be unique"} 
    return {status:200, message:"success"}
}
const loginValidator=async(data)=>{
    if(!data.userName||!data.password)
        return {status:400, message:"the user name & the password is required"}
  
    return {status:200, message:"success"}
}


module.exports={userValidator,loginValidator}