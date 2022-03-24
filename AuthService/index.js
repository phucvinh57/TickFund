require('dotenv').config()

const express = require('express')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
routes(app)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})