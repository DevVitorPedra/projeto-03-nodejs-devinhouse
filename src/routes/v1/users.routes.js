const express = require('express')
const usersRoutes = express.Router()

usersRoutes.post('/users', (req,res)=>{
    res.send("it works ok for me!!!")
})




module.exports = usersRoutes
