const { create } = require('domain')
const fileSystem = require('fs')
const xlsx = require('xlsx-populate')
const { getData, createOrUpdateData, findByUserId, translateMonth } = require('../services/services')

module.exports = {
    async createDataByXlsxFile(req, res) {
        const { userid } = req.params
        let financesJson = getData('financial.json')
        const userExists = financesJson.filter((item) => item.userId === Number(userid))
        try {
            if (userExists == '') throw new Error(userExists)
            let financesLastId = 0
            if(!financesJson[userid-1].financialData[financesJson[0].financialData.length - 1]){
            financesLastId = 0
            }else financesLastId =  financesJson[0].financialData[financesJson[0].financialData.length - 1].id
            const fileData = await xlsx.fromDataAsync(req.file.buffer)
            const rows = fileData.sheet(0).usedRange().value()
            const [firstRow] = rows
            const fields = ['price', 'typeofexpenses', 'date', 'name']
            const keyValidation = firstRow.every((item, index) => {
                return fields[index] === item
            })
            if (firstRow.length !== 4) {
                return res.status(400).send({ message: "Esta faltando colunas." })
            }
            if (!keyValidation) {
                return res.status(400).send({ message: "Erro no nome das colunas." })
            }

            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < firstRow.length; j++) {
                    if (!rows[i][j]) throw new Error("Todas as colunas devem estar preenchidas")
                    console.log(rows[i][j])
                }
            }
            let resultado = []
            let newId = financesLastId + 1
            const filteredRows = rows.filter((_, index) => index !== 0)
            filteredRows.map((row) => {
                const result = row.map((itemInRow, index) => {
                    if ([firstRow[index]] == 'date') return { [firstRow[index]]: xlsx.numberToDate(itemInRow) }
                    if ([firstRow[index]] == 'price') return { [firstRow[index]]: Number(itemInRow) }
                    return { [firstRow[index]]: itemInRow }

                })

                resultado.push(Object.assign({}, { id: newId }, ...result))
                newId++
            })
            let currentUser = findByUserId(userid, financesJson)
            let var1 = currentUser.financialData.concat(resultado)
            currentUser.financialData = var1
            let index = financesJson.findIndex((item) => item.userId === userid)
            financesJson[index] = currentUser
            createOrUpdateData('financial.json', financesJson)
            res.status(200).send({ message: financesJson })

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    },
    async deleteFin(req, res) {
        const { userid, financeid } = req.params
        let financesJson = getData('financial.json')
        try {
            const userExists = financesJson.filter((item) => item.userId === Number(userid))
            if (userExists == '') throw new Error("Usuário inexistente")
            const financeExists = userExists[0].financialData.filter((item) => item.id === Number(financeid))
            if (financeExists == '') throw new Error("Pagamento inexistente")
            const index = userExists[0].financialData.findIndex((item) => item.id === Number(financeid))
            userExists[0].financialData.splice(index, 1)
            const userIndex = financesJson.findIndex((item) => item.userId === Number(userid))
            financesJson[userIndex] = userExists[0]
            createOrUpdateData('financial.json', financesJson)
            res.status(200).send({ message: financesJson })

        } catch (error) {
            res.status(400).send({ message: error.message })
        }



    },
    async totalexpenses(req,res){
        const { userid } = req.params
        const { bymonth, expenses } = req.query
        let financesJson = getData('financial.json')
       try {
        const userExists = financesJson.filter((item) => item.userId === Number(userid))
        if (userExists == '') throw new Error("Usuário inexistente")
        if(userExists[0].financialData.length===0) throw new Error("Nenhuma despesa registrada")
        let fullBill = {
                allExpenses:0,
                byMonth:{

                },
                expensesByType:{

                }
             
        }
         
        
   
            userExists[0].financialData.forEach(item=>{
                
                   if(fullBill.expensesByType.hasOwnProperty(item.typeofexpenses)){
                   
                    fullBill.expensesByType[item.typeofexpenses] += item.price
                   }else{
                  
                       Object.assign(fullBill.expensesByType,{[item.typeofexpenses]:item.price})
                   }
            })
        
        
         userExists[0].financialData.forEach(item=>{
            const d = new Date(item.date)
            const month = translateMonth(d.getMonth())
            if(fullBill.byMonth.hasOwnProperty(month)){
                fullBill.allExpenses += item.price
               fullBill.byMonth[month] += item.price
            }else{
                fullBill.allExpenses += item.price
                Object.assign(fullBill.byMonth,{[month]:item.price})
            }
        });
        if(bymonth) {
            const filtered = {[bymonth]:fullBill.byMonth[bymonth]}
            console.log(filtered)
            if(!filtered[bymonth]) throw new Error("Nenhum despesa com esse filtro/Mês escrito errado")
           
           return res.status(200).send({message:filtered})
        }
        if(expenses){
            const filtered = {[expenses]:fullBill.expensesByType[expenses]}
            return res.status(200).send({message:filtered})
        }
        res.status(200).send({message:fullBill})
       } catch (error) {
           res.status(400).send({message:error.message})
       }
    }
}
