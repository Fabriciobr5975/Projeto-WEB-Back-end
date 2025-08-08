import '../app/utils/global.js'
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

import adicionarRotas from './routers.js';
import chalk from 'chalk';

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

// Adicionando as rotas dos end-points
adicionarRotas(servidor);

const PORTA_HTTP = process.env.PORTA_HTTP;
const PORTA_HTTPS = process.env.PORTA_HTTPS;

servidor.listen(PORTA_HTTP, () => 
    console.log(">", chalk.greenBright(`API subiu na porta ${chalk.white(PORTA_HTTP)} com sucesso`)));

/*
https.createServer({
    cert: "",
    key: ""
}, servidor).listen(PORTA_HTTPS, () => 
    console.log(">", chalk.greenBright(`API subiu na porta ${chalk.white(PORTA_HTTPS)} com sucesso`)));
*/