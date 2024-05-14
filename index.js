const express = require("express")
const path = require("path")
const logger = require("morgan")
const mainrouter = require("./routes/mainrouter.js")
const myconecction = require('express-myconnection')
require('dotenv').config()

const port = process.env.PORT ?? 3000


const api = express()

//basic configurations
api.set("views",path.join(__dirname,"views"))
api.use(express.static(path.join(__dirname,"public")))
api.set("view engine", "ejs")

//middlewares que facilitaran el tratado de datos
api.use(express.urlencoded({extended:false}))
//aceptación datos en formato JSON
api.use(express.json())


// api.disable("x-powered-by")

api.use(logger("dev"))

const session = require('express-session');
api.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}))

api.use("/",mainrouter)

api.listen(port,()=>{
    console.log("server listening on port "+port)
})