import connection from "../../../configuration/connection.js";

/**
 * Função para inserir um novo item do pedido no banco de dados
 * 
 * @param {JSON} itensPedido - Objeto que terá os atributos necessários para inserção do item do pedido
 *  
 * @returns Retorna o id do item do pedido, caso ele seja inserido 
 */
export async function inserirItemPedido(itensPedido) {
    const comando = `INSERT INTO itens_pedido (pedido_fk, vinho_fk, quantidade)  
                        VALUES (?, ?, ?)`;

    const [resposta] = await connection.query(comando, [
        itensPedido.pedido,
        itensPedido.vinho,
        itensPedido.quantidade
    ]);

    return resposta.insertId;
}

/**
 * Função para alterar um item do pedido que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idPedido - Recebe o id do item do pedido que será alterado
 * @param {JSON} pedido - Objeto que terá os atributos necessários para alteração do item do pedido
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a alteração do item do pedido
 */
export async function alterarItemPedido(idItemPedido, itensPedido) {
    const comando = `
        UPDATE pedido 
            SET pedido_fk = ?, 
                vinho_fk = ?,
                quantidade = ?,
        WHERE id_itens_pedido = ?
    `;

    const [resposta] = await connection.query(comando, [
        itensPedido.pedido,
        itensPedido.vinho,
        itensPedido.quantidade,
        idItemPedido
    ]);

    return resposta.affectedRows;
}

/**
 * Função para remover um item do pedido salvo no banco de dados
 * 
 * @param {Number} idPedido - Recebe o id do item do pedido que será removido
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção do item do pedido 
 */
export async function removerItemPedido(idItemPedido) {
    const comando = `DELETE FROM itens_pedido WHERE id_itens_pedido = ?`;

    const [resposta] = await connection.query(comando, [idItemPedido]);
    return resposta.affectedRows;
}

/**
 * Função para listar todos os itens do pedido que estão salvos no banco de dados
 * 
 * @returns Retorna todos os itens do pedido que foram encontrados
 */
export async function listarItensPedido() {
    const comando = `SELECT * FROM view_listagem_itens_pedido`;

    const [registros] = await connection.query(comando);
    return registros;
}

/**
 * Função para buscar um item do pedido pelo seu id
 * 
 * @param {Number} idPedido - Recebe o id do item do pedido que será usado na busca 
 * 
 * @returns Retorna um objeto JSON, contendo o item do pedido que foi buscado 
 */
export async function buscarItemPedidoPorId(idItemPedido) {
    const comando = `SELECT * FROM view_listagem_itens_pedido 
                     WHERE id_itens_pedido = ?`;

    const [registro] = await connection.query(comando, [idItemPedido]);
    return registro;
}

/**
 * Função para buscar um item do pedido pelo seu pedido
 * 
 * @param {Number} idPedido - Recebe o id do item do pedido que será usado na busca 
 * 
 * @returns Retorna um objeto JSON, contendo o item do pedido que foi buscado 
 */
export async function buscarItemPedidoPorPedido(idPedido) {
    const comando = `SELECT * FROM view_listagem_itens_pedido 
                     WHERE id_pedido = ?`;

    const [registro] = await connection.query(comando, [idPedido]);
    return registro;
}


/**
 * Função para buscar os itens do pedido através do cpf do cliente 
 * 
 * @param {String} cpfCliente - Recebe o cpf do cliente que será usado na busca
 * 
 * @returns Retorna um objeto JSON, contendo um ou vários itens do pedido que foram buscados
 */
export async function buscarItensPedidoPeloCliente(cpfCliente) {
    const comando = `SELECT * FROM view_listagem_itens_pedido 
                     WHERE cpf = ?`;

    const [registros] = await connection.query(comando, [cpfCliente]);
    return registros;
}

/**
 * Função para buscar os itens do pedido através do id do vinho
 * 
 * @param {Number} idVinho - Recebe o id do vinho que será usado na busca
 * 
 * @returns Retorna um objeto JSON, contendo um ou vários itens do pedido que foram buscados
 */
export async function buscarItensPedidoPorVinho(idVinho) {
    const comando = `SELECT * FROM view_listagem_itens_pedido
                     WHERE id_vinho = ?`;

    const [registros] = await connection.query(comando, [idVinho]);
    return registros;
}
