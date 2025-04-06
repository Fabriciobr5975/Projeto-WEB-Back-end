import connection from "../connection.js";

export async function inserirVinho(vinho) {
    const comando = `
        INSERT INTO vinho (nome,
                           uva,
                           vinicola_fk,
                           teor_alcolico,
                           classificacao,
                           volume,
                           safra,
                           temperatura_servir,
                           pais_fk,
                           preco)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)    
    `;

    const [resposta] = await connection.query(comando, [
        vinho.nome,
        vinho.uva,
        vinho.vinicola,
        vinho.teor_alcolico,
        vinho.classificacao,
        vinho.volume,
        vinho.safra,
        vinho.temperatura_servir,
        vinho.pais,
        vinho.preco
    ]);

    return resposta.insertId;   
}

export async function alterarVinho(idVinho, vinho) {
    const comando = `
        UPDATE vinho 
            SET nome = ?,
                uva = ?,
                vinicola_fk = ?,
                teor_alcolico = ?,
                classificacao = ?,
                volume = ?,
                safra = ?,
                temperatura_servir = ?,
                pais_fk = ?,
                preco = ?
        WHERE id_vinho = ?    
`;

const [resposta] = await connection.query(comando, [
    vinho.nome,
    vinho.uva,
    vinho.vinicola_fk,
    vinho.teor_alcolico,
    vinho.classificacao,
    vinho.volume,
    vinho.safra,
    vinho.temperatura_servir,
    vinho.pais_fk,
    vinho.preco,
    idVinho
]);

return resposta.affectedRows;   
}

export async function removerVinho(idVinho) {
    const comando = `DELETE FROM vinho WHERE id_vinho = ?`;

    const [resposta] = await connection(comando, [idVinho]);
    return resposta.affectedRows;
}

export async function listarVinhos() {
    const comando = `SELECT * FROM view_listagem_vinho`;

    const [registros] = await connection(comando);
    return registros;
}

export async function buscarVinhoPorId(idVinho) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE id_vinho = ?`;

    const [registro] = await connection(comando, [idVinho]);
    return registro;
}

export async function buscarVinhoPorNome(nomeVinho) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE nome_vinho LIKE % ?`;

    const [registros] = await connection(comando, [nomeVinho]);
    return registros;
}

export async function buscarVinhoPorUva(uva) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE uva_vinho LIKE % ?`;

    const [registros] = await connection(comando, [uva]);
    return registros;
}

export async function buscarVinhoPorTeorAlcoolico(teorAlcoolico) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE teor_alcolico = ? `;

    const [registro] = await connection(comando, [teorAlcoolico]);
    return registro;
}

export async function buscarVinhoPorClassificacao(classificaoVinho) {
    const comando = `SELECT * FROM view_listagem_vinho 
                     WHERE classificacao_vinho LIKE % ?`;

    const [registros] = await connection(comando, [classificaoVinho]);
    return registros;
}

export async function buscarVinhoPorSafra(safra) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE safra_vinho = ?`;

    const [registro] = await connection(comando, [safra]);
    return registro;
}

export async function buscarVinhoPorPais(pais) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE pais LIKE % ?`;

    const [registros] = await connection(comando, [pais]);
    return registros;
}

export async function buscarVinhoPorPreco(precoVinho) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE preco_vinho = ?`;

    const [registro] = await connection(comando, [precoVinho]);
    return registro;
}