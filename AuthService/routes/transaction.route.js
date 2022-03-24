const express = require('express')
const router = express.Router()

const transactionsCtrler = require('../controllers/transactions.ctrler')

router.get('/', transactionsCtrler.login)

module.exports = router