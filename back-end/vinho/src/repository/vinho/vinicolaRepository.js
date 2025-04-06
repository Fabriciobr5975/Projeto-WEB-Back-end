import connection from "../connection.js";

export async function inserirVinicola(vinicola) {
    const comando = `INSERT INTO vinicola (vinicola) VALUES (?)`;

    const [resposta] = await connection.query(comando, [vinicola.vinicola]);
    return resposta.insertId;
}

export async function alterarVinicola(idVinicola, vinicola) {
    const comando = `
        UPDATE viniciola 
            SET vinicola = ?
        WHERE id_vinicola = ?
    `;

    const [resposta] = await connection.query(comando, [vinicola.vinicola, idVinicola]);
    return resposta.affectedRows;
}

export async function removerVinicola(idVinicola) {
    const comando = `DELETE FROM vinicola WHERE id_vinicola = ?`;

    const [resposta] = await connection.query(comando, [idVinicola]);
    return resposta.affectedRows;
}

export async function listaVinicolas() {
    const comando = `SELECT * FROM vinicola`;

    cont [registros] = await connection.query(comando);
    return registros;
}

export async function buscarVinicolaPorId(idVinicola) {
    const comando = `SELECT * FROM vinicola WHERE id_vinicola = ?`;

    cont [registro] = await connection.query(comando, [idVinicola]);
    return registro;   
}

export async function buscarVinicolaPorNome(nomeVinicola) {
    const comando = `SELECT * FROM vinicola WHERE vinicola LIKE % ?`;

    cont [registro] = await connection.query(comando, [nomeVinicola]);
    return registro;   
}