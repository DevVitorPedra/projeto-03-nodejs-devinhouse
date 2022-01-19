const express = require('express')

const usersRoutes = express.Router()
const userController = require('../../controllers/usersController')

usersRoutes.get('/users/:id',userController.getUserById)
usersRoutes.post('/users', userController.createUser)
usersRoutes.patch('/users/:id', userController.updateUser)



module.exports = usersRoutes
