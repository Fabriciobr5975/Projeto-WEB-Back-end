import { buscarEnderecoClientePorCPF } from '../../repository/endereco/enderecoClienteRepository.js'
import { validarEntradaParaBusca, validarBuscaEnderecoCliente } from '../../validation/endereco/enderecoClienteValidation.js';

export default async function buscarEnderecoClientePorCPFService(cpf) {
    validarEntradaParaBusca(cpf)
    
    const registros = await buscarEnderecoClientePorCPF(cpf);
    validarBuscaEnderecoCliente(registros)

    return registros;
}