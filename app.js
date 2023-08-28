const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT

//checking the how many CPU's
let os = require("os") 

const db = require("./db")
const User = require("./src/models/userSchema")

//swagger integration 
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
const package = require("./package.json")

swaggerDocument.info.version = package.version
app.use('/api-doc',swaggerUI.serve,swaggerUI.setup(swaggerDocument))

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(express.static(__dirname + "/public"))
app.set("views","./src/views")
app.set("view engine","ejs")


app.get("/",(req,res)=>{
    //let employees = db.collection("employe")
    res.send("home")
    //console.log("cpu",os.cpus())
    
})

app.post("/addUser",async (req,res)=>{ 
   let addedUser = await  User.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    })

    res.send(addedUser)
})

app.get("/getUsers",async (req,res)=>{
    let usersList = await User.find({})
    res.send(usersList)
})

app.get("/getUser",async (req,res)=>{
    let id = req.query.id
    let user = await User.findById(id)
    res.send(user)
})


app.get("/updateUser",async (req,res)=>{
    let id = req.query.id
   // let user = await User.findById(id)

    let updatedUser = await User.findByIdAndUpdate({_id:id},{ 
        email:req.body.email 
    })
    //updating in mongoose also
    updatedUser.email = req.body.email
    res.send(updatedUser)
})

app.listen(port,(err)=>{
    if(err)throw err
    console.log("running on:",port)
})