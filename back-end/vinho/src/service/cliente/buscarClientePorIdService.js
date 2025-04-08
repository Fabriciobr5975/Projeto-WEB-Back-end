import { buscarClientesPorId } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente } from '../../validation/cliente/clienteValidation.js'

export default async function buscarClientePorIdService(idCliente) {
    validarEntradaParaBuscaPorCliente(idCliente);

    const registro = await buscarClientesPorId(idCliente);
    validarBuscaCliente(registro);

    return registro;
}