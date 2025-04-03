import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.MYSQL_DATABASE,
    user: process.MYSQL_USER,
    password: process.MYSQL_PASSWORD,
    typecast: function(field, next) {
        if(field.type === 'DATE') {
            const date = new Date(field.string());
            
            const dia = (`0${date.getDate() + 1}`).slice(-2);
            const mes = (`0${date.getMonth() + 1}`).slice(-2);
            const ano = date.getFullYear();

            return `${dia}/${mes}/${ano}`;
        } else {
            return next();
        }
    }
});

console.log(`--> Conexão ao Banco de dados realizada com sucesso`);
export default connection;