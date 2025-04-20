import { buscarClientesPorCpf } from '../../repository/cliente/clienteRepository.js';
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente } from '../../validation/cliente/clienteValidation.js';
import { limparCPF, validarCPF } from '../autenticacao/autenticacaoCPF.js';

export default async function buscarClientesPorCpfService(cpf) {
    validarEntradaParaBuscaPorCliente(cpf);

    validarCPF(cpf);
    let cpfLimpo = limparCPF(cpf);
    
    const registro = await buscarClientesPorCpf(cpfLimpo);
    validarBuscaCliente(registro);

    return registro;
}