import { buscarEnderecoClientePorCEP, removerEnderecoCliente } from '../../repository/endereco/enderecoClienteRepository.js'
import { validarBuscaEnderecoCliente, verificarSeEnderecoClienteFoiRemovido } from '../../validation/endereco/enderecoClienteValidation.js';

export default async function removerEnderecoClienteService(endereco, cliente) {
    const registros = await buscarEnderecoClientePorCEP(endereco);
    
    validarBuscaEnderecoCliente(registros);

    const resposta = await removerEnderecoCliente(endereco, cliente);
    verificarSeEnderecoClienteFoiRemovido(resposta);
    
    return resposta;
}