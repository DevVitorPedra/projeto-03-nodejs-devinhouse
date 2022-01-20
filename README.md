# {VSP}
# DEVinBank Pagamentos S/A
## Projeto 1 do modulo NodeJS do DEVinHouse
> Projeto visa a criação de uma RESTful API, para manipulação de arquivos estáticos 
> criação de dados em massa através da leitura de arquivo xlsx(excel)
> calculo de de informações de acordo com filtros, como mês e tipo de gasto

# Conta365
### Requisitos de desenvolvimento
- [x] Aplicação com Node e Express
- [ ] Utilizar Swagger para documentação dos endpoints
- [x] A aplicação deverá conter um sistema de rotas organizadas por versões
- [x] Database feita em JSON para usuários
- [x] Database feita em JSON para finanças
### Endpoints
#### Usuários
- [x] POST, Com todos os campos obrigatórios
- [x] PATCH, Com todos os campos obrigatórios, e validações necessárias
- [x] GET, que receba o id por params e retorne os dados do usuário ou mensagem adequada
#### Financeiros
- [x] POST, com Id do usuário por params, que recebera um arquivo xlsx, devendo conter os campos(price,typeofexpenses, date, name), com todos os campos obrigatórios, retorna mensagens adequadas em caso de divergência.
- [x] DELETE, deleta uma despesa baseada no id do usuário e id da despesa, ambos passados por params, retorna mensagem adequada em caso de divergência.
- [x] GET, retorna as despesas do usuário, no qual o id foi passado por params, no mesmo endpoint pode ser passado queries como "bymonth" e "expenses" para filtrar respectivamente por mês e por tipo de despesa, em caso de divergência retorna mensagem adequada.



## 💻 Pré-requisitos

 - Ter um serviço de requisições http, como Postman, Insomnia, ThunderClient



## ☕ Usando sua Conta365

Para usar:

### Endpoint de usuários
```
Utilize o endpoint "/user" do tipo POST  para criar seu usuário, no corpo da requisição deve
 haver um objeto com o seguinte formato:
{ "nome":"seu nome aqui",
  "email":seuemail@nesseformato.com"}
Seu nome não deve conter números e nem caracteres especiais, e o email deve ser no formato
 orientado,
caso tenha alguma informação incorreta, recebera uma mensagem de erro.

Voce pode atualizar seu usuário pelo endpoint "/user/id" do PATCH passando seu id, 
e no corpo da requisição devera conter o objeto com a informação a ser atualizada, 
é necessário apenas a informação a ser atualizada.

Para ver dados dos usuários utilize o endpoint "/user" do tipo GET para receber os 
dados de todos os usuários
```
### Endpoint de finanças
```
Utilize o endpoint "/finance/userid" do tipo GET para receber todas as despesas
do usuário selecionado, retornará uma mensagem com os gastos ou mensagem adequada

Utilize o endpoint "/finance/userid" do tipo POST para passar o arquivo excel
com os gastos feitos,o arquivo deve conter as colunas price, typeofexpenses, date, e name,
onde cada um representa respectivamente o preço gasto, o tipo de gasto, quando foi gasto e
qual o nome do pagamento.
Todos os campos são obrigatórios, em caso de divergência retornará mensagem adequada,
caso esteja correto retorna todas as despesas do usuário.

Utilize o endpoint "finance/userid/financeid" do tipo DELETE para deletar alguma despesa,
caso algum dos id's sejam inexistentes retorna mensagem adequada, caso de sucesso retorna
as despesa sem a que foi deletada.

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
Com Objetivo educacional, a ideia é desenvolver uma 
API REST, para trabalhar a manipulação de arquivos estáticos,
recebimento de arquivos por requisição http, trabalhar os retornos corretos para o usuário
e tratar os erros e documentar utilizando Swagger 
```