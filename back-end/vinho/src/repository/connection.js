import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({

});

console.log(`Conexão realizada com sucesso  Banco de dados `);
export default connection;