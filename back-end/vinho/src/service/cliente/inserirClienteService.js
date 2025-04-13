import { buscarClientesPorCpf, inserirCliente } from '../../repository/cliente/clienteRepository.js'
import { validarCamposObrigatoriosCliente, verificarSeClientesSãoIguais, verificarSeClienteFoiAlterado, verificarSeClienteFoiInserido } from '../../validation/cliente/clienteValidation.js'

export default async function inserirClienteService(cliente) {
    validarCamposObrigatoriosCliente(cliente);
    
    const registro = await buscarClientesPorCpf(cliente.cpf)
    verificarSeClientesSãoIguais(registro, cliente);

    const resposta = await inserirCliente(cliente);
    verificarSeClienteFoiInserido(resposta);

    return resposta;
}