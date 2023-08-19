import express from "express";

const app=express();
const port = 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get("/",(req,res)=>{
    res.render("home.ejs");
});
app.get("/content",(req,res)=>{
    res.render("content.ejs");
});
app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});
app.get("/login",(req,res)=>{
    res.render("login.ejs");
});
app.get("/notify",(req,res)=>{
    res.render("notify.ejs");
});
app.listen(port,()=>{
    console.log("Server has started at port 3000");
});