
export function validarEntradaParaBuscaPorCarrinho(entrada) {
    if(!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosCarrinho(carrinho) {
    if(!carrinho.cliente)
        throw new Error("A identificação do cliente é obrigatória");
}

export function validarBuscaCarrinho(registros) {
    if(registros.length === 0)
        throw new Error("Não foram encontrado registros para o carrinho");
}

export function verificarSeCarrinhoFoiInserido(insertId) {
    if(insertId === 0)
        throw new Error("O carrinho não foi inserido");
}

export function verificarSeCarrinhoFoiAlterado(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("O carrinho não foi alterado");
}

export function verificarSeCarrinhoFoiRemovido(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("O carrinho não foi removido");
}
