import connection from "../connection.js";

/**
 * Função para inserir a relação entre os endereços e os clientes no banco de dados
 * 
 * @param {JSON} enderecoCliente - Recebe um objeto com os dados necessários para a inserção
 * 
 * @returns Retorna o id que foi foi gerado
 */
export async function  inserirEnderecoCliente(enderecoCliente) {
    try {
        const comando = `INSERT INTO endereco_cliente (endereco_id, 
                                                       cliente_id, 
                                                       numero, 
                                                       complemento)
                            VALUES((SELECT id_endereco FROM endereco WHERE cep = ?), 
                                    (SELECT id_cliente FROM cliente WHERE cpf = ?), ?, ?);`;

        await connection.query(comando, [
            enderecoCliente.endereco,
            enderecoCliente.cliente,
            enderecoCliente.numero,
            enderecoCliente.complemento
        ]);

        return {
            cep_inserido: enderecoCliente.endereco,
            cpf_inserido: enderecoCliente.cliente
        };

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para alterar o endereço do cliente
 * 
 * @param {JSON} enderecoCliente - Recebe as informações necessárias para a alteração
 * 
 * @returns Retorna a quantidade de linhas que foram afetadas pela alteração 
 */
export async function alterarEnderecoCliente(endereco, cliente, enderecoCliente) {
    try {
        const comando = ` UPDATE endereco_cliente SET endereco_id = (SELECT id_endereco FROM endereco WHERE cep = ?), 
                                                      cliente_id = (SELECT id_cliente FROM cliente WHERE cpf = ?),
                                                      numero = ?,
                                                      complemento = ?
                            WHERE (endereco_id = (SELECT id_endereco FROM endereco WHERE cep = ?) 
                                AND cliente_id = (SELECT id_cliente FROM cliente WHERE cpf = ?))`;

        const [resposta] = await connection.query(comando, [
            enderecoCliente.endereco,
            enderecoCliente.cliente,
            enderecoCliente.numero,
            enderecoCliente.complemento,
            endereco,
            cliente
        ]);

        return resposta.affectedRows;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para remover um endereço do cliente
 * 
 * @param {JSON} enderecoCliente - Recebe as informações necessárias para remover o endereço do cliente
 * 
 * @returns Retorna a quantidade de linhas que foram afetadas pela remoção
 */
export async function removerEnderecoCliente(endereco, cliente) {
    try {
        const comando = `DELETE FROM endereco_cliente 
                            WHERE endereco_id = (SELECT id_endereco FROM endereco WHERE cep = ?) AND 
                                  cliente_id = (SELECT id_cliente FROM cliente WHERE cpf = ?)`;

        const [resposta] = await connection.query(comando, [
            endereco,
            cliente
        ]);

        return resposta.affectedRows;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para listar todos os endereços dos clientes criados
 * 
 * @returns Retorna todos os registros encontrados referente aos endereços dos clientes
 */
export async function listarEnderecosCliente() {
    try {
        const comando = `SELECT * from view_listagem_enderecos`;

        const [registros] = await connection.query(comando);
        return registros;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um ou mais endereços dos clientes pelo CEP cadastrado do endereço
 * 
 * @param {String} cep - Recebe o CEP, que será usado para buscar esses registros 
 * 
 * @returns Retorna um ou mais registros encontrados referente a busca realiza
 */
export async function buscarEnderecoClientePorCEP(cep) {
    try {
        const comando = `SELECT * from view_listagem_enderecos 
                            WHERE cep = ?`;

        const [registros] = await connection.query(comando, [cep]);
        return registros;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um ou mais endereços dos clientes pelo CPF dos clientes
 * 
 * @param {String} cpf - Recebe o CPF, que será usado para buscar esses registros 
 * 
 * @returns Retorna um ou mais registros encontrados referente a busca realiza
 */
export async function buscarEnderecoClientePorCPF(cpf) {
    try {
        const comando = `SELECT * from view_listagem_enderecos
                            WHERE cpf = ?`;

        const [registros] = await connection.query(comando, [cpf]);
        return registros;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}