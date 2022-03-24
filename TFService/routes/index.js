const transactionRouter = require('./transaction.route')

function routes(app) {
    app.use('/api/transactions', transactionRouter)
}

module.exports = routes