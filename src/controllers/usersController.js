const fileSystem = require('fs')
const xlsx = require('xlsx')
const { getData, createOrUpdateData, findById } = require('../services/services')
module.exports = {
    async getUsers(req,res){
        try {
            fileSystem.lstatSync('src/database/'+"users.json").isFile()
        } catch (error) {
              return  res.status(404).send({message:'There is no such file'})
        }
        
            const result = JSON.parse(fileSystem.readFileSync("src/database/"+"users.json","utf-8"))
           return res.status(200).send({message:result})
    },
    async getUserById(req,res) {
        const { id } = req.params
        const usersData = getData('users.json')
        try {
            const user = findById(id,usersData)
            if(!user) throw new Error('ID inexistente')
          return  res.status(200).send({message:user})
            
        } catch (error) {
          return  res.status(400).send({message:error.message})
        }
    },
    async updateUser(req,res){
        const { id } = req.params
        const dataToUpdate = req.body
        const usersData = getData('users.json')
        const { name, email } = req.body
        if(!name && !email) return res.status(400).send({message:"Sem informações para atualizar"})
        
        try {
           if(name){
            if((!name.match(/^[a-z ,.'-]+$/i)))throw new Error('Nome só deve conter letras')
           }
            if(email){
                if((!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) throw new Error('Formato de email invalido')
            }
                const singleUser = usersData.find((item)=>item.id===Number(id))
                if(!singleUser) throw new Error('Id inexistente!')
                const updated = { ...singleUser,...dataToUpdate}
                const updateDatabase = usersData.map((item)=>{
                    if(item.id===Number(id)){
                        return updated
                    }
                    return item
                })
                createOrUpdateData('users.json',updateDatabase)
                return res.status(200).send({message:'Atualizado com sucesso'})
        } catch (error) {
            res.status(400).send({message:error.message})
        }
    },
    async createUser(req,res){
        const { name, email } = req.body
        if(!name && !email) return res.status(400).send({message:"Não deve existir campos em branco"})
        try {
            if(name){
                if((!name.match(/^[a-z ,.'-]+$/i)))throw new Error('Nome só deve conter letras')
               }
                if(email){
                    if((!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) throw new Error('Formato de email invalido')
                }
                const usersData = getData('users.json')
                const lastId = usersData[usersData.length-1].id
                const user = {
                    "id":lastId+1,
                    "name":name,
                    "email":email
                }
                usersData.push(user)
                createOrUpdateData('users.json',usersData)
                res.status(200).send({message:usersData})
        } catch (error) {
            res.status(400).send({message:error.message})
        }
    }

}