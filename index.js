const express = require('express'); 
const app = express()


const port = process.env.PORT || 5000
app.use(express.json())
app.get('/',(req,res)=>res.send('Damn, my boy!!!'))

app.listen(port,()=>{
    console.log('Executando na rota ',port)
})
