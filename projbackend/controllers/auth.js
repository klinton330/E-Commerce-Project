//impoting a model which u want to save on Database
const User=require("../models/user");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup=(req,res)=>{
    //Requesting a data from postman tool using body parser
    console.log("REQ BODY:", req.body);//{ name: 'hitesh', lastname: 'ram',email: 'hitesh@gmail.com',password: 'saibaba@330'}
    //Getting validating error message
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()[0].msg});
    }
    //create object for USER
    const user= new User(req.body)
    //Store the object inside database
    user.save((err,user)=>
    {
        if(err)
        {
           return res.status(400).json({
                err:"Data is not stored in Db"
            })
        }
        //res.json(user)
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        })
    })
     /* console.log("REQ BODY:",req.body);
      res.json({"message":"user sign up from controller"})*/
}

exports.signout=(req,res)=>{
    // res.send("This is signout page Success");
    res.clearCookie("token");
    res.json({
        message:"user sign out"
    })

 }

 //Logic for sign-in
 exports.signin=(req,res)=>{
    //res.json({"message":"user sign in to controller"})
    const errors=validationResult(req);
    //Take email and password from body
    const{email,password}=req.body;
    if(!errors.isEmpty())
    {
        return res.status(422).json(
            {
                errors:errors.array()[0].msg
            }
        );
    }

    User.findOne({email},(err,user)=>{
        if(err||!user)
        {
            return res.status(400).json(
                {
                    errors:"user does not exixt"
                })       
       }
       console.log(user);
       console.log(user.autheticate(password));
       if(!user.autheticate(password))
       {
        
        res.status(400).json(
            {
                errors:"Email and password do not match"
            })       
       }
       
       //Create Token
       const token=jwt.sign({_id:user._id},process.env.SECRET)
       //Put token in Cookie
       res.cookie("token",token,{expire:new Date()+9999})
       //Send response to front end
      const {_id,name,email,role}=user;
      return res.json({token,user:{_id,name,email,role}})
    })

 }

//SIGNED-IN------ If we check other profile and see our own profile in application
//AUTHENTICATED-----If we can able to change the profile pic of our account
 

//Protected Routes

exports.isSignedIn=expressJwt({secret:process.env.SECRET,
userProperty:"auth"})


 //Custom Middleware
exports.isAuthenticated=(req,res,next)=>{
    //req.profile-> is coming from frontend and "profile" is identifier we can give any name
    let checker=req.profile && req.auth && req.profile._id==req.auth._id;
    if(!checker)
    {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>
{
    if(req.profile.role===0)
    {
        //regular user
        return res.status(403).json({
            error: "You are not admin"
        })

    }
    next();
}