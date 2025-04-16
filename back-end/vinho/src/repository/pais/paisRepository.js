import connection from '../connection.js'

/**
 * Função que deve inserir um novo pais no banco de dados
 * 
 * @param {JSON} pais - Objeto que terá os atributos necessários para inserção do pais
 * 
 * @returns Retorna o id do pais, caso ele seja inserido
 */
export async function inserirPais(pais) {
    try {
        const comando = `
        INSERT INTO pais (pais, sigla)
            VALUES (?, ?);
    `;

        const [resposta] = await connection.query(comando, [pais.pais, pais.sigla]);
        return resposta.insertId;

    } catch (err) {

    }
}

/**
 * Função para alterar um pais que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idPais - ID (PK) do pais que será alterado
 * @param {JSON} pais - Objeto com os dados necessários para alterar um pais
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a alteração do pais
 */
export async function alterarPais(idPais, pais) {
    try {
        const comando = `
        UPDATE pais 
            SET pais = ?,
            sigla = ?
        WHERE id_pais = ?
    `;

        const [resposta] = await connection.query(comando, [pais.pais, pais.sigla, idPais]);
        return resposta.affectedRows;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para remover um pais que tenha sido inserido no banco de dados
 * 
 * @param {Number} idPais - ID (PK) do pais que será excluído
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção do pais
 */
export async function removerPais(idPais) {
    const comando = `DELETE FROM pais WHERE id_pais = ?`;

    const [resposta] = await connection.query(comando, [idPais]);
    return resposta.affectedRows;
}

/**
 * Função para listar todos os paises que foram criados e estão salvos no banco de dados
 * 
 * @returns Retorna um objeto JSON contendo todos os pais que foram encontrados
 */
export async function listarPaises() {
    const comando = `SELECT * FROM pais`;

    const [registros] = await connection.query(comando);
    return registros;
}

/**
 * Função para buscar um pais salvo pelo seu id 
 * 
 * @param {Number} idPais - ID (PK) do pais que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo o pais que foi buscado, caso o id seja válido 
 */
export async function buscarPaisPorId(idPais) {
    const comando = `SELECT * FROM pais WHERE id_pais = ?`;

    const [registro] = await connection.query(comando, [idPais]);
    return registro;
}

/**
 * Função para buscar um pais ou mais paises usando um nome
 * 
 * @param {String} nomePais - Recebe o nome de uma pais que será buscado
 * 
 * @returns Retorna um objeto JSON contendo um ou mais paises, caso o nome passado faça referencia a um pais
 */
export async function buscarPaisPorNome(nomePais) {
    const comando = `SELECT * FROM pais WHERE pais LIKE ?`;

    const [registros] = await connection.query(comando, [`%${nomePais}%`]);
    return registros;
}

/**
 * Função para buscar um pais pela sua sigla
 * 
 * @param {String} siglaPais - Recebe a sigla do pais que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo o pais, caso a sigla passada seja válida e esteja presente em algum pais
 */
export async function buscarPaisPorSigla(siglaPais) {
    const comando = `SELECT * FROM pais WHERE sigla = ?`;

    const [registro] = await connection.query(comando, [siglaPais]);
    return registro;
}
