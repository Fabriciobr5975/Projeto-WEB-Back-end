import { buscarEnderecoClientePorCEP } from '../../repository/endereco/enderecoClienteRepository.js'
import { validarEntradaParaBusca, validarBuscaEnderecoCliente } from '../../validation/endereco/enderecoClienteValidation.js';

export default async function buscarEnderecoClientePorCEPService(cep) {
    validarEntradaParaBusca(cep);
    
    const registros = await buscarEnderecoClientePorCEP(cep);
    validarBuscaEnderecoCliente(registros);
    
    return registros;
}