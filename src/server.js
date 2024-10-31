import 'dotenv/config'; // Carrega as variáveis do arquivo .env automaticamente
import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter.js';
import accountRouter from './routers/accountRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import welcome from './controllers/welcome.js';
import { ENVIRONMENT, PORT, HOST } from './config.js';
import logger from './middlewares/logger.js';

const app = express();

// Middlewares
app.use(logger);
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', welcome);                // Rota principal
app.use('/auth', authRouter);         // Rotas de autenticação
app.use('/account', accountRouter);   // Rotas de contas

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando no ambiente ${ENVIRONMENT} em ${ENVIRONMENT === 'production' ? HOST : `${HOST}:${PORT}`}`);
});
