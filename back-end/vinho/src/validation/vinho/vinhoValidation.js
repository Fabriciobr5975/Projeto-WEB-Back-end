
export function validarEntradaParaBuscaPorVinho(entrada) {
    if(!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosVinho(vinho) { 
    // if (!vinho.imagem_vinho)
    //     throw new Error("O a imagem do vinho é obrigatória");

    if(!vinho.nome_vinho)
        throw new Error("O nome do vinhoé obrigatório");

    if(!vinho.uva)
        throw new Error("O a uva do vinho é obrigatório");

    if(!vinho.vinicola)
        throw new Error("O identificação da vinicola é obrigatório");

    if(!vinho.teor_alcolico)
        throw new Error("O teor alcoólico é obrigatório");

    if(!vinho.classificacao)
        throw new Error("A classificação do vinho é obrigatório");

    if(!vinho.volume)
        throw new Error("O volume é obrigatório");
    
    if(!vinho.safra)
        throw new Error("A safra do vinho é obrigatório");

    if(!vinho.pais)
        throw new Error("A identificação do pais do vinho é obrigatório");

    if(!vinho.descricao)
        throw new Error("A descrição do vinho é obrigatório");
}

export function validarBuscaVinho(registros) {
    if(registros.length === 0)
        throw new Error("Não foram encontrado registros para o vinho");
}

export function verificarSeVinhoFoiInserido(insertId) {
    if(insertId === 0)
        throw new Error("O vinho não foi inserido");
}

export function verificarSeVinhoFoiAlterado(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("O vinho não foi alterado");
}

export function verificarSeVinhoFoiRemovido(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("O vinho não foi removido");
}
