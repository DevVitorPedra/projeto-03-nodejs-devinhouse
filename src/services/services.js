const fileSystem = require('fs')


function getData(filename){
    const result = JSON.parse(fileSystem.readFileSync('src/database/'+ filename ,'utf8'))
    return result
}
function createOrUpdateData(filename, data){
    fileSystem.writeFileSync('src/database/'+ filename, JSON.stringify(data))
}
function findById(id, data) {
    const item = data.find((current)=> current.id === Number(id))
    return item
}
function formatDate(date){
    const newDate = new Date(date)
    const options = {year:'numeric', month:'numeric',day:'numeric'}
    const day = newDate.toLocaleString(newDate,options)
    return day
}
function findByUserId(userid, data){
    const item = data.find((current)=> current.userId === Number(userid))
    return item
}
function translateMonth(monthNumber){
        switch (monthNumber) {
            case 0: return "Janeiro"
            case 1: return "Fevereiro"
            case 2: return "Março"
            case 3: return "Abril"
            case 4: return "Maio"
            case 5: return "Junho"
            case 6: return "Julho"  
            case 7: return "Agosto"
            case 8: return "Setembro"
            case 9: return "Outubro"
            case 10: return "Novembro"
            case 11: return "Dezembro"
            default: return "Data inválida"
        }
}
module.exports = {
    getData,
    createOrUpdateData,
    findById,
    findByUserId,
    formatDate,
    translateMonth
}


