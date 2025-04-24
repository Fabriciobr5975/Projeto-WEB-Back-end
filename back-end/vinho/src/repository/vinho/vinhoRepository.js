import connection from "../connection.js";

/**
 * Função para inserir um novo vinho no banco de dados
 * 
 * @param {JSON} vinho - Objeto que terá os atributos necessários para a inserção do estoque
 *  
 * @returns Retorna o id do vinho, caso ele seja inserido 
 */
export async function inserirVinho(vinho) {
    // imagem_vinho,
    const comando = `
       CALL cadastro_vinho(?, ?, ?, ?, ?, ?, ?, ?, ?,
            (SELECT id_vinicola FROM vinicola WHERE vinicola = ?),
            (SELECT id_pais FROM pais WHERE pais = ?));`;

    const [resposta] = await connection.query(comando, [
        //vinho.imagem_vinho,
        vinho.nome,
        vinho.uva,
        vinho.teor_alcolico,
        vinho.classificacao,
        vinho.volume,
        vinho.safra,
        vinho.temperatura_servir,
        vinho.preco,
        vinho.descricao,
        vinho.vinicola,
        vinho.pais
    ]);

    const mensagem = resposta[0][0]?.mensagem;

    return mensagem;
}

/**
 * Função para alterar um vinho que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idVinho - Recebe o id do vinho que será alterado
 * @param {JSON} vinho - Objeto que terá os atributos necessários para a alteração do estoque
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a alteração do estoque
 */
export async function alterarVinho(idVinho, vinho) {
    // imagem_vinho = ?,
    const comando = `
        UPDATE vinho 
            SET 
                nome = ?,
                uva = ?,
                teor_alcolico = ?,
                classificacao = ?,
                volume = ?,
                safra = ?,
                temperatura_servir = ?,
                preco = ?,
                descricao = ?,
                vinicola_fk = (SELECT id_vinicola FROM vinicola WHERE vinicola = ?),
                pais_fk = (SELECT id_pais FROM pais WHERE pais = ?)
        WHERE id_vinho = ?    
`;

    const [resposta] = await connection.query(comando, [
        //vinho.imagem_vinho,
        vinho.nome,
        vinho.uva,
        vinho.teor_alcolico,
        vinho.classificacao,
        vinho.volume,
        vinho.safra,
        vinho.temperatura_servir,
        vinho.preco,
        vinho.descricao,
        vinho.vinicola,
        vinho.pais,
        idVinho
    ]);

    return resposta.affectedRows;
}

/**
 * Função para remover um estoque salvo no banco de dados
 * 
 * @param {Number} idVinho - Recebe o id do vinho que será removido
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção do vinho
 */
export async function removerVinho(idVinho) {
    const comando = `DELETE FROM vinho WHERE id_vinho = ?`;

    const [resposta] = await connection.query(comando, [idVinho]);
    return resposta.affectedRows;
}

/**
 * Função para listar todos os vinhos que estão salvos no banco de dados
 * 
 * @returns Retorna todos os vinhos que foram encontrados
 */
export async function listarVinhos() {
    const comando = `SELECT * FROM view_listagem_vinho`;

    const [registros] = await connection.query(comando);
    return registros;
}

/**
 * Função para buscar um estoque pelo seu id
 * 
 * @param {Number} idVinho - Recebe o id do vinho que será buscado
 * 
 * @returns Retorna um objeto JSON, contendo o vinho que foi buscado
 */
export async function buscarVinhoPorId(idVinho) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE id_vinho = ?`;

    const [registro] = await connection.query(comando, [idVinho]);
    return registro[0];
}

/**
 * Função para buscar um estoque pelo seu nome
 * 
 * @param {String} nomeVinho - Recebe o nome do vinho que será buscado 
 * 
 * @returns Retorna um objeto JSON, contendo um ou mais vinhos que foram buscado
 */
export async function buscarVinhoPorNome(nomeVinho) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE nome_vinho LIKE ?`;

    const [registros] = await connection.query(comando, [`%${nomeVinho}%`]);
    return registros;
}

/**
 * Função para buscar um estoque pelo sua uva
 * 
 * @param {String} uva - Recebe a uva do vinho que será buscado 
 * 
 * @returns Retorna um objeto JSON, contendo um ou mais vinhos que foram buscado
 */
export async function buscarVinhoPorUva(uva) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE uva_vinho LIKE ?`;

    const [registros] = await connection.query(comando, [`%${uva}%`]);
    return registros;
}

/**
 * Função para buscar um estoque pelo seu teor alcoólico
 * 
 * @param {String} teorAlcoolico - Recebe o teor alcoólico do vinho que será buscado
 * 
 * @returns Retorna um objeto JSON, contendo um ou mais vinhos que foram buscado
 */
export async function buscarVinhoPorTeorAlcoolico(teorAlcoolico) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE teor_alcolico = ? `;

    const [registros] = await connection.query(comando, [teorAlcoolico]);
    return registros;
}

/**
 * Função para buscar um estoque pela sua classificação
 * 
 * @param {String} classificaoVinho - Recebe a classificação do vinho que será buscado
 *  
 * @returns Retorna um objeto JSON, contendo um ou mais vinhos que foram buscado
 */
export async function buscarVinhoPorClassificacao(classificaoVinho) {
    const comando = `SELECT * FROM view_listagem_vinho 
                     WHERE classificacao_vinho LIKE ?`;

    const [registros] = await connection.query(comando, [`%${classificaoVinho}%`]);
    return registros;
}

/**
 * Função para buscar um estoque pela sua safra
 * 
 * @param {String} safra - Recebe a safra do vinho que será buscado 
 * 
 * @returns Retorna um objeto JSON, contendo um ou mais vinhos que foram buscado
 */
export async function buscarVinhoPorSafra(safra) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE safra_vinho = ?`;

    const [registros] = await connection.query(comando, [safra]);
    return registros;
}

/**
 * Função para buscar um estoque pelo seu pais
 * 
 * @param {String} pais - Recebe o pais do vinho que será buscado
 * 
 * @returns Retorna um objeto JSON, contendo um ou mais vinhos que foram buscado
 */
export async function buscarVinhoPorPais(pais) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE pais LIKE ?`;

    const [registros] = await connection.query(comando, [`%${pais}%`]);
    return registros;
}

/**
 * Função para buscar um estoque pelo seu preço
 * 
 * @param {Number} precoVinho - Recebe o preço do vinho que será buscado
 * 
 * @returns Retorna um objeto JSON, contendo um ou mais vinhos que foram buscado
 */
export async function buscarVinhoPorPreco(precoVinho) {
    const comando = `SELECT * FROM view_listagem_vinho WHERE preco_vinho = ?`;

    const [registro] = await connection.query(comando, [precoVinho]);
    return registro;
}