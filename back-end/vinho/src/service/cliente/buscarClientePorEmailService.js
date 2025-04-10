import { buscarClientesPorEmail } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente } from '../../validation/cliente/clienteValidation.js'

export default async function buscarClientesPorEmailService(email) {
    validarEntradaParaBuscaPorCliente(email);

    const registro = await buscarClientesPorEmail(email);
    validarBuscaCliente(registro);

    return registro;
}