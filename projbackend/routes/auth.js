//This will act as  a Middleware.

var express = require('express')
var router = express.Router()
//importing signout signup method from controllers
const {signout,signup,signin,isSignedIn}=require('../controllers/auth');
const { check } = require('express-validator');



router.post("/signup",[
    check("name","Name should be atleast 3 character").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","Password should be atleast 4 letters").isLength({min:4})
],signup);

router.post("/signin",[
    check("email","Email is required").isEmail(),
    check("password","password should be empty").isLength({min:4})
],signin);


router.get("/signout",signout);

router.get("/testroute",isSignedIn,(req,res)=>{
   // res.send("A PROTECTED ROUTE")
   res.json(req.auth)
   /*{
    "_id": "607af68718001472a034f3a2",
    "iat": 1618743773
}*/
})

module.exports=router;