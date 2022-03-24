require('dotenv').config()

const express = require('express')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT

routes(app)

app.get('/', (req, res) => {
    res.send(`<html>
        <body>
            <h1>TickFund Service</h1>
        </body>
    </html>`)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})