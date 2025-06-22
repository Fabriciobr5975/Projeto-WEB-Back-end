
export function validarEntradaParaBuscaPorItensCarrinho(entrada) {
    if(!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosItensCarrinho(itens_carrinho) {
    if(!itens_carrinho.carrinho)
        throw new Error("A identificação do carrinho é obrigátorio");

    if(!itens_carrinho.vinho) 
        throw new Error("O a identificação do vinho é obrigatório");

    if(!itens_carrinho.quantidade)
        throw new Error("A quantidade é obrigatória");
}

export function validarBuscaItensCarrinho(registros) {
    if(registros?.length === 0 || !registros)
        throw new Error("Não foram encontrado registros para o itens do carrinho");
}

export function verificarSeItensCarrinhoFoiInserido(insertId) {
    if(insertId === 0)
        throw new Error("Os itens do carrinho não foram inseridos");
}

export function verificarSeItensCarrinhoFoiAlterado(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("Os itens do carrinho não foram alterados");
}

export function verificarSeItensCarrinhoFoiRemovido(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("Os itens do carrinho não foram removidos");
}

export function verificarSeItensCarrinhoSãoIguais(registro, itens_carrinho) {
    registro.forEach(itens => {
        if(itens.carrinho === itens_carrinho.carrinho) {
            throw new Error("Esse Itens já foram inseridos no carrinho");
        }
    });
}