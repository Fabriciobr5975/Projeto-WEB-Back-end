import connection from "../connection.js";

export async function inserirEndereco(endereco) {
    const comando = `
        INSERT INTO endereco (logradouro,
                              numero,
                              complemento, 
                              bairro, 
                              cidade, 
                              uf_estado, 
                              cep)
            VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const [resposta] = await connection.query(comando, [
        endereco.logradouro,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        endereco.cidade,
        endereco.uf_estado,
        endereco.cep
    ]);

    return resposta.insertId;
}

export async function alterarEndereco(idEndereco, endereco) {
    const comando = `
        UPDATE endereco 
            SET logradouro = ?,
                numero = ?,
                complemento = ?, 
                bairro = ?, 
                cidade = ?, 
                uf_estado = ?, 
                cep = ?
        WHERE id_endereco = ?
    `;

    const [resposta] = await connection.query(comando, [
        endereco.logradouro,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        endereco.cidade,
        endereco.uf_estado,
        endereco.cep,
        idEndereco
    ]);

    return resposta.affectedRows;
}

export async function removerEndereco(idEndereco) {
    const comando = `DELETE FROM endereco WHERE id_endereco = ?`;

    const [resposta] = await connection.query(comando, [idEndereco]);
    return resposta.affectedRows;
}

export async function listarEnderecos() {
    const comando = `SELECT * FROM endereco`;

    const[registros] = await connection.query(comando);
    return registros;
}

export async function buscarEnderecoPorId(idEndereco) {
    const comando = `SELECT * FROM endereco WHERE id_endereco = ?`;

    const[registro] = await connection.query(comando, [idEndereco]);
    return registro;
}

export async function buscarEnderecoPorCep(cep) {
    const comando = `SELECT * FROM endereco WHERE cep = ?`;

    const[registro] = await connection.query(comando, [cep]);
    return registro;
}

export async function buscarEnderecoPorCidade(cidade) {
    const comando = `SELECT * FROM endereco WHERE cidade = ?`;

    const[registros] = await connection.query(comando, [cidade]);
    return registros;
}

export async function buscarEnderecoPorLogradouro(logradouro) {
    const comando = `SELECT * FROM endereco WHERE logradouro LIKE % ?`;

    const[registros] = await connection.query(comando, [logradouro]);
    return registros;
}

export async function buscarEnderecoPorUF(ufCidade) {
    const comando = `SELECT * FROM endereco WHERE uf = ?`;

    const[registro] = await connection.query(comando, [ufCidade]);
    return registro;
}