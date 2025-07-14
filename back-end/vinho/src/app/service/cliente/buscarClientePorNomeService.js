import { buscarClientesPorNome } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente } from '../../validation/cliente/clienteValidation.js'

export default async function buscarClientesPorNomeService(nome) {
    validarEntradaParaBuscaPorCliente(nome);

    const registro = await buscarClientesPorNome(nome);
    validarBuscaCliente(registro);

    // Removendo a senha do cliente;
    registro[0].senha = undefined;

    return registro;
}