const {Router} = require("express")
const pool = require ('../database.js')
const mainrouter = Router()
const Stripe = require("stripe")
const { STRIPE_PRIVATE_KEY} = require('../keys.js')
const Swal = require('sweetalert2')
const bcrypt = require('bcrypt')
const saltRounds = 10

const stripe = new Stripe(STRIPE_PRIVATE_KEY)

mainrouter.post("/checkout-session", async (req,res) => { 
    const session2 = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data:{
                    product_data:{
                        name: req.query.modelo + '    Talla: '+ req.query.talla,
                        description: req.query.descripcion
                    },
                    currency: 'eur',
                    unit_amount: req.query.precio * 100
                },
                quantity:1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:4444/'
    })
    console.log(req.query)
    return res.json(session2)
} )


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

    const data = req.body
    const check = await pool.query('SELECT * FROM usuarios WHERE username = ?',[username])
    const check2 = await pool.query('SELECT * FROM usuarios WHERE gmail = ?',[gmail])


    if(check[0].length > 0){
        return res.status(400).json({ message: 'Usuario ya existente', redirect: '/logout' });
    }else{
        if(check2[0].length > 0){
            return res.status(400).json({ message: 'Correo ya existente', redirect: '/logout' });
        }else{
            const hsashedPassword = await bcrypt.hash(contraseña, saltRounds)
            const [result] = await pool.execute(' INSERT INTO usuarios (username, gmail, contraseña) VALUES (?, ?, ?)', [username, gmail, hsashedPassword])

            return res.status(200).json({ message: 'Usuario registrado correctamente', redirect: '/' });
        }
    }
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
            return res.status(200).json({ message: 'Usuario registrado correctamente', redirect: '/' });    
        }else{
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos', redirect: '/logout' });
        }
    }else{
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos', redirect: '/logout' });     
    }
} )


mainrouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})
mainrouter.post('/vistazapas/logout', (req, res) => {
    res.redirect("/")
    
})
mainrouter.post('/vermasmarcas/logout', (req, res) => {
    res.redirect("/")
    
})


mainrouter.get('*', (req, res) => {
    res.render('404.ejs')
})

module.exports = mainrouter