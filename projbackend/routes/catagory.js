const express=require("express");
const router=express.Router();

const {getCatagoryId,createCatagory,getCatagory,getAllCatagory,updateCatagory,removeCatagory}=require("../controllers/catagory")
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")
const {getUserById}=require("../controllers/user")


router.param("userId",getUserById);
router.param("catagoryId",getCatagoryId)

//actual routes
router.post("/catagory/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCatagory);

//read
router.get("/catagory/:catagoryId",getCatagory);
router.get("/catagories",getAllCatagory);

//update
router.put("/catagory/:catagoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCatagory);



//delete
router.delete("/catagory/:catagoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCatagory);


module.exports=router;