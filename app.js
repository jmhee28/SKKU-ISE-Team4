const express = require("express");
const app = express();
const ejs = require("ejs");

app.set("view engine","ejs");

app.use(express.static(__dirname + "/"));
app.use(express.json());

app.get("/",function(req,res){
    res.render("index")
});
app.get("/calendar",function(req,res){
    res.render("calendar")
});
app.get("/register",function(req,res){
    res.render("register")
});

app.post("/calendar",(req,res) => {       
    console.log(req.body.user.name);
    console.log(req.body.user.email);
    res.render("calendar")
})

app.listen(3000, () => {
    console.log("listening on *:3000");
  });