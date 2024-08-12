import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Milk Supply API',
            version: '1.0.0',
            description: 'API para gerenciamento de usuários e fornecimento de leite',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Caminho para os arquivos de rotas e controladores
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerDocs;