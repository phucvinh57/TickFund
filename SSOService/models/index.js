require('dotenv').config()
const mysql = require('mysql')
const util = require('util')

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
}
console.log(dbConfig)

const connection = mysql.createConnection(dbConfig)
connection.connect(err => {
    if(err) {
        // Will be replaced by System Log Service
        console.log(err)
        process.exit(1)
    }
    console.log(`${dbConfig.host} was connected to mysql://${dbConfig.host} !`)
})
module.exports = {
    query: util.promisify(connection.query).bind(connection)
}