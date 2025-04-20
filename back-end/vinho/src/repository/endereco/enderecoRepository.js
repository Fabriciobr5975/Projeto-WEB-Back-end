import connection from "../connection.js";

/**
 * Função que deve inserir um novo endereço no banco de dados 
 * 
 * @param {JSON} endereco - Objeto que terá os atributos necessários para inserção do endereço
 *  
 * @returns Retorna o id do endereço, caso ele seja inserido
 */
export async function inserirEndereco(endereco) {
    try {
        const comando = `INSERT INTO endereco (logradouro,
                                               bairro, 
                                               localidade, 
                                               uf, 
                                               cep)
                            VALUES (?, ?, ?, ?, ?);
    `;

        const [resposta] = await connection.query(comando, [
            endereco.logradouro,
            endereco.bairro,
            endereco.localidade,
            endereco.uf,
            endereco.cep
        ]);

        return resposta.insertId;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para alterar um endereço que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idEndereco - ID (PK) do endereço que será alterado 
 * @param {JSON} endereco - Objeto com os dados necessários para alterar um pais
 * 
 * @returns Retorna a quantidade de linhas que foram alterados após a alterações do endereço
 */
export async function alterarEndereco(idEndereco, endereco) {
    try {
        const comando = ` UPDATE endereco 
                            SET logradouro = ?,
                                bairro = ?, 
                                logradouro = ?, 
                                uf = ?, 
                                cep = ?
                            WHERE id_endereco = ?`;

        const [resposta] = await connection.query(comando, [
            endereco.logradouro,
            endereco.bairro,
            endereco.localidade,
            endereco.uf,
            endereco.cep,
            idEndereco
        ]);

        return resposta.affectedRows;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para remover um endereço que tenha sido inserido no banco de dados
 * 
 * @param {Number} idEndereco - ID (PK) do pais que será excluído 
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção do endereço
 */
export async function removerEndereco(idEndereco) {
    try {
        const comando = `DELETE FROM endereco WHERE id_endereco = ?`;

        const [resposta] = await connection.query(comando, [idEndereco]);
        return resposta.affectedRows;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para listar todos os endereços que foram criados e estão salvos no banco de dados
 * 
 * @returns Retorna um objeto JSON contendo todos os endereço que foram encontrado
 */
export async function listarEnderecos() {
    try {
        const comando = `SELECT * FROM endereco`;

        const [registros] = await connection.query(comando);
        return registros;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um endereço pelo seu id
 * 
 * @param {Number} idEndereco - ID (PK) do endereço que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo o endereço que foi buscado, caso o id seja válido 
 */
export async function buscarEnderecoPorId(idEndereco) {
    try {
        const comando = `SELECT * FROM endereco WHERE id_endereco = ?`;

        const [registro] = await connection.query(comando, [idEndereco]);
        return registro;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um endereço pelo seu cep
 * 
 * @param {String} cep - Recebe o cep para a busca do endereço
 *  
 * @returns Retorna um objeto JSON contendo o endereço que foi buscado, caso o cep seja válido 
 */
export async function buscarEnderecoPorCep(cep) {
    try {
        const comando = `SELECT * FROM endereco WHERE cep = ?`;

        const [registro] = await connection.query(comando, [cep]);
        return registro;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um ou mais endereços pela cidade
 * 
 * @param {String} cidade - Recebe a cidade para a busca do endereço
 * 
 * @returns Retorna um objeto JSON contendo um ou mais endereços que foram buscados, caso a cidade
 * seja válida
 */
export async function buscarEnderecoPorCidade(cidade) {
    try {
        const comando = `SELECT * FROM endereco WHERE localidade = ?`;

        const [registros] = await connection.query(comando, [cidade]);
        return registros;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um ou mais endereços pelo logradouro
 * 
 * @param {String} logradouro - Recebe o logradouro para a busca do endereço
 *  
 * @returns Retorna um objeto JSON contendo um ou mais endereços que foram buscados, caso o logradouro
 * seja válido 
 */
export async function buscarEnderecoPorLogradouro(logradouro) {
    try {
        const comando = `SELECT * FROM endereco WHERE logradouro LIKE ?`;

        const [registros] = await connection.query(comando, [`%${logradouro}%`]);
        return registros;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um ou mais endereços pela UF
 *  
 * @param {String} uf - Recebe a UF para a busca do endereço
 * 
 * @returns Retorna um objeto JSON contendo um ou mais endereços que foram buscados, caso a UF 
 * seja válido 
 */
export async function buscarEnderecoPorUF(uf) {
    try {
        const comando = `SELECT * FROM endereco WHERE uf = ?`;

        const [registro] = await connection.query(comando, [uf]);
        return registro;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}