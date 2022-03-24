const authRouter = require('./auth.route')

function routes(app) {
    app.use('/auth', authRouter)
}

module.exports = routes