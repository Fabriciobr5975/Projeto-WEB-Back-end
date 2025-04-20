import { buscarClientesPorCpf } from '../../repository/cliente/clienteRepository.js';
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente } from '../../validation/cliente/clienteValidation.js';
import { limparCPF, validarCPF } from '../autenticacao/autenticacaoCPF.js';

export default async function buscarClientesPorCpfService(cpf) {
    validarEntradaParaBuscaPorCliente(cpf);

    let cpfLimpo = limparCPF(cpf);

    if(!(validarCPF(cpfLimpo))) 
        throw new Error(`O CPF ${cpf} não é válido`);

    const registro = await buscarClientesPorCpf(cpfLimpo);
    validarBuscaCliente(registro);

    return registro;
}