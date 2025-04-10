import connection from "../connection.js";

export async function inserirCarrinho(carrinho) {
    const comando = `
        INSERT INTO carrinho (vinho_fk, cliente_fk, quantidade)
            VALUES (?, ?, ?)
    `;

    const [resposta] = await connection.query(comando, [
        carrinho.vinho,
        carrinho.cliente,
        carrinho.quantidade
    ]);

    return resposta.insertId;
}

export async function alterarCarrinho(idCarrinho, carrinho) {
    const comando = `
        UPDATE carrinho 
            SET vinho_fk = ?,
                cliente_fk = ?,
                quantidade = ?
        WHERE id_carrinho = ?
    `;

    const [resposta] = await connection.query(comando, [
        carrinho.vinho,
        carrinho.cliente,
        carrinho.quantidade,
        idCarrinho
    ]);

    return resposta.affectedRows;
}

export async function removerCarrinho(idCarrinho) {
    const comando = `DELETE FROM carrinho WHERE id_carrinho = ?`;

    const [resposta] = await connection.query(comando, [idCarrinho]);
    return resposta.affectedRows;
}

export async function listarCarrinhos() {
    const comando = `SELECT * FROM view_listagem_carrinho`;

    const [registros] = await connection.query(comando);
    return registros;
}

export async function buscarCarrinhoPorId(idCarrinho) {
    const comando = `SELECT * FROM view_listagem_carrinho 
                     WHERE id_carrinho = ?`;

    const [registro] = await connection.query(comando, [idCarrinho]);
    return registro;
}


export async function buscarCarrinhoPeloCliente(cpfCliente) {
    const comando = `SELECT * FROM view_listagem_carrinho 
                     WHERE cpf = ?`;

    const [registros] = await connection.query(comando, [cpfCliente]);
    return registros;
}

export async function buscarCarrinhoPorVinho(idVinho) {
    const comando = `SELECT * FROM view_listagem_carrinho
                     WHERE id_vinho = ?`;

    const [registros] = await connection.query(comando, [idVinho]);
    return registros;
}

/*
export async function buscarCarrinhoPorQuantidade(quantidade) {
    const comando = `SELECT * FROM view_listagem_carrinho
                     WHERE quantidade = ?`;

    const[registro] = await connection.query(comando, [quantidade]);
    return registro;
}*/
