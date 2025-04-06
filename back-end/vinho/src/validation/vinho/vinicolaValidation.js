
export function validarEntradaParaBuscaPorVinicola(entrada) {
    if(!entrada)
        throw new Error("O campo para busca devem estar preenchido");
}

export function validarCamposObrigatoriosVinicola(vinicola) {
    if (!vinicola.vinicola)
        throw new Error("O nome da vinícola é obrigatório e deve ser único");
}

export function validarBuscaVinicola(registros) {
    if(registros.length === 0)
        throw new Error("Não foram encontrado registros para a vinícola");
}

export function verificarSeVinicolaFoiInserida(insertId) {
    if(insertId === 0)
        throw new Error("A vinícola não foi inserida");
}

export function verificarSeVinicolaFoiAlterada(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("A vinícola não foi alterada");
}

export function verificarSeVinicolaFoiRemovida(linhasAfetadas) {
    if(linhasAfetadas === 0)
        throw new Error("A vinícola não foi removida");
}

export function verificarSeVinicolasSãoIguais(registro, vinicolaAtual) {
    registro.forEach(itens => {
        if(itens.vinicola === vinicolaAtual.vinicola) {
            throw new Error("Essa vinícola já foi inserida");
        }
    });
}