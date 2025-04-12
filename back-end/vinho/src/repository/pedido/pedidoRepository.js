import connection from "../connection.js";

/**
 * Função para inserir um novo pedido no banco de dados
 * 
 * @param {JSON} pedido - Objeto que terá os atributos necessários para inserção do pedido
 *  
 * @returns Retorna o id do pedido, caso ele seja inserido 
 */
export async function inserirPedido(pedido) {
    const comando = ` 
        INSERT INTO pedido (itens_carrinho_fk, 
                            endereco_entrega_fk, 
                            valor_total, 
                            status_pedido, 
                            data_pedido) 
            VALUES (?, ?, ?, ?, ?)
        `;

    const [resposta] = await connection.query(comando, [
        pedido.itens_carrinho,
        pedido.endereco_entrega,
        pedido.valor_total,
        pedido.status_pedido,
        pedido.data_pedido
    ]);

    return resposta.insertId;
}

/**
 * Função para alterar um estoque que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idPedido - Recebe o id do pedido que será alterado
 * @param {JSON} pedido - Objeto que terá os atributos necessários para alteração do pedido
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a alteração do pedido
 */
export async function alterarPedido(idPedido, pedido) {
    const comando = `
        UPDATE pedido 
            SET itens_carrinho_fk = ?, 
                endereco_entrega_fk = ?, 
                valor_total = ?, 
                status_pedido = ?, 
                data_pedido = ?
        WHERE id_pedido = ?
    `;

    const [resposta] = await connection.query(comando, [
        pedido.itens_carrinho,
        pedido.endereco_entrega,
        pedido.valor_total,
        pedido.status_pedido,
        pedido.data_pedido,
        idPedido
    ]);

    return resposta.affectedRows;
}

/**
 * Função para remover um estoque salvo no banco de dados
 * 
 * @param {Number} idPedido - Recebe o id do pedido que será removido
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção do pedido 
 */
export async function removerPedido(idPedido) {
    const comando = `DELETE FROM pedido WHERE id_pedido = ?`;

    const [resposta] = await connection.query(comando, [idPedido]);
    return resposta.affectedRows;
}

/**
 * Função para listar todos os pedidos que estão salvos no banco de dados
 * 
 * @returns Retorna todos os pedidos que foram encontrados
 */
export async function listarPedido() {
    const comando = `SELECT * FROM view_listagem_pedidos`;

    const [registros] = await connection.query(comando);
    return registros;
}

/**
 * Função para buscar um pedido pelo seu id
 * 
 * @param {Number} idCarrinho - Recebe o id do pedido que será usado na busca 
 * 
 * @returns Retorna um objeto JSON, contendo o pedido que foi buscado 
 */
export async function buscarPedidoPorId(idCarrinho) {
    const comando = `SELECT * FROM view_listagem_pedidos 
                     WHERE id_itens_carrinho = ?`;

    const [registro] = await connection.query(comando, [idCarrinho]);
    return registro;
}

/**
 * Função para buscar os pedido através do cpf do cliente 
 * 
 * @param {String} cpfCliente - Recebe o cpf do cliente que será usado na busca
 * 
 * @returns Retorna um objeto JSON, contendo um ou vários pedidos que foram buscados
 */
export async function buscarPedidoPeloCliente(cpfCliente) {
    const comando = `SELECT * FROM view_listagem_pedidos 
                     WHERE cpf = ?`;

    const [registros] = await connection.query(comando, [cpfCliente]);
    return registros;
}

/**
 * Função para buscar os pedido através do id do vinho
 * 
 * @param {Number} idVinho - Recebe o id do vinho que será usado na busca
 * 
 * @returns Retorna um objeto JSON, contendo um ou vários pedidos que foram buscados
 */
export async function buscarPedidoPorVinho(idVinho) {
    const comando = `SELECT * FROM view_listagem_pedidos
                     WHERE id_vinho = ?`;

    const [registros] = await connection.query(comando, [idVinho]);
    return registros;
}

/**
 * Função para buscar os pedido através da quantidade do pedido
 * 
 * @param {Number} quantidade - Recebe a quantidade do pedido que  será usado na busca
 * 
 * @returns Retorna um objeto JSON, contendo um ou vários pedidos que foram buscados
 */
export async function buscarPedidoPorPrecoTotal(quantidade) {
    const comando = `SELECT * FROM view_listagem_pedidos
                     WHERE preco_total_pedido = ?`;

    const [registro] = await connection.query(comando, [quantidade]);
    return registro;
}
