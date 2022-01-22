const express = require('express')
const financialRoutes = express.Router()
const multer = require('multer')
const financialController = require('../../controllers/financialController')
const upload = multer()

// rota adicional que mostra as despesas por id
financialRoutes.get('/finance/ids/:userid',financialController.allExpensesId)
financialRoutes.get('/finance/:userid',financialController.totalexpenses)
financialRoutes.post('/finance/:userid',upload.single('file'),financialController.createDataByXlsxFile)
financialRoutes.delete('/finance/:userid/:financeid',financialController.deleteFin)
module.exports = financialRoutes
