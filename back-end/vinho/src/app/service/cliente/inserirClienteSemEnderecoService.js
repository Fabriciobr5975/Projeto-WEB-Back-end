import { buscarClientesPorCpf, inserirClienteSemEndereco } from '../../repository/cliente/clienteRepository.js'
import { validarCamposObrigatoriosCliente, verificarSeClientesSãoIguais, verificarSeClienteFoiInserido,  } from '../../validation/cliente/clienteValidation.js'
import { limparCPF, validarCPF } from '../autenticacao/autenticacaoCPF.js';

export default async function inserirClienteSemEnderecoService(cliente) {
    validarCamposObrigatoriosCliente(cliente);
    
    let cpfLimpo = limparCPF(cliente.cpf)
    
    if(!(validarCPF(cpfLimpo))) 
        throw new Error(`O CPF ${cliente.cpf} não é válido`);

    const registro = await buscarClientesPorCpf(cpfLimpo)
    verificarSeClientesSãoIguais(registro, cliente);

    // Alterando o cpf que vem via JSON para o cpf limpo
    cliente.cpf = cpfLimpo; 

    const resposta = await inserirClienteSemEndereco(cliente);
    verificarSeClienteFoiInserido(resposta);

    return resposta;
}
