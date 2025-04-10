import { buscarClientesPorCep } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente } from '../../validation/cliente/clienteValidation.js'

export default async function buscarClientesPorCepService(cep) {
    validarEntradaParaBuscaPorCliente(cep);

    const registro = await buscarClientesPorCep(cep);
    validarBuscaCliente(registro);

    return registro;
}