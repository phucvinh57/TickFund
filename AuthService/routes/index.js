const transactionRouter = require('./transaction.route')

function routes(app) {
    app.use('/api/login', transactionRouter)
}

module.exports = routes