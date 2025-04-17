
export function validarEntradaParaBuscaPorEndereco(entrada) {
    if (!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosEnderecoParaInsercao(endereco) {
    if (!endereco.cep)
        throw new Error("O cep é obrigatório e deve ser único");

    if(validarCep(endereco.cep)) 
        throw new Error("O cep não foi digitado corretamente");

    if (!endereco.numero || isNaN(endereco.numero))
        throw new Error("O numero é obrigatório");
}

export function validarCep(cep) {
    let cepLimpo = cep.trim().replace("-", "");

    return !(cepLimpo.length === 8 || isNaN(cepLimpo)) ? true : false;
}

export function validarCamposObrigatoriosEndereco(endereco) {
    if (!endereco.logradouro)
        throw new Error("O logradouro é obrigatório");

    if (!endereco.numero || isNaN(endereco.numero))
        throw new Error("O número do endereço é obrigátorio");

    if (!endereco.bairro)
        throw new Error("O nome do bairro é obrigatório");

    if (!endereco.localidade)
        throw new Error("O nome da cidade é obrigatória");

    if (!endereco.uf)
        throw new Error("A UF (Unidade Federativa) é obrigatória");

    if (!endereco.cep)
        throw new Error("O cep é obrigatório e deve ser único");

    if(validarCep(endereco.cep)) 
        throw new Error("O cep não foi digitado corretamente");
}

export function validarBuscaEndereco(registros) {
    if (registros.length === 0)
        throw new Error("Não foram encontrado registros para o endereço");
}

export function verificarSeEnderecoFoiInserido(insertId) {
    if (insertId === 0)
        throw new Error("O endereço não foi inserido");
}

export function verificarSeEnderecoFoiAlterado(linhasAfetadas) {
    if (linhasAfetadas === 0)
        throw new Error("O endereço não foi alterado");
}

export function verificarSeEnderecoFoiRemovido(linhasAfetadas) {
    if (linhasAfetadas === 0)
        throw new Error("O endereço não foi removido");
}

export function verificarSeEnderecosSãoIguais(registro, enderecoAtual) {
    registro.forEach(itens => {
        if (itens.cep === enderecoAtual.cep) {
            throw new Error("Esse endereço já foi inserido");
        }
    });
}