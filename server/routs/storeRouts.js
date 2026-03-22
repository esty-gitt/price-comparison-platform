const storeController=require("../controllers/storeController")
const  {verifyJWT}=require("../middleware/verifyJWT")
const {isAdmin}=require("../middleware/isAdmin")
const express=require("express")
const router=express.Router()
//router.use(verifyJWT)
router.get("/",storeController.getStore)
router.get("/_id",storeController.getStoreById)
router.post("/ListStoreByPrice",storeController.getListStoreByTotalPrice)
router.post("/",/*isAdmin,*/storeController.addStore)
router.put("/",isAdmin,storeController.updateStore)
router.delete("/:_id",isAdmin,storeController.deleteStore)
module.exports=router

