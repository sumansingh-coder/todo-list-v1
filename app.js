const express = require("express");
const bodyParser = require("body-parser");

const app=express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

var newItemList = [];
var workList = [];

app.get("/",function(req,res){
    var today = new Date();
    var option = {
        weekday : "long",
        day : "numeric",
        month : "long", 
        year : "numeric"
    };

    var day = today.toLocaleDateString("en-US", option);
    res.render("List", {listTitle : day, newItem : newItemList});
})

app.post("/", function(req,res){
    // console.log(req.body);
    var item = req.body.addItems;
    if(req.body.ListButton === "Work"){
        workList.push(item);
        res.redirect("/work");
    }
    else{
        newItemList.push(item);
        res.redirect("/");
    }
})

app.get("/work",function(req,res){
    res.render("List",{listTitle : "Work", newItem : workList});
})

app.listen(3010,function(){
    console.log("App Started at PORT : 3010.");
})