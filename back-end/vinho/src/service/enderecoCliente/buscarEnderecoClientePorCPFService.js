import { buscarEnderecoClientePorCPF } from '../../repository/endereco/enderecoClienteRepository.js'
import { validarEntradaParaBusca, validarBuscaEnderecoCliente } from '../../validation/endereco/enderecoClienteValidation.js';
import { limparCPF, verificarCPFValido } from '../autenticacao/autenticacaoCPF.js'

export default async function buscarEnderecoClientePorCPFService(cpf) {
    validarEntradaParaBusca(cpf)
    
    verificarCPFValido(cpf);
    let cpfLimpo = limparCPF(cpf);

    const registros = await buscarEnderecoClientePorCPF(cpfLimpo);
    validarBuscaEnderecoCliente(registros)

    return registros;
}