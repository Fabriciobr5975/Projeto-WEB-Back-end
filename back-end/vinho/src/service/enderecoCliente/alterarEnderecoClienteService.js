import { buscarEnderecoClientePorCEP, alterarEnderecoCliente } from '../../repository/endereco/enderecoClienteRepository.js'
import { validarCamposObrigatoriosEnderecoCliente, validarBuscaEnderecoCliente, verificarSeEnderecoClienteFoiAlterado} from '../../validation/endereco/enderecoClienteValidation.js';

export default async function alterarEnderecoClienteService(enderecoCliente) {
    validarCamposObrigatoriosEnderecoCliente(enderecoCliente);

    const registros = await buscarEnderecoClientePorCEP(enderecoCliente.cep);
    validarBuscaEnderecoCliente(registros);
    
    const resposta = await alterarEnderecoCliente(enderecoCliente);
    verificarSeEnderecoClienteFoiAlterado(resposta);

    return registros;
}