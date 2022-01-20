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
module.exports = {
    getData,
    createOrUpdateData,
    findById,
    findByUserId,
    formatDate
}


