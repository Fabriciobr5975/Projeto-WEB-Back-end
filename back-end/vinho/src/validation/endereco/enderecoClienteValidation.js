
export function validarEntradaParaBusca(entrada) {
    if (!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosEnderecoCliente(enderecoCliente) {
    if (!enderecoCliente.cep)
        throw new Error("O cep é obrigatório e deve ser único");

    if(validarCep(enderecoCliente.cep)) 
        throw new Error("O cep não foi digitado corretamente");

    if (!enderecoCliente.cliente)
        throw new Error("O cpf do usuário é obrigatório");

    if (!enderecoCliente.numero)
        throw new Error("O número é obrigatório");
}

export function validarCep(cep) {
    let cepLimpo = cep.trim().replace("-", "");

    return !(cepLimpo.length === 8 || isNaN(cepLimpo)) ? true : false;
}

export function validarBuscaEnderecoCliente(registros) {
    if (registros.length === 0)
        throw new Error("Não foram encontrado registros para o endereço do cliente");
}

export function verificarSeEnderecoClienteFoiInserido(resposta) {
    if (resposta.id_endereco === 0 || resposta.id_cliente)
        throw new Error("O endereço do cliente não foi inserido");
}

export function verificarSeEnderecoClienteFoiAlterado(linhasAfetadas) {
    if (linhasAfetadas === 0)
        throw new Error("O endereço do cliente não foi alterado");
}

export function verificarSeEnderecoClienteFoiRemovido(linhasAfetadas) {
    if (linhasAfetadas === 0)
        throw new Error("O endereço não foi removido");
}

export function verificarSeEnderecosClientesSãoIguais(registro, enderecoClienteAtual) {
    registro.forEach(itens => {
        if (itens.endereco === enderecoClienteAtual.endereco || itens.cliente === enderecoClienteAtual.cliente) {
            throw new Error("Esse endereço já foi inserido");
        }
    });
}