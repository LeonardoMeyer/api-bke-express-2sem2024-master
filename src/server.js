import express from 'express'
import authRouter from './routers/authRouter.js'
import accountRouter from './routers/accountRouter.js'
import { ENVIRONMENT, PORT, HOST } from './config.js'
import cors from 'cors';
import logger from './middlewares/logger.js';

const app = express()
app.use(logger)
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.get('/', (req, res) => {res.json({message: "Bem-vindo a API!"})})

app.use('/auth', authRouter)
app.use('/account', accountRouter)

app.listen(PORT, () => {
    console.log(`Servidor Rodando no ambiente ${ENVIRONMENT} em ${ ENVIRONMENT == 'production' ? HOST : HOST+':'+PORT }`)
})