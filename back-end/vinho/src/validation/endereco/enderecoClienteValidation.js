import { validarCEP } from '../../service/autenticacao/autenticacaoCEP.js'

export function validarEntradaParaBusca(entrada) {
    if (!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosEnderecoCliente(enderecoCliente) {
    if (!enderecoCliente.endereco)
        throw new Error("O cep é obrigatório e deve ser único");

    validarCEP(enderecoCliente.endereco)
    
    if (!enderecoCliente.cliente)
        throw new Error("O cpf do usuário é obrigatório");

    if (!enderecoCliente.numero)
        throw new Error("O número é obrigatório");
}

export function validarBuscaEnderecoCliente(registros) {
    if (registros?.length === 0 || !registros)
        throw new Error("Não foram encontrado registros para o endereço do cliente");
}

export function verificarSeEnderecoClienteFoiInserido(resposta) {
    if (resposta.cep_inserido === 0 || resposta.cpf_inserido === 0)
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