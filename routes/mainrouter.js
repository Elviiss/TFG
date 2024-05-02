const {Router} = require("express")
const pool = require ('../database.js')
const mainrouter = Router()


mainrouter.get("/", async (req,res) => {
    const [zapass] = await pool.query('SELECT * FROM zapa')
    const [marcaprincii] = await pool.query('SELECT * FROM marcaprinci')
    res.render("main", {zapass,marcaprincii})

} )

mainrouter.get("/vistazapas/:id", async(req,res) => {
    const [zapasss] = await pool.query('SELECT * from zapa where id = ?', [req.params.id])
    res.render("vistazapas", {zapasss})
} )

mainrouter.get("/vermaszapas", async (req,res) => { 
    const [zapass] = await pool.query('SELECT * FROM zapa')
    res.render("vermaszapas", {zapass})
} )

mainrouter.get("/vermasmarcas/:marca", async (req,res) => { 
    const [zapass] = await pool.query('SELECT * FROM zapa where marca = ?', [req.params.marca])
    const [marcaprincii] = await pool.query('SELECT * FROM marcaprinci where marca = ?', [req.params.marca])
    res.render("vermasmarcas", {zapass,marcaprincii})
} )

mainrouter.get("/vistamarcas", async (req,res) => { 
    const [marcaprincii] = await pool.query('SELECT * FROM marcaprinci')
    res.render("vistamarcas", {marcaprincii})
} )


mainrouter.post("/register", async (req,res) => { 
    const { username, gmail, contraseña} = req.body;
    console.log(req.body.username)

    const [result] = await pool.execute(' INSERT INTO usuarios (username, gmail, contraseña) VALUES (?, ?, ?)', [username, gmail, contraseña])
    res.redirect("/")
} )

mainrouter.post("/login", async (req,res) => { 
    const { username, contraseña} = req.body;
    console.log(req.body.username)

    const [logueo] = await pool.execute('SELECT * FROM usuarios WHERE username = ? AND contraseña = ?', [username, contraseña])

    if(logueo.length > 0){
        res.redirect("/");
        console.log("estas logueado")
    }else{
        res.render(main)
        console.log("todo mal")
    }
} )

module.exports = mainrouter