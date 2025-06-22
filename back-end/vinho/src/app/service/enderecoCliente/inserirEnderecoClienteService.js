import { buscarEnderecoClientePorCEP, inserirEnderecoCliente } from '../../repository/endereco/enderecoClienteRepository.js';
import { validarCamposObrigatoriosEnderecoCliente, verificarSeEnderecosClientesSãoIguais, verificarSeEnderecoClienteFoiInserido } from '../../validation/endereco/enderecoClienteValidation.js';
import { limparCPF, verificarCPFValido } from '../autenticacao/autenticacaoCPF.js';

export default async function inserirEnderecoClienteService(enderecoCliente) {
    validarCamposObrigatoriosEnderecoCliente(enderecoCliente);
    
    let cpfLimpo = limparCPF(enderecoCliente.cliente);
    verificarCPFValido(enderecoCliente.cliente);

    const registros = await buscarEnderecoClientePorCEP(enderecoCliente.endereco);
    verificarSeEnderecosClientesSãoIguais(registros, enderecoCliente);

    enderecoCliente.cliente = cpfLimpo;

    const resposta = await inserirEnderecoCliente(enderecoCliente);
    verificarSeEnderecoClienteFoiInserido(resposta);

    return resposta;
}