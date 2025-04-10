import { buscarEnderecoPorUF } from '../../repository/endereco/enderecoRepository.js'
import { validarEntradaParaBuscaPorEndereco, validarBuscaEndereco } from '../../validation/endereco/enderecoValidation.js'

export default async function buscarEnderecoPorUFService(ufCidade) {
    validarEntradaParaBuscaPorEndereco(ufCidade);
    
    const registros = await buscarEnderecoPorUF(ufCidade);
    validarBuscaEndereco(registros);

    return resposta;
}