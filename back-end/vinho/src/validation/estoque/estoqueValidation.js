
export function validarEntradaParaBuscaPorEstoque(entrada) {
    if(!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosEstoque(estoque) {
    if (!estoque.vinho)
        throw new Error("A identificação dos vinhos é obrigatório e deve ser único");

    if(!estoque.quantidade || isNaN(estoque.quantidade))
        throw new Error("A quantidade é obrigatória");

    if(!estoque.status_estoque)
        throw new Error("O status do estoque é obrigatório");
}

export function validarBuscaEstoque(registros) {
    if(registros.length === 0)
        throw new Error("Não foram encontrado registros para o estoque");
}

export function verificarSeEstoqueFoiInserido(insertId) {
    if(insertId === 0)
        throw new Error("O estoque não foi inserido");
}

export function verificarSeEstoqueFoiAlterado(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("O estoque não foi alterado");
}

export function verificarSeEstoqueFoiRemovido(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("O estoque não foi removido");
}

export function verificarSeEstoqueSãoIguais(registro, estoqueAtual) {
    registro.forEach(itens => {
        if(itens.vinho === estoqueAtual.vinho) {
            throw new Error("Esse estoque já foi inserido");
        }
    });
}