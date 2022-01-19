const fileSystem = require('fs')
const xlsx = require('xlsx')
module.exports = {
    async getUsers(req,res){
        if(fileSystem.lstatSync('src/database/'+"users.json").isFile()){
            const result = JSON.parse(fileSystem.readFileSync("src/database/"+"users.json","utf-8"))
            res.status(200).send({message:result})
        }
        res.status(404).send({message:"Arquivo não encontrado."})
    }
}