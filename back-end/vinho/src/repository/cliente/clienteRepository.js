import connection from "../connection.js";

export async function inserirCliente(cliente) {
    const comando = `
        INSERT INTO cliente (nome,
                             sobrenome,
                             cpf,
                             data_nascimento,
                             endereco_fk,
                             email,
                             senha,
                             celular)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [resposta] = await connection.query(comando, [
        cliente.nome,
        cliente.sobrenome,
        cliente.cpf,
        cliente.data_nascimento,
        cliente.endereco,
        cliente.email,
        cliente.senha,
        cliente.celular 
    ]);

    return resposta.insertId;
}

export async function alterarCliente(idCliente, cliente) {
    const comando = `
        UPDATE cliente 
            SET nome = ?,
                sobrenome = ?,
                cpf = ?,
                data_nascimento = ?,
                endereco_fk = ?,
                email = ?,
                senha = ?,
                celular = ?
        WHERE id_cliente = ?
    `;

    const [resposta] = await connection.query(comando, [
        cliente.nome,
        cliente.sobrenome,
        cliente.cpf,
        cliente.data_nascimento,
        cliente.endereco,
        cliente.email,
        cliente.senha,
        cliente.celular,
        idCliente 
    ]);

    return resposta.affectedRows;
}

export async function removerCliente(idCliente) {
    const comando = `DELETE FROM cliente WHERE id_cliente = ?`;

    const [resposta] = await connection.query(comando, [idCliente]);
    return resposta.affectedRows
}

export async function listarClientes() {
    const comando = `SELECT * FROM view_listagem_cliente`;
 
    const[registros] = await connection.query(comando);
    return registros;
}

export async function buscarClientesPorId() {
    const comando = `SELECT * FROM view_listagem_cliente WHERE id_cliente = ?`;
 
    const[registro] = await connection.query(comando);
    return registro;
}

export async function buscarClientesPorNome(nome) {
    const comando = `SELECT * FROM view_listagem_cliente WHERE nome_completo LIKE % ?`;
 
    const[registros] = await connection.query(comando, [nome]);
    return registros;
}

export async function buscarClientesPorEmail(email) {
    const comando = `SELECT * FROM view_listagem_cliente WHERE email = ?`;
 
    const[registro] = await connection.query(comando, [email]);
    return registro;
}

export async function buscarClientesPorCpf(cpf) {
    const comando = `SELECT * FROM view_listagem_cliente WHERE cpf = ?`;
 
    const[registro] = await connection.query(comando, [cpf]);
    return registro;
}

export async function buscarClientesPorCep(cep) {
    const comando = `SELECT * FROM view_listagem_cliente WHERE cep = ?`;
 
    const[registro] = await connection.query(comando, [cep]);
    return registro;
}
