# {VSP}
# DEVinBank Pagamentos S/A

## Projeto 1 do modulo NodeJS do DEVinHouse
> Projeto visa a criação de uma RESTful API, para manipulação de arquivos estáticos 
> criação de dados em massa através da leitura de arquivo xlsx(excel),
> calculo de informações de acordo com filtros, como mês e tipo de gastos

### acesse o deploy no <a href="https://warm-inlet-55774.herokuapp.com/">Heroku</a>
# Conta365
### Requisitos de desenvolvimento
- [x] Aplicação com Node e Express
- [x] Utilizar Swagger para documentação dos endpoints
- [x] A aplicação deverá conter um sistema de rotas organizadas por versões
- [x] Database feita em JSON para usuários
- [x] Database feita em JSON para finanças
### Endpoints
#### Usuários

- [x] POST,  "api/users", com todos os campos obrigatórios, sendo os campos nome e email.

- [x] PATCH, "api/users/id", altera uma informação, ou ambas

- [x] GET,   "api/users/id", que receba o id por params e retorne os dados do usuário ou mensagem adequada

#### Financeiros

- [x] POST,   "api/finance/userid", com Id do usuário por params, que recebera um arquivo xlsx, devendo conter os campos(price,typeofexpenses, date, name), com todos os campos obrigatórios, retorna mensagens adequadas em caso de divergência. userid obrigatório

- [x] DELETE, "api/finance/userid/financeid, deleta uma despesa baseada no id do usuário e id da despesa, ambos passados por params, retorna mensagem adequada em caso de divergência. userid e financeid obrigatórios

- [x] GET,    "api/finance/userid" retorna as despesas do usuário, no qual o id foi passado por params, no mesmo endpoint pode ser passado queries como "bymonthyear" e "expenses" para filtrar respectivamente por mês e por tipo de despesa, em caso de divergência retorna mensagem adequada. userid obrigatório.



## 💻 Pré-requisitos

 - Ter um serviço de requisições http, como Postman, Insomnia ou ThunderClient



## ☕ Usando sua Conta365

Para usar:

### Endpoint de usuários
```
Utilize o endpoint "api/user" do tipo POST  para criar seu usuário, no corpo da requisição 
deve haver um objeto com o seguinte formato:
{ "nome":"seu nome aqui",
  "email":seuemail@nesseformato.com"}
Seu nome não deve conter números e nem caracteres especiais, e o email deve ser no formato
orientado,
caso tenha alguma informação incorreta, recebera uma mensagem de erro adequada.

Voce pode atualizar seu usuário pelo endpoint "api/user/id" do PATCH passando seu id, 
e no corpo da requisição devera conter o objeto com a informação a ser atualizada, 
é necessário apenas a informação a ser atualizada.

Utilize o endpoint "api/user/id" do tipo GET para receber os 
dados de usuário
```
### Endpoint de finanças
```
Utilize o endpoint "api/finance/userid" do tipo GET para receber todas as despesas
do usuário selecionado, existem duas possíveis queries, bymonth para retornar o valor total do mes
solicitado, e expenses que retorna o valor total do tipo de despesa, retornará uma mensagem com os
gastos ou mensagem de erro adequada

Utilize o endpoint "api/finance/userid" do tipo POST para passar o arquivo excel
com os gastos feitos,o arquivo deve conter as colunas price, typeofexpenses, date, e name,
onde cada um representa respectivamente o preço gasto, o tipo de gasto, quando foi gasto e
qual o nome do item.
Todos os campos são obrigatórios, em caso de divergência retornará mensagem de erro adequada,
caso esteja correto retorna todas as despesas do usuário.

Utilize o endpoint "api/finance/userid/financeid" do tipo DELETE para deletar alguma despesa,
caso algum dos id's sejam inexistentes retorna mensagem de erro adequada, caso de sucesso retorna
as despesa atuais.

```



## 🤝 Desenvolvido por:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://pt.gravatar.com/avatar/f0a681d3c89a0d7051ad5519d053b9e3" width="100px;" alt="Foto do Vitor Pedra no GitHub"/><br>
        <sub>
          <b>Vitor dos Santos Pedra</b>
        </sub>
      </a>
    </td>
  </tr>
</table>



## 🤝 Objetivo:

```
Com objetivo educacional, a ideia é desenvolver uma 
API REST utilizando NodeJS e Express, para trabalhar a manipulação de arquivos estáticos,
recebimento de arquivos por requisição http, trabalhar os retornos corretos para o usuário,
tratar os erros e documentar utilizando Swagger 
```