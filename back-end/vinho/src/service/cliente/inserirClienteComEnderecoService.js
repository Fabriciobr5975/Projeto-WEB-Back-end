import { inserirClienteComEndereco } from '../../repository/cliente/clienteRepository.js'
import { validarCamposObrigatoriosCliente, verificarSeClienteFoiInserido } from '../../validation/cliente/clienteValidation.js'

import { pegarEnderecoDoViaCep, construirJSONIEndereco } from '../endereco/buscarEnderecoViaCepService.js'
import { limparCPF, validarCPF } from '../autenticacao/autenticacaoCPF.js';

export default async function inserirClienteComEnderecoService(cliente) {
    validarCamposObrigatoriosCliente(cliente);

    let cpfLimpo = limparCPF(cliente.cpf)

    if (!(validarCPF(cpfLimpo)))
        throw new Error(`O CPF ${cliente.cpf} não é válido`);

    // Pegando as informações do CEP da API do viacep
    const enderecoViaCep = await pegarEnderecoDoViaCep(endereco.cep);

    // Construindo o JSON para a inserção do endereço no BD
    const enderecoFinal = construirJSONIEndereco(enderecoViaCep, endereco);

    // Alterando o cpf que vem via JSON para o cpf limpo
    cliente.cpf = cpfLimpo;

    const clienteCompleto =  { ...cliente, ...enderecoFinal };

    const resposta = await inserirClienteComEndereco(clienteCompleto);
    verificarSeClienteFoiInserido(resposta);

    return resposta;
}