const {Router} = require("express")
const pool = require ('../database.js')
const mainrouter = Router()


mainrouter.get("/", async (req,res) => {
    const [zapass] = await pool.query('SELECT * FROM zapa')
    const [marcaprincii] = await pool.query('SELECT * FROM marcaprinci')

    if(req.session.loggedin){
        res.render("main", {zapass,marcaprincii,
            login: true,
            username: req.session.username
        })
    }else{
        res.render("main", {zapass,marcaprincii,
            login:false,
            username: 'Inicia sesion'
        })
        console.log("todo mal")
        console.log(req.session.username)
    }

} )

mainrouter.get("/vistazapas/:id", async(req,res) => {
    const [zapasss] = await pool.query('SELECT * from zapa where id = ?', [req.params.id])

    if(req.session.loggedin){
        res.render("vistazapas", {zapasss,
            login: true,
            username: req.session.username
        })
    }else{
        res.render("vistazapas", {zapasss,
            login:false,
            username: 'Inicia sesion'
        })
        console.log("todo mal")
        console.log(req.session.username)
    }
} )

mainrouter.get("/vermaszapas", async (req,res) => { 
    const [zapass] = await pool.query('SELECT * FROM zapa')

    if(req.session.loggedin){
        res.render("vermaszapas", {zapass,
            login: true,
            username: req.session.username
        })
    }else{
        res.render("vermaszapas", {zapass,
            login:false,
            username: 'Inicia sesion'
        })
        console.log("todo mal")
        console.log(req.session.username)
    }
} )

mainrouter.get("/vermasmarcas/:marca", async (req,res) => { 
    const [zapass] = await pool.query('SELECT * FROM zapa where marca = ?', [req.params.marca])
    const [marcaprincii] = await pool.query('SELECT * FROM marcaprinci where marca = ?', [req.params.marca])
    
    if(req.session.loggedin){
        res.render("vermasmarcas", {zapass, marcaprincii,
            login: true,
            username: req.session.username
        })
    }else{
        res.render("vermasmarcas", {zapass, marcaprincii,
            login:false,
            username: 'Inicia sesion'
        })
        console.log("todo mal")
        console.log(req.session.username)
    }
} )

mainrouter.get("/vistamarcas", async (req,res) => { 
    const [marcaprincii] = await pool.query('SELECT * FROM marcaprinci')

    if(req.session.loggedin){
        res.render("vistamarcas", {marcaprincii,
            login: true,
            username: req.session.username
        })
    }else{
        res.render("vistamarcas", {marcaprincii,
            login:false,
            username: 'Inicia sesion'
        })
        console.log("todo mal")
        console.log(req.session.username)
    }
} )


mainrouter.post("/register", async (req,res) => { 
    const { username, gmail, contraseña} = req.body;
    console.log(req.body.username)

    const [result] = await pool.execute(' INSERT INTO usuarios (username, gmail, contraseña) VALUES (?, ?, ?)', [username, gmail, contraseña])
    res.redirect("/")
} )

mainrouter.post("/login", async (req,res) => { 
    const username = req.body.username
    const contraseña = req.body.contraseña
    console.log(req.body.username)

    const [logueo] = await pool.execute('SELECT * FROM usuarios WHERE username = ? AND contraseña = ?', [username, contraseña])

    if(logueo.length > 0){
        const [zapass] = await pool.query('SELECT * FROM zapa')
        const [marcaprincii] = await pool.query('SELECT * FROM marcaprinci')

        req.session.loggedin = true
        req.session.username = req.body.username
        if(req.session.loggedin){
            res.render("main", {zapass,marcaprincii,
                login: true,
                username: req.session.username
            })
            console.log("estas logueado")
            console.log(req.session.username)
        }else{
            res.render("main", {zapass,marcaprincii,
                login:false,
                username: 'Inicia sesion'
            })
            console.log("todo mal")
            console.log(req.session.username)
        }
    }else{
        res.redirect('/')
        console.log("todo mal")     
    }
} )


mainrouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = mainrouter