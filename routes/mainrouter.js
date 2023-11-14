const {Router} = require("express")

const mainrouter = Router()


mainrouter.get("/",(req,res) => {
    res.render("main")
} )


mainrouter.get("/vistazapas",(req,res) => {
    res.render("vistazapas")
} )

module.exports = mainrouter