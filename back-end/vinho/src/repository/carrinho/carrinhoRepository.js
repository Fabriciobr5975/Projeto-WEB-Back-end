import connection from "../connection.js";

/**
 * Função que deve inserir um novo carrinho no banco de dados
 * 
 * @param {JSON} carrinho - Objeto que terá os atributos necessários para a inserção do carrinho
 * 
 * @returns Retorna o id do carrinho, caso ele seja inserido
 */
export async function inserirCarrinho(carrinho) {
    const comando = `
        INSERT INTO carrinho (vinho_fk, cliente_fk, quantidade)
            VALUES (?, (SELECT id_cliente FROM cliente WHERE cpf = ?), ?)
    `;

    const [resposta] = await connection.query(comando, [
        carrinho.vinho,
        carrinho.cliente,
        carrinho.quantidade
    ]);

    return resposta.insertId;
}

/**
 * Função para alterar um carrinho que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idCarrinho - ID (PK) do carrinho que será alterado
 * @param {JSON} carrinho - Objeto com os dados necessários para alterar um carrinho
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a alteração do carrinho
 */
export async function alterarCarrinho(idCarrinho, carrinho) {
    const comando = `
        UPDATE carrinho 
            SET vinho_fk = ?,
                cliente_fk = (SELECT id_cliente FROM cliente WHERE cpf = ?),
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

/**
 * Função para remover um carrinho que tenha sido inserido no banco de dados
 * 
 * @param {*} idCarrinho - ID (PK) do carrinho que será excluido 
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção do carrinho
 */
export async function removerCarrinho(idCarrinho) {
    const comando = `DELETE FROM carrinho WHERE id_carrinho = ?`;

    const [resposta] = await connection.query(comando, [idCarrinho]);
    return resposta.affectedRows;
}

/**
 * Função para listar todos os carrinhos que foram criados e estão salvos no banco de dados
 * 
 * @returns Retorna um objeto JSON contendo todos os carrinhos que foram encontrados
 */
export async function listarCarrinhos() {
    const comando = `SELECT * FROM view_listagem_carrinho`;

    const [registros] = await connection.query(comando);
    return registros;
}

/**
 * Função para buscar um carrinho salvo pelo seu id
 * 
 * @param {Number} idCarrinho - ID (PK) do carrinho que está sendo buscado
 * 
 * @returns Retorna um objeto JSON contendo o carrinho que foi buscado, caso o id seja válido
 */
export async function buscarCarrinhoPorId(idCarrinho) {
    const comando = `SELECT * FROM view_listagem_carrinho 
                     WHERE id_carrinho = ?`;

    const [registro] = await connection.query(comando, [idCarrinho]);
    return registro;
}


/**
 * Função para buscar um ou mais carrinhos salvos, usando o cpf do cliente para realizar a busca
 *
 * @param {String} cpfCliente - Recebe o cpf do usuário para realizar a busca pelo carrinho
 * 
 * @returns Retorna um objeto JSON contendo um ou mais carrinhos que estão associados ao usuário,
 * caso o cpf do usuário seja válido
 */
export async function buscarCarrinhoPeloCliente(cpfCliente) {
    const comando = `SELECT * FROM view_listagem_carrinho 
                     WHERE cpf = ?`;

    const [registros] = await connection.query(comando, [cpfCliente]);
    return registros;
}

/**
 * Função para buscar um ou mais carrinhos salvos, usando o id do vinho que foi associado ao 
 * carrinho para realizar a busca
 * 
 * @param {Number} idVinho - Recebe o id do vinho que será usado para realizar a busca
 * 
 * @returns Retorna um objeto JSON contendo um ou mais carrinhos que estão associadas ao id do
 * vinho, caso esse id seja válido  
 */
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
