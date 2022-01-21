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
        //#swagger.tags = ["Usuários"]
       // #swagger.summary = 'Retorna os dados de um usuário'
       // #swagger.description = 'Utilize o id para retornar o nome e o email do usuário'
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
       // #swagger.tags = ["Usuários"]
       // #swagger.summary = 'Atualiza os dados do usuário'
       // #swagger.description = 'Atualiza o usuário com o id indicado, o body deve conter o seguinte objeto{"name":"seu nome aqui", e/ou "email":"seuemail@nesseformato.com"}, valores incorretos geram erro, chaves erradas não são atualizadas'
        const { id } = req.params
        const usersData = getData('users.json')
        const { name, email } = req.body
        if(!name && !email) return res.status(400).send({message:"Sem informações para atualizar"})
        
        try {
            
           if(name){
            if((!name.match(/^[a-z ç,.'-]+$/i)))throw new Error('Nome deve conter apenas letras')
           }
            if(email){
                if((!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) throw new Error('Formato de email invalido')
            }
                let singleUser = usersData.find((item)=>item.id===Number(id))
                if(!singleUser) throw new Error('Id inexistente!')
               
                if(name){
                    console.log(name)
                    singleUser = { ...singleUser,...{"name":name}}
                }
                if(email){
                    singleUser = { ...singleUser,...{"email":email}}
                }
                
                const updateDatabase = usersData.map((item)=>{
                    if(item.id===Number(id)){
                        return singleUser
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
       // #swagger.tags = ["Usuários"]
       // #swagger.summary = 'Cria um usuário'
       // #swagger.description = 'cria um usuário com id gerado automáticamente, o body deve conter o seguinte objeto{"name":"Apenas Letras","email":"seuemail@nesseformato.com."}, chaves e valores incorretos geram erros'
        const { name, email } = req.body
        if(!name || !email) return res.status(400).send({message:"Não deve existir campos em branco"})
        try {
            if(name){
                if((!name.match(/^[a-z ,.'-]+$/i)))throw new Error('Nome deve conter apenas letras')
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