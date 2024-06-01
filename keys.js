
require('dotenv').config()

module.exports = {
    database: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'flaffy'
    },
    databasenube:{
        host: 'blh6v2r6gpkyta1jfa6a-mysql.services.clever-cloud.com',
        user: 'u857enpsnmyh83no',
        password: '7DbGwc0adPvpUwb4mLet',
        port: 3306,
        database: 'blh6v2r6gpkyta1jfa6a'
    },
    STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY
}