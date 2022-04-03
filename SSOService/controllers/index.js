require('dotenv').config()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 10
const ERR_CODE_500 = 'INTERNAL SERVER ERROR'
const OK_CODE_200 = 'SUCCESS'

const LOGIN_FAIL = 'Incorrect username or email or password'

const createUser = async function (req, res) {
    const { username, password, ID, department } = req.body

    try {
        const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)
        await db.query(`INSERT INTO 
            account (ID, username, password, dname)
            VALUES (?, ?, ?, ?)
        `, [ID, username, hashPassword, department])

        res.status(200).json({ msg: OK_CODE_200 })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: ERR_CODE_500 })
    }
}

const login = async function (req, res) {
    const { user, password } = req.body
    try {
        const hashPassword = await db.query(
            `SELECT password FROM account WHERE username = ? OR email = ?`,
            [user, user]
        )
        if (hashPassword.length === 0) {
            res.json({ msg: LOGIN_FAIL })
            return
        }

        let checkPassword = await bcrypt.compare(password, hashPassword[0])
        if (!checkPassword) {
            res.json({ msg: LOGIN_FAIL })
            return
        }

        const token = jwt.sign({
                username: user,
                verify: true,
            },
            process.env.SECRET_KEY,
            { expiresIn: 300}
        )
        res.json({ token })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: ERR_CODE_500 })
    }
}

module.exports = {
    login,
    createUser
}