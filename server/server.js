require("dotenv").config()
const express = require("express")
const corsOptions = require("./config/corsOptions")
const cors = require("cors")
const connectDB = require("./config/conndb")
const  mongoose = require("mongoose")
const PORT = process.env.PORT || 3333
const app = express()
connectDB()
app.use(express.json())
app.use(cors(corsOptions))
app.use("/api/store",require("./routs/storeRouts"))
app.use("/api/city",require("./routs/cityRouts"))
app.use("/api/product",require("./routs/productRouts"))
app.use("/api/price",require("./routs/priceRouts"))
app.use("/api/user",require("./routs/userRouts"))
app.use("/api/auth",require("./routs/authRouts"))
app.use("/api/shoppingList",require("./routs/shoppingListRouts"))
mongoose.connection.on('err', () => {
    console.log(" connection  error " + err)
})
mongoose.connection.once('open', () => {
    console.log("the connection to the DB is open")
    app.listen(PORT, () => {
        console.log(`the server is running on port ${PORT}`)
    })
})


