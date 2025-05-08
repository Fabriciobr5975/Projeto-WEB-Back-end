import connection from "../connection.js";

/**
 * Função que deve inserir novos itens no carrinho (tabela intermediária entre carrinho e vinho)
 * 
 * @param {JSON} itens_carrinho - Objeto que terá os atributos necessários para a criação de novos registros
 * nessa tabela intermediária
 * 
 * @returns Retorna o id do itens no carrinho, caso ele seja inserido
 */
export async function inserirItensCarrinho(itens_carrinho) {
    const comando = `INSERT INTO itens_carrinho (carrinho_fk, vinho_fk, quantidade) 
                        VALUES (?, ?, ?)`;

    const [resposta] = await connection.query(comando, [
        itens_carrinho.carrinho,
        itens_carrinho.vinho,
        itens_carrinho.quantidade
    ]);
    return resposta.insertId;
}

/**
 * Função para alterar um item no carrinho que já tenha sido inserido no banco de dados
 * 
 * @param {Number} idItensCarrinho - ID (PK) do item do carrinho que será alterado 
 * @param {JSON} itens_carrinho - Objeto com os dados necessários para alterar um item carrinho
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a alteração do item do carrinho
 */
export async function alterarItensCarrinho(idItensCarrinho, itens_carrinho) {
    const comando = `
        UPDATE itens_carrinho 
            SET carrinho_fk = ?,
                vinho_fk = ?,
                quantidade = ?
        WHERE id_itens_carrinho = ?
    `;

    const [resposta] = await connection.query(comando, [
        itens_carrinho.carrinho,
        itens_carrinho.vinho,
        itens_carrinho.quantidade, 
        idItensCarrinho
    ]);
    return resposta.affectedRows;
}

/**
 * Função para remover um item carrinho que tenha sido inserido no banco de dados
 * 
 * @param {Number} idItensCarrinho - ID (PK) do item do carrinho que será excluído 
 * 
 * @returns Retorna a quantidade de linhas que foram alteradas após a remoção do item do carrinho
 */
export async function removerItensCarrinho(idItensCarrinho) {
    const comando = `DELETE FROM itens_carrinho WHERE id_itens_carrinho = ?`;

    const [resposta] = await connection.query(comando, [idItensCarrinho]);
    return resposta.affectedRows;
}

/**
 * Função para listar todos os itens do carrinho que foram criados e estão salvos no banco de dados
 * 
 * @returns Retorna um objeto JSON contendo todos os itens do carrinho que foram encontrados
 */
export async function listarItensCarrinhos() {
    const comando = `SELECT * FROM view_listagem_itens_carrinho`;

    const [registros] = await connection.query(comando);
    return registros;
}

/**
 * Função para buscar um item do carrinho pelo seu id
 * 
 * @param {Number} idCarrinho - ID (PK) do item do carrinho que está sendo buscado 
 * 
 * @returns Retorna um objeto JSON contendo o item do carrinho que foi buscado, caso o id seja válido 
 */
export async function buscarItensCarrinhoPorId(idCarrinho) {
    const comando = `SELECT * FROM view_listagem_itens_carrinho 
                     WHERE id_itens_carrinho = ?`;

    const [registro] = await connection.query(comando, [idCarrinho]);
    return registro[0];
}

/**
 * Função para buscar um ou mais itens do carrinho salvos, usando o cpf do cliente para realizar a busca
 * 
 * @param {String} cpfCliente - Recebe o cpf do usuário para realizar a busca
 * 
 * @returns Retorna um objeto JSON contendo um ou mais itens do carrinho que foi buscado, caso o id seja válido 
 */
export async function buscarItensCarrinhoPeloCliente(cpfCliente) {
    const comando = `SELECT * FROM view_listagem_itens_carrinho 
                     WHERE cpf = ?`;

    const [registros] = await connection.query(comando, [cpfCliente]);
    return registros;
}

/**
 * Função para buscar um ou mais itens do carrinho salvo, usando o id do vinho que foi associado ao 
 * realizar a busca
 * 
 * @param {Number} idVinho - Recebe o id do vinho que será usado para realizar a busca
 * 
 * @returns Retorna um objeto JSON contendo um ou mais itens do carrinho que foi buscado, caso o id
 * do vinho seja válido 
 */
export async function buscarItensCarrinhoPorVinho(idVinho) {
    const comando = `SELECT * FROM view_listagem_itens_carrinho
                     WHERE id_vinho = ?`;

    const [registros] = await connection.query(comando, [idVinho]);
    return registros;
}

/**
 * Função para buscar um ou mais itens do carrinho salvo, usando o campo de quantidade para a busca
 * 
 * @param {Number} quantidade - Recebe a quantidade que será usado para realizar a busca
 *  
 * @returns Retorna um objeto JSON contendo um ou mais itens do carrinho que foi buscado, caso a 
 * quantidade seja válida 
 */
export async function buscarItensCarrinhoPorQuantidade(quantidade) {
    const comando = `SELECT * FROM view_listagem_itens_carrinho
                     WHERE quantidade = ?`;

    const [registro] = await connection.query(comando, [quantidade]);
    return registro;
}
