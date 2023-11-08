const {Router} = require("express")

const mainrouter = Router()


mainrouter.get("/",(req,res) => {
    res.render("main")
} )

module.exports = mainrouter