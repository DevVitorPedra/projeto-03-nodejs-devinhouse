const express = require('express'); 
const routes = require('./src/routes');
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3333
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
app.use(express.json())
app.use(routes)
app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.listen(port,()=>console.log('Executando na rota ',port))
