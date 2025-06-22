import { buscarEnderecoPorCep } from '../../repository/endereco/enderecoRepository.js';
import { validarEntradaParaBuscaPorEndereco, validarBuscaEndereco } from '../../validation/endereco/enderecoValidation.js';
import { limparCEP, validarCEP } from '../autenticacao/autenticacaoCEP.js'; 

export default async function buscarEnderecoPorCepService(cep) {
    validarEntradaParaBuscaPorEndereco(cep);

    const cepLimpo = limparCEP(cep);
    validarCEP(cepLimpo);

    const registros = await buscarEnderecoPorCep(cepLimpo);
    validarBuscaEndereco(registros);

    return registros;
}