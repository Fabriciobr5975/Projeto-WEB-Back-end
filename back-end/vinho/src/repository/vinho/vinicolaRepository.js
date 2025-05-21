import connection from "../connection.js";

/**
 * Função que deve inserir uma nova vinícola no banco de dados
 * 
 * @param {JSON} vinicola - Objeto que terá os atributos necessários para inserção da vinícola 
 * 
 * @returns Retorna o id da vinícola, caso ele seja inserido 
 */
export async function inserirVinicola(vinicola) {
    try {
        const comando = `CALL cadastro_vinicola (?, ?)`;

        const [resposta] = await connection.query(comando, [vinicola.vinicola, vinicola.rotulo]);
        
        return resposta[0][0]?.mensagem;
        
    } catch (err) {
        throw new Error(criarErro(err.message));
    }
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
    try {
        const comando = `
        UPDATE vinicola 
            SET vinicola = ?,
                rotulo = ?
        WHERE id_vinicola = ?
    `;

        const [resposta] = await connection.query(comando, [
            vinicola.vinicola,
            vinicola.rotulo,
            idVinicola
        ]);
        
        return resposta.affectedRows;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para remover uma vinícola que tenha sido inserida no banco de dados
 * 
 * @param {Number} idVinicola - ID (PK) da vinícola que será excluída 
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção da vinícola
 */
export async function removerVinicola(idVinicola) {
    try {
        const comando = `DELETE FROM vinicola WHERE id_vinicola = ?`;

        const [resposta] = await connection.query(comando, [idVinicola]);
        return resposta.affectedRows;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para listar todos as vinícolas que foram criadas e estão salvas no banco de dados
 * 
 * @returns Retorna um objeto JSON contendo todas as vinícolas que foram encontradas
 */
export async function listaVinicolas() {
    try {
        const comando = `SELECT * FROM vinicola`;

        const [registros] = await connection.query(comando);
        return registros;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um vinícola pelo seu id
 * 
 * @param {Number} idVinicola - ID (PK) da vinícola que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo a vinícola que foi buscado, caso o id seja válido 
 */
export async function buscarVinicolaPorId(idVinicola) {
    try {
        const comando = `SELECT * FROM vinicola WHERE id_vinicola = ?`;

        const [registro] = await connection.query(comando, [idVinicola]);
        return registro[0];

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}

/**
 * Função para buscar um vinícola pelo seu nome
 * 
 * @param {String} nomeVinicola - Recebe o nome da vinícola que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo a vinícola que foi buscado, caso o nome seja válido 
 */
export async function buscarVinicolaPorNome(nomeVinicola) {
    try {
        const comando = `SELECT * FROM vinicola WHERE vinicola LIKE ?`;

        const [registro] = await connection.query(comando, [`%${nomeVinicola}%`]);
        return registro;

    } catch (err) {
        throw new Error(criarErro(err.message));
    }
}