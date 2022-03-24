// const db = require('../models')

const login = function (req, res) {
    console.log(req.body)
    res.json({ msg: "TRANSACTION DATA" })
}

module.exports = {
    login
}