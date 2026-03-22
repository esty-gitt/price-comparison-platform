const UserSchema=require("../models/userModel")

const getUsers=async()=>{
    const users=await UserSchema.find().lean()
    return users
}
const getUserById=async (_id)=>{
  
    const user=await UserSchema.findById(_id)

    return(user)
}
const addUser=async (data)=>{
    const newuser=await UserSchema.create({name:data.name,userName:data.userName,email:data.email,password:data.password,permission:data.permission})
    return newuser
}
const updateUser=async(data)=>{

    let user=await getUserById(data._id)
    if(!user)
        return undefined
    user.name=data.name
    user.userName=data.userName
    user.email=data.email
    user.password=data.password
    user.permission=data.permission
    const updateUser=await user.save()
    return updateUser
}
const deleteUser=async (_id)=>{
    const user=await UserSchema.findById(_id)
    if(!user)
        return undefined
    const deletedUser= await user.deleteOne()
    return deletedUser
}
module.exports={getUsers,getUserById,addUser,updateUser,deleteUser}