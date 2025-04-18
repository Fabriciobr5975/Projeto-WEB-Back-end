import { buscarEnderecoClientePorCEP, inserirEnderecoCliente } from '../../repository/endereco/enderecoClienteRepository.js'
import { validarCamposObrigatoriosEnderecoCliente, verificarSeEnderecosClientesSãoIguais, verificarSeEnderecoClienteFoiInserido } from '../../validation/endereco/enderecoClienteValidation.js';

export default async function inserirEnderecoClienteService(enderecoCliente) {
    validarCamposObrigatoriosEnderecoCliente(enderecoCliente);
    
    const registros = await buscarEnderecoClientePorCEP(enderecoCliente.cep);
    verificarSeEnderecosClientesSãoIguais(registros, enderecoCliente);

    const resposta = await inserirEnderecoCliente(enderecoCliente);
    verificarSeEnderecoClienteFoiInserido(resposta);

    return resposta;
}