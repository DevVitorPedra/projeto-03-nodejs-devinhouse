const swaggerAutogen = require('swagger-autogen')()

const endpoints = ['./src/server.js']

const doc = {
    info: {
      title: 'DEVinBank',
      description: 'Description',
    },
    host: 'localhost:3333',
    schemes: ['http'],
  };
  const outputFile = './swagger_output.json'
swaggerAutogen(outputFile,endpoints,doc)