import { buscarClientesPorCpf, inserirCliente } from '../../repository/cliente/clienteRepository.js'
import { validarCamposObrigatoriosCliente, validarBuscaCliente, verificarSeClientesSãoIguais, verificarSeClienteFoiAlterado } from '../../validation/cliente/clienteValidation.js'

export default async function inserirClienteService(cliente) {
    validarCamposObrigatoriosCliente(cliente);
    
    const registro = await buscarClientesPorCpf(cliente.cpf)
    validarBuscaCliente(registro);
    verificarSeClientesSãoIguais(registro, cliente);

    const resposta = await inserirCliente(cliente);
    verificarSeClienteFoiAlterado(resposta);

    return resposta;
}