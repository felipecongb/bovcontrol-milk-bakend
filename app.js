const express = require('express');
const { MongoClient } = require('mongodb');
const userRoutes = require('./routes');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conectar ao MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'meuBanco';
let db;

MongoClient.connect(url, (err, client) => {
    if (err) return console.error(err);
    db = client.db(dbName);
    console.log(`Conectado ao banco de dados: ${dbName}`);
    
    // Iniciar o servidor após a conexão com o banco de dados
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
});

// Usar as rotas
app.use('/users', (req, res, next) => {
    req.db = db;
    next();
}, userRoutes);

module.exports = app;