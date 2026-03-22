const UserAccess=require("../dataAccess/userAccess")

const getUsers=async()=>{
    const users=await UserAccess.getUsers()
    return users
}
const getUserById=async (_id)=>{
  
    const user=await UserAccess.getUserById(_id)
    return(user)
}
const addUser=async (data)=>{
    const newuser=await UserAccess.addUser(data)
    return newuser
}
const updateUser=async(data)=>{
   
    const updateUser=await UserAccess.updateUser(data)
    return updateUser
}
const deleteUser=async (_id)=>{
    const deletedUser= await UserAccess.deleteUser(_id)
    return deletedUser
}
module.exports={getUsers,getUserById,addUser,updateUser,deleteUser}