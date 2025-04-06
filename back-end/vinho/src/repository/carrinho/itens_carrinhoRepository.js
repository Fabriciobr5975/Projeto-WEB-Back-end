import connection from "../connection.js";

export async function inserirItensCarrinho(itens_carrinho) {
    const comando = ` INSERT INTO itens_carrinho (carrinho_fk) VALUES (?)`;

    const [resposta] = await connection.query(comando, [itens_carrinho.carrinho]);
    return resposta.insertId;
}

export async function alterarItensCarrinho(idItensCarrinho, itens_carrinho) {
    const comando = `
        UPDATE itens_carrinho 
            SET carrinho_fk = ?
        WHERE id_itens_carrinho = ?
    `;

    const [resposta] = await connection.query(comando, [itens_carrinho.carrinho, idItensCarrinho]);
    return resposta.affectedRows;
}

export async function removerItensCarrinho(idItensCarrinho) {
    const comando = `DELETE FROM itens_carrinho WHERE id_itens_carrinho = ?`;

    const [resposta] = await connection.query(comando, [idItensCarrinho]);
    return resposta.affectedRows;
}

export async function listarItensCarrinhos() {
    const comando = `SELECT * FROM view_listagem_itens_carrinho`;

    const [registros] = await connection.query(comando);
    return registros;
}

export async function buscarItensCarrinhoPorId(idCarrinho) {
    const comando = `SELECT * FROM view_listagem_itens_carrinho 
                     WHERE id_itens_carrinho = ?`;

    const [registro] = await connection.query(comando, [idCarrinho]);
    return registro;
}

export async function buscarItensCarrinhoPeloCliente(cpfCliente) {
    const comando = `SELECT * FROM view_listagem_itens_carrinho 
                     WHERE cpf = ?`;

    const [registros] = await connection.query(comando, [cpfCliente]);
    return registros;
}

export async function buscarItensCarrinhoPorVinho(idVinho) {
    const comando = `SELECT * FROM view_listagem_itens_carrinho
                     WHERE id_vinho = ?`;

    const [registros] = await connection.query(comando, [idVinho]);
    return registros;
}

export async function buscarItensCarrinhoPorQuantidade(quantidade) {
    const comando = `SELECT * FROM view_listagem_itens_carrinho
                     WHERE quantidade = ?`;

    const[registro] = await connection.query(comando, [quantidade]);
    return registro;
}
