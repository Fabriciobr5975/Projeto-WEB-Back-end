import { removerEnderecoCliente } from '../../repository/endereco/enderecoClienteRepository.js'
import { verificarSeEnderecoClienteFoiRemovido } from '../../validation/endereco/enderecoClienteValidation.js';

export default async function removerEnderecoClienteService(enderecoCliente) {
    const registros = await buscarEnderecoClientePorCEP(enderecoCliente);
    verificarSeEnderecoClienteFoiRemovido(registros);
    
    return registros;
}