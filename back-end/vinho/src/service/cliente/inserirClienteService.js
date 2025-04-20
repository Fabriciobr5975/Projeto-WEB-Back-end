import { buscarClientesPorCpf, inserirCliente } from '../../repository/cliente/clienteRepository.js'
import { validarCamposObrigatoriosCliente, verificarSeClientesSãoIguais, verificarSeClienteFoiAlterado, verificarSeClienteFoiInserido } from '../../validation/cliente/clienteValidation.js'
import { limparCPF, validarCPF } from '../autenticacao/autenticacaoCPF.js';

export default async function inserirClienteService(cliente) {
    validarCamposObrigatoriosCliente(cliente);
    
    let cpfLimpo = limparCPF(cliente.cpf)
    validarCPF(cpfLimpo);

    const registro = await buscarClientesPorCpf(cpfLimpo)
    verificarSeClientesSãoIguais(registro, cliente);

    // Alterando o cpf que vem via JSON para o cpf limpo
    cliente.cpf = cpfLimpo; 

    const resposta = await inserirCliente(cliente);
    verificarSeClienteFoiInserido(resposta);

    return resposta;
}