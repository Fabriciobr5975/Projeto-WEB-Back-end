import connection from "../connection.js";

/**
 * Função que deve inserir um novo endereço no banco de dados 
 * 
 * @param {JSON} endereco - Objeto que terá os atributos necessários para inserção do endereço
 *  
 * @returns Retorna o id do endereço, caso ele seja inserido
 */
export async function inserirEndereco(endereco) {
    const comando = `
        INSERT INTO endereco (logradouro,
                              numero,
                              complemento, 
                              bairro, 
                              cidade, 
                              uf_estado, 
                              cep)
            VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const [resposta] = await connection.query(comando, [
        endereco.logradouro,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        endereco.localidade,
        endereco.uf,
        endereco.cep
    ]);

    return resposta.insertId;
}

/**
 * Função para alterar um endereçi que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idEndereco - ID (PK) do endereço que será alterado 
 * @param {JSON} endereco - Objeto com os dados necessários para alterar um pais
 * 
 * @returns Retorna a quantidade de linhas que foram alterados após a alterações do endereço
 */
export async function alterarEndereco(idEndereco, endereco) {
    const comando = `
        UPDATE endereco 
            SET logradouro = ?,
                numero = ?,
                complemento = ?, 
                bairro = ?, 
                cidade = ?, 
                uf_estado = ?, 
                cep = ?
        WHERE id_endereco = ?
    `;

    const [resposta] = await connection.query(comando, [
        endereco.logradouro,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        endereco.localidade,
        endereco.uf,
        endereco.cep,
        idEndereco
    ]);

    return resposta.affectedRows;
}

/**
 * Função para remover um endereço que tenha sido inserido no banco de dados
 * 
 * @param {Number} idEndereco - ID (PK) do pais que será excluído 
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção do endereço
 */
export async function removerEndereco(idEndereco) {
    const comando = `DELETE FROM endereco WHERE id_endereco = ?`;

    const [resposta] = await connection.query(comando, [idEndereco]);
    return resposta.affectedRows;
}

/**
 * Função para listar todos os endereços que foram criados e estão salvos no banco de dados
 * 
 * @returns Retorna um objeto JSON contendo todos os endereço que foram encontrado
 */
export async function listarEnderecos() {
    const comando = `SELECT * FROM endereco`;

    const [registros] = await connection.query(comando);
    return registros;
}

/**
 * Função para buscar um endereço pelo seu id
 * 
 * @param {Number} idEndereco - ID (PK) do endereço que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo o endereço que foi buscado, caso o id seja válido 
 */
export async function buscarEnderecoPorId(idEndereco) {
    const comando = `SELECT * FROM endereco WHERE id_endereco = ?`;

    const [registro] = await connection.query(comando, [idEndereco]);
    return registro;
}

/**
 * Função para buscar um endereço pelo seu cep
 * 
 * @param {String} cep - Recebe o cep para a busca do endereço
 *  
 * @returns Retorna um objeto JSON contendo o endereço que foi buscado, caso o cep seja válido 
 */
export async function buscarEnderecoPorCep(cep) {
    const comando = `SELECT * FROM endereco WHERE cep = ?`;

    const [registro] = await connection.query(comando, [cep]);
    return registro;
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
    const comando = `SELECT * FROM endereco WHERE cidade = ?`;

    const [registros] = await connection.query(comando, [cidade]);
    return registros;
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
    const comando = `SELECT * FROM endereco WHERE logradouro LIKE ?`;

    const [registros] = await connection.query(comando, [`%${logradouro}%`]);
    return registros;
}

/**
 * Função para buscar um ou mais endereços pela UF do estado
 * 
 * @param {String} uf - Recebe a UF do estado para a busca do endereço
 * 
 * @returns Retorna um objeto JSON contendo um ou mais endereços que foram buscados, caso a UF do estado
 * seja válido 
 */
export async function buscarEnderecoPorUF(uf) {
    const comando = `SELECT * FROM endereco WHERE uf_estado = ?`;

    const [registro] = await connection.query(comando, [uf]);
    return registro;
}