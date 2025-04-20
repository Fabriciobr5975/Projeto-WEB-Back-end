import { buscarEnderecoPorCep } from '../../repository/endereco/enderecoRepository.js';
import { validarEntradaParaBuscaPorEndereco, validarBuscaEndereco } from '../../validation/endereco/enderecoValidation.js';

export default async function buscarEnderecoPorCepService(cep) {
    validarEntradaParaBuscaPorEndereco(cep);

    const registros = await buscarEnderecoPorCep(cep);
    validarBuscaEndereco(registros);

    return registros;
}