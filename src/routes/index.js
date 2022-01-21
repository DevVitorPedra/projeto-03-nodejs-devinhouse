const express = require('express')
const routes = express.Router()
const financialRoutes = require('./v1/financial.routes')
const usersRoutes = require('./v1/users.routes')

routes.use('/api',[financialRoutes, usersRoutes])

module.exports = routes