import { buscarClientesPorId, alterarCliente } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarCamposObrigatoriosCliente, validarBuscaCliente, verificarSeClienteFoiAlterado } from '../../validation/cliente/clienteValidation.js'
import { limparCPF, validarCPF } from '../autenticacao/autenticacaoCPF.js';

export default async function alterarClienteClienteService(idCliente, cliente) {
    validarEntradaParaBuscaPorCliente(idCliente);
    validarCamposObrigatoriosCliente(cliente);

    let cpfLimpo = limparCPF(cliente.cpf);
    validarCPF(cliente.cpf);

    const registro = buscarClientesPorId(idCliente)
    validarBuscaCliente(registro);

    // Alterando o cpf que vem via JSON para o cpf limpo
    cliente.cpf = cpfLimpo;

    const resposta = await alterarCliente(idCliente, cliente);
    verificarSeClienteFoiAlterado(resposta);

    return resposta;
}