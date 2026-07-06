const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const ejsMate =  require("ejs-mate")

//app config
app.engine("ejs",ejsMate)
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))


const port = 3000

app.get("/",(req,res)=>{
    res.send("It's Working...")
})

app.get("/home",(req,res)=>{
    res.render("home.ejs")
})

app.listen(port,()=>{
    console.log(`listining to the port ${port}` )
})