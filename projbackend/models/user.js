//Importing the mongoose package
var mongoose=require('mongoose');
const crypto=require('crypto');
const uuidv1=require('uuid/v1');//gives unique id
//Initialize user schema
const userSchema = new mongoose.Schema({

    //declaring fields
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        required:false,
        maxlength:32,
        trim:true
    },
    email:
    {
        type:String,
        required:true,
        trim:true,
        maxlength:35
    },
    userinfo:
    {
        type:String,
        trim:true
    },
    
    encry_password:
    {
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchase:
    {
        type:Array,
        default:[]
    }
},{timestamps:true});

userSchema.virtual("password")
    .set(function(password){
        this._password=password
        this.salt=uuidv1();//3e07cc40-76c7-11eb-bf98-216a7375295c
        this.encry_password=this.securePassword(password);
        //5b88ae1e3bac5543f913d5c01692291082e7c7d0569ec1fca87e750b13f68a59

    })
    .get(function(){
        return this.password;
    })

    userSchema.methods={
    
    autheticate:function(plainpassword)
    {
        return this.securePassword(plainpassword)===this.encry_password
    },
    securePassword:function(plainpassword)
    {
        if(!plainpassword) return "";
        try
        {
           return crypto.createHmac('sha256',this.salt).update(plainpassword).digest('hex')
           //5b88ae1e3bac5543f913d5c01692291082e7c7d0569ec1fca87e750b13f68a59
        }
        catch(err)
        {
            return "";
        }
    }
}
//Exporting the schemal
module.exports=mongoose.model("User",userSchema);





 
 
 
 
 
 
  /* ##################REF IT FOR VIRTUAL#######################

  // 
  
  const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String
  });
 
  
  Create a virtual property `fullName` with a getter and setter.
  userSchema.virtual('fullName').
    get(function() { return `${this.firstName} ${this.lastName}`; }).
    set(function(v) {
      // `v` is the value being set, so use the value to set
      // `firstName` and `lastName`.
      const firstName = v.substring(0, v.indexOf(' '));
      const lastName = v.substring(v.indexOf(' ') + 1);
      this.set({ firstName, lastName });
    });
  const User = mongoose.model('User', userSchema);
  
  const doc = new User();
  // Vanilla JavaScript assignment triggers the setter
  doc.fullName = 'Jean-Luc Picard';
  
  doc.fullName; // 'Jean-Luc Picard'
  doc.firstName; // 'Jean-Luc'
  doc.lastName; // 'Picard'*/