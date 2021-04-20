require("dotenv").config()
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const authRoutes=require('./routes/auth');


//DB CONNECTIONS
mongoose.connect(process.env.DATABASE, {
useNewUrlParser: true,
useUnifiedTopology:true,
useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(()=>{
    console.log("DB PROBLEM")
})


//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Port
const port=process.env.PORT||8000;

//Routing
app.use('/api',authRoutes);//http://localhost:8000/api/signout
//console

//Starting a Server
app.listen(port,()=>
{
    console.log(`app is running at ${port}`)
})