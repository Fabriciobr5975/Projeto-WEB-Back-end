import { buscarEnderecoPorLogradouro } from '../../repository/endereco/enderecoRepository.js'
import { validarEntradaParaBuscaPorEndereco, validarBuscaEndereco } from '../../validation/endereco/enderecoValidation.js'

export default async function buscarEnderecoPorLogradouroService(logradouro) {
    validarEntradaParaBuscaPorEndereco(logradouro);
    
    const registros = await buscarEnderecoPorLogradouro(logradouro);
    validarBuscaEndereco(registros);

    return registros;
}