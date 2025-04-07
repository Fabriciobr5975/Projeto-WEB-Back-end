import connection from "../connection.js";

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

export async function removerPedido(idPedido) {
    const comando = `DELETE FROM pedido WHERE id_pedido = ?`;

    const [resposta] = await connection.query(comando, [idPedido]);
    return resposta.affectedRows;
}

export async function listarPedido() {
    const comando = `SELECT * FROM view_listagem_pedidos`;

    const [registros] = await connection.query(comando);
    return registros;
}

export async function buscarPedidoPorId(idCarrinho) {
    const comando = `SELECT * FROM view_listagem_pedidos 
                     WHERE id_itens_carrinho = ?`;

    const [registro] = await connection.query(comando, [idCarrinho]);
    return registro;
}

export async function buscarPedidoPeloCliente(cpfCliente) {
    const comando = `SELECT * FROM view_listagem_pedidos 
                     WHERE cpf = ?`;

    const [registros] = await connection.query(comando, [cpfCliente]);
    return registros;
}

export async function buscarPedidoPorVinho(idVinho) {
    const comando = `SELECT * FROM view_listagem_pedidos
                     WHERE id_vinho = ?`;

    const [registros] = await connection.query(comando, [idVinho]);
    return registros;
}

export async function buscarPedidoPorPrecoTotal(quantidade) {
    const comando = `SELECT * FROM view_listagem_pedidos
                     WHERE preco_total_pedido = ?`;

    const[registro] = await connection.query(comando, [quantidade]);
    return registro;
}
