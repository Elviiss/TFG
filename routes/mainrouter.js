const {Router} = require("express")
const pool = require ('../database.js')
const mainrouter = Router()


mainrouter.get("/", async (req,res) => {
    console.log(await pool.query('SELECT * FROM zapa'))

    const [zapass] = await pool.query('SELECT * FROM zapa')
    console.log(zapass)
    console.log(zapass.id)

    res.render("main", {zapass})

} )


mainrouter.get("/vistazapas",(req,res) => {
    res.render("vistazapas")
} )


module.exports = mainrouter