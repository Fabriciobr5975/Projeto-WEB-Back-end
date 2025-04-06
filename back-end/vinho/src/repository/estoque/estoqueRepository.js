import connection from "../connection.js";

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

export async function alterarEstoque(idEstoque, estoque) {
    const comando = `
        UPDATE estoque 
            SET vinho_fk = ?, 
                quantidade = ?, 
                status_estoque = ? 
        WHERE id_endereco = ?
    `;

    const [resposta] = await connection.query(comando, [
        estoque.vinho,
        estoque.quantidade,
        estoque.status_estoque,
        idEstoque
    ]);

    return resposta.affectedRows;
}

export async function removerEstoque(idEstoque) {
    const comando = `DELETE FROM estoque WHERE id_estoque = ?`;

    const [resposta] = await connection.query(comando, [idEstoque]);
    return resposta.affectedRows;
}

export async function listarEstoque() {
    const comando = `SELECT * FROM view_listagem_estoque`;

    const [registros] = await connection.query(comando);
    return registros;
}

export async function buscarEstoquePorId(idEstoque) {
    const comando = `SELECT * FROM view_listagem_estoque WHERE id_estoque = ?`;

    const [registro] = await connection.query(comando, [idEstoque]);
    return registro;
}

export async function buscarEstoquePorStatus(status) {
    const comando = `SELECT * FROM view_listagem_estoque WHERE status_estoque = ?`;

    const [registros] = await connection.query(comando, [status]);
    return registros;
}

export async function buscarEstoquePorVinho(vinho) {
    const comando = `SELECT * FROM view_listagem_estoque WHERE vinho LIKE % ?`;

    const [registros] = await connection.query(comando, [vinho]);
    return registros;
}

export async function buscarEstoquePorQuantidade(quantidade) {
    const comando = `SELECT * FROM view_listagem_estoque WHERE quantidade_estoque = ?`;

    const [registros] = await connection.query(comando, [quantidade]);
    return registros;
}

export async function buscarEstoquePorSafra(safra) {
    const comando = `SELECT * FROM view_listagem_estoque WHERE safra_vinho = ?`;

    const [registro] = await connection.query(comando, [safra]);
    return registro;
}