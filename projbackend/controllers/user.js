const User=require("../models/user");

const Order=require("../models/order");

//Exports the methods
//Getting data by ID
exports.getUserById=(req,res,next,id)=>
{
    User.findById(id).exec((err,use)=>{
        if(err||!use)
        {
          return res.status(400).json({
              error:"No user found in database"
          })
        }
        //req.profile gives all details
        req.profile=use;
        next();
    })
};


exports.getUser=(req,res)=>{
    req.profile.salt="";
    req.profile.encry_password="";
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile)
}

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true, userFindAndModify:false},
        (err,user)=>{
            if(err||!user){
                return res.status(400).json({
                    error:"user is not Autherized"
                })

            }
            //user.profile.salt=undefined;
            //user.profile.encry_password=undefined;
            res.json(user);
            
        }
    )
}

/*
PROCEDURE TO TEST UPDATE PART

1.Sign in first
2.Copy the token
3.paste that token on update url in Atentication field
4.body-> raw -put your changes-select put
5.Than send
6.Data will be updated
*/

exports.userPurchaseList=(req,res)=>
{
    Order.find({user:req.profile._id}).populate("user","_id name").exec((err,ord)=>
    {
        if(err)
        {
            return res.status(400).json({
                error:"No order in this account"
            })
        }
        return res.json(ord);
    });
};

//Middleware
exports.pushOrderInPurchaseList=(req,res,next)=>{
    let purchase=[];
    //Products=[o1,o2,o3]
    req.body.order.products.forEach(product=>{
        purchase.push({
            _id: product.id,
            names:product.name,
            description:product.description,
            catagory:product.catagory,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id

        
        })
      })

      User.findOneAndUpdate(
          {_id:req.profile._id},
          {$push:{purchase:purchase}},
          {new:true},
          (err,purchase)=>{
              if(err){
                  return res.status(400).json({
                      error:"unable to save purchase list"
                  })
              }
              next();
          }
          )
        }



/*exports.getAllUser=(req,res,next)=>
{
    User.find().exec((err,users)=>{
        if(err||!users)
        {
            res.status(400).json({
                error:"No data"
            })
        }
        res.json(users);
    })
}*/