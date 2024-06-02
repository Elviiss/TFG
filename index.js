const express = require("express")
const path = require("path")
const logger = require("morgan")
const mainrouter = require("./routes/mainrouter.js")
const session = require('express-session');
require('dotenv').config()
const bodyParser = require('body-parser')
const mysqlStore = require('express-mysql-session')(session)
const connection = require('./database.js')


const port = process.env.PORT ?? 3000


const api = express()

api.use(bodyParser.json())

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

api.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore({}, connection)
}))

api.use("/",mainrouter)

api.listen(port,()=>{
    console.log("server listening on port "+port)
})

api.use((req, res, next)=> {
    res.status(404).render('404')
})