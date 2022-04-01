const express = require('express')
const router = express.Router()

const authCtrler = require('../controllers')
router.post('/login', authCtrler.login)

function routes(app) {
    app.use('/auth', router)
}

module.exports = routes