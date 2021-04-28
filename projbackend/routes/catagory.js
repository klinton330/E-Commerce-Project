const express=require("express");
const router=express.Router();

const {getCatagoryId,createCatagory,getCatagory,getAllCatagory}=require("../controllers/catagory")
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")
const {getUserById}=require("../controllers/user")


router.param("userId",getUserById);
router.param("catagoryId",getCatagoryId)

//actual routes
router.post("/catagory/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCatagory);
router.get("/catagory/:catagoryId",getCatagory);
router.get("/catagories",getAllCatagory);

module.exports=router;