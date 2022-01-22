const xlsx = require('xlsx-populate')
const { getData, createOrUpdateData, findByUserId, translateMonth } = require('../services/services')

module.exports = {
    async createDataByXlsxFile(req, res) {
        /*
         #swagger.tags = ["finanças"]
         #swagger.summary = 'Cria uma conta365 e adiciona as finanças através dos dados do arquivo xlsx'
         #swagger.description = 'Insira todos os dados de uma tabela excel em um usuário específico. A tabela deve conter os campos price, typeofexpenses, date e name. Nenhum campo pode estar vazio, ou retornará um erro.Caso o usuário existe mas não tenha registro de finanças será criado e inserido os dados do xlsx'
         #swagger.consumes = ['multipart/form-data']  
         #swagger.parameters['file'] = {
             in: 'formData',
             type: 'file',
             required: 'true',
             description: 'Arquivo xlsx(excel)',
             accept: '/',
       } */
        const { userid } = req.params
        let financesJson = getData('financial.json')
        const userFinanceExists = financesJson.filter((item) => item.userId === Number(userid))
        let userJson = getData('users.json')
        console.log(userJson)
        const userExists = userJson.filter((item) => item.id === Number(userid))
        console.log(userExists)
        try {
            if (userExists.length === 0) throw new Error("Usuário inexistente")
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

                }
            }
            let resultado = []
            let newDate = new Date()
            let newId = newDate.getTime()
            const filteredRows = rows.filter((_, index) => index !== 0)
            filteredRows.map((row) => {
                const result = row.map((itemInRow, index) => {
                    if ([firstRow[index]] == 'date') return { [firstRow[index]]: xlsx.numberToDate(itemInRow) }
                    if ([firstRow[index]] == 'price') return { [firstRow[index]]: Number(itemInRow) }
                    return { [firstRow[index]]: itemInRow }
                });
                resultado.push(Object.assign({}, { id: newId }, ...result))
                newId++
            })
            let userFinanceId = financesJson.length
            console.log(userExists.length, 'here', userFinanceExists.length)

            if (userExists.length >= 1 && userFinanceExists.length == 0) {
                const newFinance = {
                    "id": userFinanceId + 1,
                    "userId": Number(userid),
                    "financialData": resultado
                }
                financesJson.push(newFinance)
                console.log(financesJson)
                createOrUpdateData('financial.json', financesJson)
                return res.status(200).send({ message: newFinance })
            }
            let currentUser = findByUserId(userid, financesJson)
            let insertIntoFinance = currentUser.financialData.concat(resultado)
            currentUser.financialData = insertIntoFinance
            let index = financesJson.findIndex((item) => item.userId === userid)
            financesJson[index] = currentUser
            createOrUpdateData('financial.json', financesJson)
            res.status(200).send({ message: currentUser })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    },
    async deleteFin(req, res) {
        /*
        #swagger.tags = ["finanças"]
        #swagger.summary = 'Deleta uma despesa do usuário'
        #swagger.description = 'Utilize o userid para especificar o usuário e o financeid para escolher a despesa a ser apagada. Retorna o usuário sem a despesa deletada'

        } */
        const { userid, financeid } = req.params
        let financesJson = getData('financial.json')
        try {
            const userFinanceExists = financesJson.filter((item) => item.userId === Number(userid))

            if (userFinanceExists == '') throw new Error("Usuário não encontrado")

            const financeExists = userFinanceExists[0].financialData.filter((item) => item.id === Number(financeid))

            if (financeExists == '') throw new Error("Pagamento inexistente")

            const index = userFinanceExists[0].financialData.findIndex((item) => item.id === Number(financeid))

            userFinanceExists[0].financialData.splice(index, 1)

            const userIndex = financesJson.findIndex((item) => item.userId === Number(userid))

            financesJson[userIndex] = userFinanceExists[0]

            createOrUpdateData('financial.json', financesJson)
            res.status(200).send({ message: financesJson[userIndex] })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    },
    async totalexpenses(req, res) {
        //#swagger.tags = ["finanças"]
        // #swagger.summary = 'Retorna as despesas com base no userid e queries'
        // #swagger.description = 'Utilize o userid para retornar as despesas do usuário, podendo usar uma das queries para retornar por mês/ano, Ex:Setembro/2022, ou por tipo, Ex:groceries, se as duas queries estiverem preenchidas retornará apenas por mês/ano. Retorna erro adequado caso o usuário não exista.'
        const { userid } = req.params
        const { bymonthyear, expenses } = req.query
        let financesJson = getData('financial.json')
        try {
            const userFinanceExists = financesJson.filter((item) => item.userId === Number(userid))
            if (userFinanceExists.length === 0) throw new Error("Usuário não possui conta ainda")
            if (userFinanceExists[0].financialData.length === 0) throw new Error("Nenhuma despesa registrada")
            let fullBill = {
                allExpenses: 0,
                byMonthYear: {},
                expensesByType: {}
            }
            userFinanceExists[0].financialData.forEach(item => {
                if (fullBill.expensesByType.hasOwnProperty(item.typeofexpenses)) {

                    fullBill.expensesByType[item.typeofexpenses] += item.price
                } else {
                    Object.assign(fullBill.expensesByType, { [item.typeofexpenses]: item.price })
                }
            });
            userFinanceExists[0].financialData.forEach(item => {
                const d = new Date(item.date)
                const month = translateMonth(d.getMonth())
                if (fullBill.byMonthYear.hasOwnProperty(month + "/" + d.getFullYear())) {
                    fullBill.allExpenses += item.price
                    fullBill.byMonthYear[month + "/" + d.getFullYear()] += item.price
                } else {
                    fullBill.allExpenses += item.price
                    Object.assign(fullBill.byMonthYear, { [month + "/" + d.getFullYear()]: item.price })
                }
            });
            if (bymonthyear) {
                const filtered = { [bymonthyear]: fullBill.byMonthYear[bymonthyear.toLowerCase()] }
                console.log(filtered)
                if (!filtered[bymonthyear]) throw new Error("Nenhum despesa com esse filtro/Mês escrito errado")

                return res.status(200).send({ message: filtered })
            }
            if (expenses) {
                const filtered = { [expenses]: fullBill.expensesByType[expenses] }
                if (!filtered[expenses]) throw new Error("Nenhuma despesa com este tipo")
                return res.status(200).send({ message: filtered })
            }
            res.status(200).send({ message: fullBill })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    },
    async allExpensesId(req, res) {
        //#swagger.tags = ["finanças"]
        // #swagger.summary = 'Retorna as despesas com ids'
        // #swagger.description = 'Utilize o userid para retornar as despesas do usuário com suas id. Retorna erro adequado caso o usuário não exista.'

        const { userid } = req.params
        let financesJson = getData('financial.json')

        try {
            const userFinanceExists = financesJson.filter((item) => item.userId === Number(userid))

            if (userFinanceExists.length === 0) throw new Error("Usuário não possue conta ainda/usuário inexistente")
            if (userFinanceExists[0].financialData.length === 0) throw new Error("Nenhuma despesa registrada")

            const result = userFinanceExists[0].financialData
            res.status(200).send({ message: result })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}
