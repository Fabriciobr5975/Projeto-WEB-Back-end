
export function validarEntradaParaBuscaPorItensPedido(entrada) {
    if(!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosItensPedido(itens_carrinho) {
    if(!itens_carrinho.pedido)
        throw new Error("A identificação do pedido é obrigátorio");

    if(!itens_carrinho.vinho) 
        throw new Error("O a identificação do vinho é obrigatório");

    if(!itens_carrinho.quantidade)
        throw new Error("A quantidade é obrigatória");
}

export function validarBuscaItensPedido(registros) {
    if(registros?.length === 0 || !registros)
        throw new Error("Não foram encontrado registros para os itens do pedido");
}

export function verificarSeItensPedidoFoiInserido(insertId) {
    if(insertId === 0)
        throw new Error("Os itens do pedido não foram inseridos");
}

export function verificarSeItensPedidoFoiAlterado(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("Os itens do pedido não foram alterados");
}

export function verificarSeItensPedidoFoiRemovido(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("Os itens do pedido não foram removidos");
}
