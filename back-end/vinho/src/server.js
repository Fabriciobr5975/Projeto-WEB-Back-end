import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import adicionarRotas from './routers';

const servidor = express();

servidor.use(express.json());
servidor.use(cors());

// Adicionando as rotas dos end-points
adicionarRotas(servidor);

PORT = process.env.PORT;
servidor.listen(
    PORT,
    () => console.log(`API subiu na porta ${PORT} com sucesso`));