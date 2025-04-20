import { buscarEnderecoClientePorCEP, alterarEnderecoCliente } from '../../repository/endereco/enderecoClienteRepository.js'
import { validarCamposObrigatoriosEnderecoCliente, validarBuscaEnderecoCliente, verificarSeEnderecoClienteFoiAlterado} from '../../validation/endereco/enderecoClienteValidation.js';
import { limparCPF, verificarCPFValido } from '../autenticacao/autenticacaoCPF.js';

export default async function alterarEnderecoClienteService(endereco, cliente, enderecoCliente) {
    validarCamposObrigatoriosEnderecoCliente(enderecoCliente);

    verificarCPFValido(cliente);
    let cpfLimpo = limparCPF(cliente);

    const registros = await buscarEnderecoClientePorCEP(endereco);
    validarBuscaEnderecoCliente(registros);
    
    enderecoCliente.cliente = cpfLimpo;

    const resposta = await alterarEnderecoCliente(endereco, cliente, enderecoCliente);
    verificarSeEnderecoClienteFoiAlterado(resposta);

    return resposta;
}