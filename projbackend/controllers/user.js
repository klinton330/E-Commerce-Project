const User=require("../models/user");

//Exports the methods
exports.getUserById=(req,res,next,id)=>
{
    User.findById(id).exec((err,use)=>{
        if(err||!use)
        {
          return res.status(400).json({
              error:"No user found in database";
          })
        }
        //req.profile gives all details
        req.profile=use;
        next();
    })
};

exports.getUser=(req,res)=>{
    return res.json(req.profile)
}