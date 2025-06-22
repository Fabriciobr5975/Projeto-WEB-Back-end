import { buscarEnderecoPorCidade } from '../../repository/endereco/enderecoRepository.js'
import { validarEntradaParaBuscaPorEndereco, validarBuscaEndereco } from '../../validation/endereco/enderecoValidation.js'

export default async function buscarEnderecoPorCidadeService(cidade) {
    validarEntradaParaBuscaPorEndereco(cidade);
    
    const registros = await buscarEnderecoPorCidade(cidade);
    validarBuscaEndereco(registros);

    return registros;
}