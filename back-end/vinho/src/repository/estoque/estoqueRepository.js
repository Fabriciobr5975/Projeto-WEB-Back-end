import connection from "../connection.js";

/**
 * Função para inserir um novo estoque no banco de dados
 * 
 * @param {JSON} estoque - Objeto que terá os atributos necessários para a inserção do estoque
 * 
 * @returns Retorna o id do estoque, caso ele seja inserido
 */
export async function inserirEstoque(estoque) {
    const comando = `
        INSERT INTO estoque (vinho_fk, quantidade, status_estoque)
            VALUES (?, ?, ?);
    `;

    const [resposta] = await connection.query(comando, [
        estoque.vinho,
        estoque.quantidade,
        estoque.status_estoque
    ]);

    return resposta.insertId;
}

/**
 * Função para alterar um estoque que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idEstoque - Recebe o id do estoque que será alterado 
 * @param {JSON} estoque - Objeto que terá os atributos necessários para a alteração do estoque
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a alteração do estoque 
 */
export async function alterarEstoque(idEstoque, estoque) {
    const comando = `
        UPDATE estoque 
            SET vinho_fk = ?, 
                quantidade = ?, 
                status_estoque = ? 
        WHERE id_estoque = ?
    `;

    const [resposta] = await connection.query(comando, [
        estoque.vinho,
        estoque.quantidade,
        estoque.status_estoque,
        idEstoque
    ]);

    return resposta.affectedRows;
}

/**
 * Função para remover um estoque salvo no banco de dados
 * 
 * @param {Number} idEstoque - Recebe o id do estoque que será removido
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção do estoque 
 */
export async function removerEstoque(idEstoque) {
    const comando = `DELETE FROM estoque WHERE id_estoque = ?`;

    const [resposta] = await connection.query(comando, [idEstoque]);
    return resposta.affectedRows;
}

/**
 * Função para listar todos os estoque que estão salvos no banco de dados
 * 
 * @returns Retorna todos os carrinhos que foram encontrados
 */
export async function listarEstoque() {
    const comando = `SELECT * FROM view_listagem_estoque`;

    const [registros] = await connection.query(comando);
    return registros;
}

/**
 * Função para buscar um estoque pelo seu id
 * 
 * @param {Number} idEstoque - Recebe o id do estoque que será usado na busca
 *  
 * @returns Retorna um objeto JSON, contendo o estoque que foi buscado
 */
export async function buscarEstoquePorId(idEstoque) {
    const comando = `SELECT * FROM view_listagem_estoque WHERE id_estoque = ?`;

    const [registro] = await connection.query(comando, [idEstoque]);
    return registro;
}

/**
 * Função para buscar os estoques a partir do campo status
 * 
 * @param {String} status - Recebe o status que será usado na busca 
 * 
 * @returns Retorna um objeto JSON, contendo um ou vários estoques que foram buscados
 */
export async function buscarEstoquePorStatus(status) {
    const comando = `SELECT * FROM view_listagem_estoque WHERE status_estoque = ?`;

    const [registros] = await connection.query(comando, [status]);
    return registros;
}

/**
 * Função para buscar os estoques a patir do campo vinho
 * 
 * @param {String} vinho - Recebe o nome do vinho que será usado na busca
 * 
 * @returns Retorna um objeto JSON, contendo um ou vários estoques que foram buscados
 */
export async function buscarEstoquePorVinho(vinho) {
    const comando = `SELECT * FROM view_listagem_estoque WHERE vinho LIKE ?`;

    const [registros] = await connection.query(comando, [`%${vinho}%`]);
    return registros;
}

/**
 * Função para buscar os estoques a patir do campo quantidade
 * 
 * @param {Number} quantidade - Recebe a quantidade do estoque que será usado na busca 
 * 
 * @returns Retorna um objeto JSON, contendo um ou vários estoques que foram buscados
 */
export async function buscarEstoquePorQuantidade(quantidade) {
    const comando = `SELECT * FROM view_listagem_estoque WHERE quantidade_estoque = ?`;

    const [registros] = await connection.query(comando, [quantidade]);
    return registros;
}

/**
 * Função para buscar os estoques a patir do campo safra
 * 
 * @param {String} safra - Recebe o ano da safra que será usado na busca 
 * 
 * @returns Retorna um objeto JSON, contendo um ou vários estoques que foram buscados
 */
export async function buscarEstoquePorSafra(safra) {
    const comando = `SELECT * FROM view_listagem_estoque WHERE safra_vinho = ?`;

    const [registro] = await connection.query(comando, [safra]);
    return registro;
}