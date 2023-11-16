const {Router} = require("express")
const pool = require ('../database.js')
const mainrouter = Router()


mainrouter.get("/", async (req,res) => {
    res.render("main")
    console.log(await pool.query('SELECT * FROM zapa'))

} )


mainrouter.get("/vistazapas",(req,res) => {
    res.render("vistazapas")
} )


module.exports = mainrouter