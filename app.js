import express from 'express';
import { MongoClient } from 'mongodb';
import userRoutes from './src/routes/index.js';
import dotenv from 'dotenv';
import swaggerDocs from './swaggerConfig.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware para processar JSON

const url = process.env.MONGODB_URL || 'mongodb://admin:secret@localhost:27017';
const dbName = process.env.DB_NAME || 'MilkSupply';
let db;

const connectToDatabase = async () => {
    try {
        const client = await MongoClient.connect(url);
        db = client.db(dbName);
        console.log(`Conectado ao banco de dados: ${dbName}`);
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        process.exit(1); // Encerra o processo em caso de erro
    }
};

const startServer = () => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
};

const init = async () => {
    await connectToDatabase();
    startServer();
};

app.use((req, res, next) => {
    req.db = db;
    next();
});

// Defina a rota POST para a URL raiz
app.post('/', (req, res) => {
    res.status(200).send('Requisição POST recebida com sucesso!');
});

app.use('/farmers', userRoutes);

swaggerDocs(app);

init();

export default app;