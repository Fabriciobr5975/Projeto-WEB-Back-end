import { buscarClientesPorId, alterarCliente } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarCamposObrigatoriosAlteracaoCliente, validarBuscaCliente, verificarSeClienteFoiAlterado } from '../../validation/cliente/clienteValidation.js'

export default async function alterarClienteClienteService(idCliente, cliente) {
    validarEntradaParaBuscaPorCliente(idCliente);
    validarCamposObrigatoriosAlteracaoCliente(cliente);

    const registro = await buscarClientesPorId(idCliente);
    validarBuscaCliente(registro);

    const resposta = await alterarCliente(idCliente, cliente);
    verificarSeClienteFoiAlterado(resposta);

    return resposta;
}