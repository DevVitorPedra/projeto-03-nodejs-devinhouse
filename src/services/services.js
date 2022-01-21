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
            case 0: return "janeiro"
            case 1: return "fevereiro"
            case 2: return "março"
            case 3: return "abril"
            case 4: return "maio"
            case 5: return "junho"
            case 6: return "julho"  
            case 7: return "agosto"
            case 8: return "setembro"
            case 9: return "outubro"
            case 10: return "novembro"
            case 11: return "dezembro"
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


