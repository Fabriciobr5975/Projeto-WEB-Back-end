import connection from "../connection.js";

/**
 * Função que deve inserir um novo cliente no banco de dados
 * 
 * @param {JSON} cliente - Objeto que terá os atributos necessários para a inserção do cliente
 * 
 * @returns Retorna o id do cliente, caso ele seja inserido
 */
export async function inserirClienteSemEndereco(cliente) {
    try {
        const comando = `
          CALL cadastro_usuario (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

        const [resposta] = await connection.query(comando, [
            cliente.nome,
            cliente.sobrenome,
            cliente.cpf,
            cliente.email,
            cliente.senha,
            cliente.celular,
            cliente.logradouro,
            cliente.bairro,
            cliente.localidade,
            cliente.uf,
            cliente.cep,
            cliente.numero,
            cliente.complemento
        ]);

        const mensagem = resposta[0][0]?.mensagem;

        return mensagem;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
* Função que deve inserir um novo cliente com endereço no banco de dados
* 
* @param {JSON} cliente - Objeto que terá os atributos necessários para a inserção do cliente
* 
* @returns Retorna o id do cliente, caso ele seja inserido
*/
export async function inserirClienteComEndereco(cliente) {
    try {
        const comando = `
            CALL cadastro_usuario (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const [resposta] = await connection.query(comando, [
            cliente.nome,
            cliente.sobrenome,
            cliente.cpf,
            cliente.email,
            cliente.senha,
            cliente.celular,
            cliente.logradouro,
            cliente.bairro,
            cliente.localidade,
            cliente.uf,
            cliente.cep,
            cliente.numero,
            cliente.complemento
        ]);

        const mensagem = resposta[0][0]?.mensagem;

        return mensagem;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para alterar um cliente que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idCliente - ID (PK) do cliente que será alterado 
 * @param {JSON} cliente - Objeto com os dados necessários para alterar um cliente
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a alteração do cliente 
 */
export async function alterarCliente(idCliente, cliente) {
    try {
        const comando = `
        UPDATE cliente 
            SET nome = ?,
                sobrenome = ?,
                data_nascimento = ?,
                email = ?,
                celular = ?
        WHERE id_cliente = ?
    `;

        const [resposta] = await connection.query(comando, [
            cliente.nome,
            cliente.sobrenome,
            cliente.data_nascimento,
            cliente.email,
            cliente.celular,
            idCliente
        ]);

        return resposta.affectedRows;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para alterar a senha de um cliente que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idCliente - ID (PK) do cliente que terá a senha alterada 
 * @param {String} novaSenha - Recebe a nova senha que será usada para alterar a senha do cliente
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a alteração da senha do cliente 
 */
export async function alterarSenhaCliente(idCliente, novaSenha) {
    try {
        const comando = `UPDATE cliente 
                            SET senha = ?
                         WHERE id_cliente = ?`;

        const [resposta] = await connection.query(comando, [
            novaSenha,
            idCliente
        ]);

        return resposta.affectedRows;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para remover um cliente que tenha sido inserido no banco de dados
 * 
 * @param {Number} idCliente - ID (PK) do carrinho que será excluído
 *  
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção
 */
export async function removerCliente(idCliente) {
    try {
        const comando = `DELETE FROM cliente WHERE id_cliente = ?`;

        const [resposta] = await connection.query(comando, [idCliente]);
        return resposta.affectedRows

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para listar todos os clientes que foram criados e estão salvos no banco de dados 
 * 
 * @returns Retorna um objeto JSON contendo os clientes que foram encontrados
 */
export async function listarClientes() {
    try {
        const comando = `SELECT * FROM view_cliente`;

        const [registros] = await connection.query(comando);
        return registros;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um cliente salvo pelo seu id
 * 
 * @param {JSON} idCliente - ID (PK) do carrinho que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo o cliente que foi buscado, caso o id seja válido
 */
export async function buscarClientesPorId(idCliente) {
    try {
        const comando = `SELECT * FROM view_cliente WHERE id_cliente = ?`;

        const [registro] = await connection.query(comando, [idCliente]);

        return registro;
    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar clientes pelo nome
 * 
 * @param {String} nome - Recebe o nome que será usando no busca
 *  
 * @returns Retorna um objeto JSON, contendo um ou mais clientes que foram buscado 
 */
export async function buscarClientesPorNome(nome) {
    try {
        const comando = `SELECT * FROM view_cliente WHERE nome_completo LIKE ?`;

        const [registros] = await connection.query(comando, [`%${nome}%`]);
        return registros;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um cliente pelo seu email
 * 
 * @param {String} email - Recebe o email que será usando no busca 
 * 
 * @returns Retorna um objeto JSON, contendo o cliente que foi buscado
 */
export async function buscarClientesPorEmail(email) {
    try {
        const comando = `SELECT * FROM view_cliente WHERE email = ?`;

        const [registro] = await connection.query(comando, [email]);
        return registro;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um cliente pelo seu cpf
 * 
 * @param {String} cpf - Recebe o cpf que será usando no busca
 * 
 * @returns Retorna um objeto JSON, contendo o cliente que foi buscado
 */
export async function buscarClientesPorCpf(cpf) {
    try {
        const comando = `SELECT * FROM view_cliente WHERE cpf = ?`;

        const [registro] = await connection.query(comando, [cpf]);
        return registro;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}
