const express = require('express')
const financialRoutes = express.Router()
const multer = require('multer')
const financialController = require('../../controllers/financialController')
const upload = multer()

financialRoutes.post('/finance/:userid',upload.single('file'),financialController.createDataByXlsxFile)
financialRoutes.delete('/finance/:userid/:financeid',financialController.deleteFin)
financialRoutes.get('/finance/:userid',financialController.totalexpenses)
module.exports = financialRoutes
