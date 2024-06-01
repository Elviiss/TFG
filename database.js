const mysql = require ('mysql2/promise')
const {database, databasenube} = require('./keys')
const pool = mysql.createPool(databasenube)
module.exports = pool