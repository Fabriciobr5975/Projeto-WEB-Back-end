import { buscarEnderecoPorId } from '../../repository/endereco/enderecoRepository.js'
import { validarEntradaParaBuscaPorEndereco, validarBuscaEndereco } from '../../validation/endereco/enderecoValidation.js'

export default async function buscarEnderecoPorIdService(idEndereco) {
    validarEntradaParaBuscaPorEndereco(idEndereco);
    
    const registros = await buscarEnderecoPorId(idEndereco);
    validarBuscaEndereco(registros);

    return resposta;
}