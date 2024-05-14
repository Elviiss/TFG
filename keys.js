
require('dotenv').config()

module.exports = {
    database: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'flaffy'
    },
    STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY
}