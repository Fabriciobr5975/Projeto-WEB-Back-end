import { buscarEnderecoPorCep } from '../../repository/endereco/enderecoRepository.js'
import { validarEntradaParaBuscaPorEndereco, validarBuscaEndereco } from '../../validation/endereco/enderecoValidation.js'

export default async function buscarEnderecoPorCepService(idEndereco) {
    validarEntradaParaBuscaPorEndereco(idEndereco);
    
    const registros = await buscarEnderecoPorCep(idEndereco);
    validarBuscaEndereco(registros);

    return registros;
}