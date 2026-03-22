const userService=require("../services/userService")
const {userValidator}=require("../dataValidator/userValidator")
const bcrypt = require("bcrypt")
const mongoose=require("mongoose")
const getUsers=async(req,res)=>{
    const users=await userService.getUsers()
    res.json(users)
}
const getUserById=async (req,res)=>{
    const {_id}=req.params
    if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).send("type error")
    const user=await userService.getUserById(_id)
    if(!user)
        return res.status(404).send("the user not found")
    res.json(user)
}
const addUser=async (req,res)=>{
    const data=req.body
    console.log("hii",data.password)

    const result= await userValidator(data)
    if(result.status!==200)
        return res.status(result.status).send(result.message)
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newuser=await userService.addUser({name:data.name,userName:data.userName,email:data.email,password:hashedPassword,permission:data.permission})
    //const newuser=await userService.addUser(data)

    res.json(newuser)
}
const updateUser=async(req,res)=>{
    const {_id,name,userName,email,password,permission}=req.body
    console.log("uuuuu")
    console.log(permission)
    console.log(name,userName,password)
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).send("type error")
    let user=await userService.findById(_id)
    if(!user)
        return res.status(404).send("the user not found")
    const result=await userValidator({_id,name,userName,email,password,permission})
    if(result.status!==200)
        return res.status(result.status).send(result.message)
    const updateUser=await user.updateUser( {_id,name,userName,email,password,permission})
    res.json(updateUser)
}
const deleteUser=async (req,res)=>{
    const {_id}=req.params
    if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).send("type error")
    const deletedUser= await userService.deleteUser(_id)
    if(!deletedUser)
        return res.status(404).send("the user not found")
    res.json(deletedUser)
}
module.exports={getUsers,getUserById,addUser,updateUser,deleteUser}