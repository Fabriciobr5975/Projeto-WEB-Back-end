import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const servidor = express();

servidor.use(express.json());
servidor.use(cors());

PORT = process.env.PORT;
servidor.listen(
    PORT, 
    () => console.log(`API subiu na porta ${PORT} com sucesso`));