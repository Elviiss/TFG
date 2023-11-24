const {Router} = require("express")
const pool = require ('../database.js')
const mainrouter = Router()


mainrouter.get("/", async (req,res) => {
    console.log(await pool.query('SELECT * FROM zapa'))
    const [zapass] = await pool.query('SELECT * FROM zapa')
    console.log(zapass)
    res.render("main", {zapass})

} )

mainrouter.get("/vistazapas/:id", async(req,res) => {
    const [zapasss] = await pool.query('SELECT * from zapa where id = ?', [req.params.id])
    console.log(zapasss)
    console.log(req.params.id)
    res.render("vistazapas", {zapasss})
} )


module.exports = mainrouter