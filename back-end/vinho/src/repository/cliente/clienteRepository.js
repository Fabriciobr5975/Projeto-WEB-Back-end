import connection from "../connection.js";

/**
 * Função que deve inserir um novo cliente no banco de dados
 * 
 * @param {JSON} cliente - Objeto que terá os atributos necessários para a inserção do cliente
 * 
 * @returns Retorna o id do cliente, caso ele seja inserido
 */
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

/**
 * Função para alterar um cliente que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idCliente - ID (PF) do cliente que será alterado 
 * @param {JSON} cliente - Objeto com os dados necessários para alterar um cliente
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a alteração do cliente 
 */
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

/**
 * Função para remover um cliente que tenha sido inserido no banco de dados
 * 
 * @param {Number} idCliente - ID (PK) do carrinho que será excluído
 *  
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção
 */
export async function removerCliente(idCliente) {
    const comando = `DELETE FROM cliente WHERE id_cliente = ?`;

    const [resposta] = await connection.query(comando, [idCliente]);
    return resposta.affectedRows
}

/**
 * Função para listar todos os clientes que foram criados e estão salvos no banco de dados 
 * 
 * @returns Retorna um objeto JSON contendo os clientes que foram encontrados
 */
export async function listarClientes() {
    const comando = `SELECT * FROM view_listagem_cliente`;
 
    const[registros] = await connection.query(comando);
    return registros;
}

/**
 * Função para buscar um cliente salvo pelo seu id
 * 
 * @param {JSON} idCliente - ID (PK) do carrinho que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo o cliente que foi buscado, caso o id seja válido
 */
export async function buscarClientesPorId(idCliente) {
    const comando = `SELECT * FROM view_listagem_cliente WHERE id_cliente = ?`;
 
    const[registro] = await connection.query(comando, [idCliente]);
    return registro;
}

/**
 * Função para buscar clientes pelo nome
 * 
 * @param {String} nome - Recebe o nome que será usando no busca
 *  
 * @returns Retorna um objeto JSON, contendo um ou mais clientes que foram buscado 
 */
export async function buscarClientesPorNome(nome) {
    const comando = `SELECT * FROM view_listagem_cliente WHERE nome_completo LIKE % ?`;
 
    const[registros] = await connection.query(comando, [nome]);
    return registros;
}

/**
 * Função para buscar um cliente pelo seu email
 * 
 * @param {String} email - Recebe o email que será usando no busca 
 * 
 * @returns Retorna um objeto JSON, contendo o cliente que foi buscado
 */
export async function buscarClientesPorEmail(email) {
    const comando = `SELECT * FROM view_listagem_cliente WHERE email = ?`;
 
    const[registro] = await connection.query(comando, [email]);
    return registro;
}

/**
 * Função para buscar um cliente pelo seu cpf
 * 
 * @param {String} cpf - Recebe o cpf que será usando no busca
 * 
 * @returns Retorna um objeto JSON, contendo o cliente que foi buscado
 */
export async function buscarClientesPorCpf(cpf) {
    const comando = `SELECT * FROM view_listagem_cliente WHERE cpf = ?`;
 
    const[registro] = await connection.query(comando, [cpf]);
    return registro;
}

/**
 * Função para buscar um cliente pelo seu ceo
 * 
 * @param {String} cep - Recebe o cep que será usando no busca
 * 
 * @returns Retorna um objeto JSON, contendo um ou mais clientes que foram buscado
 */
export async function buscarClientesPorCep(cep) {
    const comando = `SELECT * FROM view_listagem_cliente WHERE cep = ?`;
 
    const[registro] = await connection.query(comando, [cep]);
    return registro;
}
