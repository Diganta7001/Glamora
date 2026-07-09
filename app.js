const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const ejsMate =  require("ejs-mate")
const Service = require("./models/service")

//app config
app.engine("ejs",ejsMate)
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))

//database-connections
main()
.then(()=>{
    console.log("Connected to monogoDB")
}).catch((err)=>{
    console.log(`error occured \n ${err}`)
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/glamora")
    
}

const port = 3000

app.get("/",(req,res)=>{
    res.send("It's Working...")
})

app.get("/home",async (req,res)=>{
    const allServices = await Service.find({})
    res.render("home.ejs",{allServices})
    
})

app.get("/services", async (req,res)=>{
    const services = await Service.find({})
    res.render("services/index",{services})
})

app.get("/services/new",(req,res)=>{
    res.render("services/new.ejs")
})

app.get("/services/:id",async(req,res)=>{
    const {id} = req.params
    const service = await Service.findById(id)
    res.render("services/show.ejs",{service})

})

app.get("/services/:id/edit",async (req,res)=>{
    const {id} = req.params
    const service = await Service.findById(id)
    res.render("services/edit.ejs",{service})
})


app.listen(port,()=>{
    console.log(`listining to the port ${port}` )
})