import { buscarClientesPorId, alterarCliente } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarCamposObrigatoriosCliente, validarBuscaCliente, verificarSeClienteFoiAlterado } from '../../validation/cliente/clienteValidation.js'
import { limparCPF, validarCPF } from '../autenticacao/autenticacaoCPF.js';

export default async function alterarClienteClienteService(idCliente, cliente) {
    validarEntradaParaBuscaPorCliente(idCliente);
    validarCamposObrigatoriosCliente(cliente);

    let cpfLimpo = limparCPF(cliente.cpf);
    
    if(!(validarCPF(cpfLimpo))) 
        throw new Error(`O CPF ${cliente.cpf} não é válido`);

    const registro = await buscarClientesPorId(idCliente);
    validarBuscaCliente(registro);

    // Alterando o cpf que vem via JSON para o cpf limpo
    cliente.cpf = cpfLimpo;

    const resposta = await alterarCliente(idCliente, cliente);
    verificarSeClienteFoiAlterado(resposta);

    return resposta;
}