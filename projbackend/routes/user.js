const express=require("express");
const router=express.Router();

const User=require("../models/user");
const {getUserById,getUser}=require("../controllers/user");
const {isAuthenticated,isAdmin,isSignedIn}=require("../controllers/auth");


router.param("userid",getUserById);//700

router.get("/user/:userid",isSignedIn,isAuthenticated,getUser);

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