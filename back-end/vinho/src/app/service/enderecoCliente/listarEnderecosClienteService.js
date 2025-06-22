import { listarEnderecosCliente } from '../../repository/endereco/enderecoClienteRepository.js'
import { validarBuscaEnderecoCliente } from '../../validation/endereco/enderecoClienteValidation.js';

export default async function listarEnderecosClienteService() {
    const registros = await listarEnderecosCliente();
    validarBuscaEnderecoCliente(registros)

    return registros;
}