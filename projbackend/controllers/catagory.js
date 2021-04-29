const catagory = require("../models/catagory");
const Catagory=require("../models/catagory");

exports.getCatagoryId=(req,res,next,id)=>{

    Catagory.findById(id).exec((err,catagory) => {
        if(err)
        {
            return res.status(400).json({
                error:"Catagory is not found"
            })
        }
        req.catagory=catagory;
        next();
    })

}

exports.createCatagory=(req,res)=>{
    const catagory=new Catagory(req.body);
    catagory.save((err,catagory)=>{
        if(err)
        {
            res.status(400).json({
                error:"not able to save in db"
            })
        }
        res.json({catagory});
    })
}

exports.getCatagory=(req,res)=>{
    return res.json(req.catagory);
  
}
exports.getAllCatagory=(req,res)=>
{
   catagory.find().exec((err,items)=>{
       if(err)
       {
           return res.status(400).json({
               error:"no data is found"
           })
       }
       res.json(items);
   })
}

exports.updateCatagory=(req,res)=>{
    const catagory=req.catagory;
    catagory.name=req.body.name;

    catagory.save((err,updated)=>{
        if(err){
            return res.status(400).json({
            error:"Failed to update Catagory"
        })
    }
    res.json(updated);
})
}

exports.removeCatagory=(req,res)=>
{
    const catagory=req.catagory;
    catagory.remove((err,catagory)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Failed to delete this catagory"
            })
        }
        res.json({
            messege:"Record deleted successfully"
        })
    })
}