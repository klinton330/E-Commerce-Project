const mongoose=require("mongoose");
const catagory = require("./catagory");
const{ObjectId}=mongoose.Schema;

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
        },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32
    },
    //Linking Catagory
    catagory:
    {
      type:ObjectId,
      ref:"Catagory",
      required:true
    },
    stock:
    {
        type:Number
    },
    sold:
    {
        type:Number,
        default:0
    },
    photo:
    {
        data:Buffer,
        contentType:String
    }

},{timestamps:true})


module.exports=mongoose.model("Product",productSchema)