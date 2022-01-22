const swaggerAutogen = require('swagger-autogen')()

const endpoints = ['./index.js']

const doc = {
    info: {
      title: 'DEVinBank',
      description: 'Projeto Conta365, tem a finalidade de avaliar o conhecimento em NodeJS atráves da criação de APIs, manipulação de arquivos e capacidade de elaboração de soluções para problemas, e também criação de documentações. Esta API foi desenvolvida por Vitor dos Santos Pedra',
    },
    //host: 'warm-inlet-55774.herokuapp.com',
    host:'localhost:3333',
    schemes: ['http'],
    default:['http']
  };
  const outputFile = './swagger_output.json'
swaggerAutogen(outputFile,endpoints,doc)