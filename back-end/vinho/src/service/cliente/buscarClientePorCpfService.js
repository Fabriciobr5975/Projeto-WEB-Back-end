import { buscarClientesPorCpf } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente } from '../../validation/cliente/clienteValidation.js'

export default async function buscarClientesPorCpfService(cpf) {
    validarEntradaParaBuscaPorCliente(cpf);

    const registro = await buscarClientesPorCpf(cpf);
    validarBuscaCliente(registro);

    return registro;
}