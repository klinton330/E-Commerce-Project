const express = require("express");
const app=express();


const port=3000; //anything 

/*app.get("/",(req,res)=>{
    return res.send("Indian Page");
});
app.get("/login",(req,res)=> {

    return res.send("your are visiting login")
});

app.get("/signout",(req,res)=>{
    return res.send("you are signing out");
});
app.get("/hitesh",(req,res)=>{
    return res.send("Hitesh using instagram");
})*/
app.listen(port,()=>{
    console.log("server is running");
});

/*app.get("/admin",(req,res)=>
{
    return res.send("This is admin")
}).listen(port);*/

const admin=(req,res)=>{
    return res.send("Home dashboard");
}

const isAdmin=(req,res,next)=>
{
    console.log("is admmin running");
    next();
}

const isLoggedin=(req,res,next)=>
{
    console.log("is logged in");
    next();
}

app.get("/admin",isLoggedin,isAdmin,admin);