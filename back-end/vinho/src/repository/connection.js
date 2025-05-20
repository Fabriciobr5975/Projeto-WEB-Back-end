import mysql from 'mysql2/promise'

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Criando a conexxão com o BD e realizando algumas configurações 
 * no typeCast
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sslCertPath = path.join(__dirname, '..', 'database', 'DigiCertGlobalRootG2.crt.pem');

/**
 * Criando a conexxão com o BD e realizando algumas configurações 
 * no typeCast
 */
const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true,
    ssl: {
        ca: fs.readFileSync(sslCertPath),
        rejectUnauthorized: false
    },
    typeCast: function (field, next) {
        if (field.type === "TINY" && field.length === 1) {
            return(field.string() === "1");

        } else if(field.type === 'DATE') {
            const date = new Date(field.string());
            
            const dia = (`0${date.getDate() + 1}`).slice(-2);
            const mes = (`0${date.getMonth() + 1}`).slice(-2);
            const ano = date.getFullYear();

            return `${ano}-${mes}-${dia}`;
        } else {
            return next();
        }
    }
});

console.log(`--> Conexão ao Banco de dados realizada com sucesso`);
export default connection;