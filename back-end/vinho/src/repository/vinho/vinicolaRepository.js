import connection from "../connection.js";

/**
 * Função que deve inserir uma nova vinícola no banco de dados
 * 
 * @param {JSON} vinicola - Objeto que terá os atributos necessários para inserção da vinícola 
 * 
 * @returns Retorna o id da vinícola, caso ele seja inserido 
 */
export async function inserirVinicola(vinicola) {
    const comando = `INSERT INTO vinicola (vinicola, rotulo) VALUES (?, ?)`;

    const [resposta] = await connection.query(comando, [vinicola.vinicola, vinicola.rotulo]);
    return resposta.insertId;
}

/**
 * Função para alterar uma vinícola que já tenha sido inserida no banco de dados
 * 
 * @param {Number} idVinicola - ID (PK) da vinícola que será alterado
 * @param {JSON} vinicola - Objeto com os dados necessários para alterar uma vinícola
 * 
 * @returns Retorna a quantidade de linhas que forma alteradas após a alteração do pais
 */
export async function alterarVinicola(idVinicola, vinicola) {
    const comando = `
        UPDATE viniciola 
            SET vinicola = ?,
                rotulo = ?
        WHERE id_vinicola = ?
    `;

    const [resposta] = await connection.query(comando, [
        vinicola.vinicola, 
        vinicola.rotulo, 
        idVinicola]);
    return resposta.affectedRows;
}

/**
 * Função para remover uma vinícola que tenha sido inserida no banco de dados
 * 
 * @param {Number} idVinicola - ID (PK) da vinícola que será excluída 
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção da vinícola
 */
export async function removerVinicola(idVinicola) {
    const comando = `DELETE FROM vinicola WHERE id_vinicola = ?`;

    const [resposta] = await connection.query(comando, [idVinicola]);
    return resposta.affectedRows;
}

/**
 * Função para listar todos as vinícolas que foram criadas e estão salvas no banco de dados
 * 
 * @returns Retorna um objeto JSON contendo todas as vinícolas que foram encontradas
 */
export async function listaVinicolas() {
    const comando = `SELECT * FROM vinicola`;

    cont [registros] = await connection.query(comando);
    return registros;
}

/**
 * Função para buscar um vinícola pelo seu id
 * 
 * @param {Number} idVinicola - ID (PK) da vinícola que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo a vinícola que foi buscado, caso o id seja válido 
 */
export async function buscarVinicolaPorId(idVinicola) {
    const comando = `SELECT * FROM vinicola WHERE id_vinicola = ?`;

    cont [registro] = await connection.query(comando, [idVinicola]);
    return registro;   
}

/**
 * Função para buscar um vinícola pelo seu nome
 * 
 * @param {String} nomeVinicola - Recebe o nome da vinícola que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo a vinícola que foi buscado, caso o nome seja válido 
 */
export async function buscarVinicolaPorNome(nomeVinicola) {
    const comando = `SELECT * FROM vinicola WHERE vinicola LIKE % ?`;

    cont [registro] = await connection.query(comando, [nomeVinicola]);
    return registro;   
}