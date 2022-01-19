const express = require('express'); 
const app = express()
const dotenv = require('dotenv').config()
app.use(express.json())

const financialRoutes = require('./routes/v1/financial.routes')
app.use(financialRoutes)

const usersRoutes = require('./routes/v1/users.routes')
app.use(usersRoutes)
const port = process.env.PORT || 5000

app.get('/',(req,res)=>res.send('Damn, my boy!!!'))

app.listen(port,()=>{
    console.log('Executando na rota ',port)
})
