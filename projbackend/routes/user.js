const express=require("express");
const router=express.Router();

const User=require("../models/user");
const {getUserById,getUser,getAllUser,updateUser,userPurchaseList}=require("../controllers/user");
const {isAuthenticated,isAdmin,isSignedIn}=require("../controllers/auth");


router.param("userid",getUserById);//700

//Getting the user detail based on id
router.get("/user/:userid",isSignedIn,isAuthenticated,getUser);

router.put("/user/:userid",isSignedIn,isAuthenticated,updateUser)
router.get("/orders/user/:userid",isSignedIn,isAuthenticated,userPurchaseList)


//.get("/users",getAllUser);

/*Note
FLOW OF CONTROL
--------------
1.router.param("userid",getUserById);
2.isSignedIn
3.isAuthenticated
4.getUser
*/
//isSignedIn-middleware
//isAuthenticated-middleware
//getUser-user profile in JSON response

module.exports=router;