const UserSchema = require("../models/userModel")
const bcrypt = require("bcrypt")
const userValidator = require("../dataValidator/userValidator")
//const userService = require("../services/userService")
const jwt = require("jsonwebtoken")
const login = async (req, res) => {
    const { userName, password } = req.body
    const result = await userValidator.loginValidator({ userName, password })
    if (result.status !== 200) {
        return res.status(result.status).send(result.message)
    }
    const user = await UserSchema.findOne({ userName }).lean()
    if (!user)
        return  res.status(401).json({ message: 'Unauthorized' })
    const isMatch = await bcrypt.compare(password, user.password)
    // if (!isMatch) {
    //     return res.status(401).json({ message: 'Unauthorized' })
    // }
    const userInfo = { _id: user._id, name: user.name, userName: user.userName, permission: user.permission, email: user.email }
    const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: token, userInfo })
}
const register = async (req, res) => {
    const { name, userName, email, password } = req.body
    const result = await userValidator.userValidator({ name, userName, email, password })
    if (result.status !== 200) {
        return res.status(result.status).send(result.message)
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = UserSchema.create({ name, userName, email, password: hashedPassword })
    if (user) { return res.status(201).json({ message: `New user ${user.username} created`, user: { userName, password } }) }
    else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}
module.exports = { login, register }


