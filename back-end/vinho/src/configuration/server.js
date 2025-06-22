import '../app/utils/global.js'

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import adicionarRotas from './routers.js';

const servidor = express();

servidor.use(express.json());
servidor.use(cors());

// Adicionando as rotas dos end-points
adicionarRotas(servidor);

const PORTA = process.env.PORTA;
servidor.listen(
    PORTA,
    () => console.log(`API subiu na porta ${PORTA} com sucesso`));