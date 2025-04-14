
export function validarEntradaParaBuscaPorVinicola(entrada) {
    if (!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosVinicola(vinicola) {
    if (!vinicola.vinicola)
        throw new Error("O nome da vinícola é obrigatório e deve ser único");

    if (!vinicola.rotulo)
        throw new Error("O nome da rótulo da vinícola é obrigatório");
}

export function validarBuscaVinicola(registros) {
    if (registros.length === 0)
        throw new Error("Não foram encontrado registros para a vinícola");
}

export function verificarSeVinicolaFoiInserida(insertId) {
    if (insertId === 0)
        throw new Error("A vinícola não foi inserida");
}

export function verificarSeVinicolaFoiAlterada(linhasAfetadas) {
    if (linhasAfetadas === 0)
        throw new Error("A vinícola não foi alterada");
}

export function verificarSeVinicolaFoiRemovida(linhasAfetadas) {
    if (linhasAfetadas === 0)
        throw new Error("A vinícola não foi removida");
}

export function verificarSeVinicolasSãoIguais(registro, vinicolaAtual) {
    registro.forEach(itens => {
        if (itens.vinicola === vinicolaAtual.vinicola) {
            throw new Error("Essa vinícola já foi inserida");
        }
    });
}
