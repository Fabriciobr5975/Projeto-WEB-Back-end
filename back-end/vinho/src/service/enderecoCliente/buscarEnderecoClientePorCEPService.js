import { buscarEnderecoClientePorCEP } from '../../repository/endereco/enderecoClienteRepository.js'
import { validarEntradaParaBusca, validarBuscaEnderecoCliente } from '../../validation/endereco/enderecoClienteValidation.js';
import { limparCEP, validarCEP } from '../autenticacao/autenticacaoCEP.js';

export default async function buscarEnderecoClientePorCEPService(cep) {
    validarEntradaParaBusca(cep);
    
    const cepLimpo = limparCEP(cep);
    validarCEP(cepLimpo);

    const registros = await buscarEnderecoClientePorCEP(cepLimpo);
    validarBuscaEnderecoCliente(registros);
    
    return registros;
}