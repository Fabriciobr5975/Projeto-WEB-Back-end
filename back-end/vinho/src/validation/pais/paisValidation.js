
export function validarEntradaParaBuscaPorPais(entrada) {
    if(!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosPais(pais) {
    if (!pais.pais)
        throw new Error("O nome pais é obrigatório e deve ser único");

    if (!pais.sigla)
        throw new Error("A sigla do pais é obrigatório e deve ser único");
}

export function validarBuscaPais(registros) {
    if(registros.length === 0)
        throw new Error("Não foram encontrado registros para o pais");
}

export function verificarSePaisFoiInserido(insertId) {
    if(insertId === 0)
        throw new Error("O pais não foi inserido");
}

export function verificarSePaisFoiAlterado(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("O pais não foi alterado");
}

export function verificarSePaisFoiRemovido(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("O pais não foi removido");
}

export function verificarSePaisesSãoIguais(registro, paisAtual) {
    registro.forEach(itens => {
        if(itens.pais === paisAtual.nome && itens.sigla === paisAtual.sigla) {
            throw new Error("Esse não pode ser inserido, pois ele já existe");
        }
    });
}
