const express = require('express')
const router = express.Router()

const authCtrler = require('../controllers/auth.ctrler')

router.post('/login', authCtrler.login)

module.exports = router