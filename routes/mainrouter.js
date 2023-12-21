const {Router} = require("express")
const pool = require ('../database.js')
const mainrouter = Router()


mainrouter.get("/", async (req,res) => {
    console.log(await pool.query('SELECT * FROM zapa'))
    const [zapass] = await pool.query('SELECT * FROM zapa')
    console.log(await pool.query('SELECT * FROM marcaprinci'))
    const [marcaprincii] = await pool.query('SELECT * FROM marcaprinci')
    console.log(zapass)
    console.log(marcaprincii)
    res.render("main", {zapass,marcaprincii})

} )

mainrouter.get("/vistazapas/:id", async(req,res) => {
    const [zapasss] = await pool.query('SELECT * from zapa where id = ?', [req.params.id])
    console.log(zapasss)
    console.log(req.params.id)
    res.render("vistazapas", {zapasss})
} )

mainrouter.get("/vermaszapas", async (req,res) => { 
    const [zapass] = await pool.query('SELECT * FROM zapa')
    res.render("vermaszapas", {zapass})
} )

mainrouter.get("/vermasmarcas:marca", async (req,res) => { 
    const [zapass] = await pool.query('SELECT * FROM zapa where marca = ?', req.params.marca)
    const [marcaprincii] = await pool.query('SELECT * FROM marcaprinci')
    console.log(req.params.marca)
    res.render("vermasmarcas", {zapass,marcaprincii})
} )

mainrouter.get("/vistamarcas", async (req,res) => { 
    const [marcaprincii] = await pool.query('SELECT * FROM marcaprinci')
    res.render("vistamarcas", {marcaprincii})
} )


module.exports = mainrouter