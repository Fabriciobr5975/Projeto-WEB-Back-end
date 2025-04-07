import { listarEnderecos } from '../../repository/endereco/enderecoRepository.js'
import { validarBuscaEndereco } from '../../validation/endereco/enderecoValidation.js'

export default async function listarEnderecoService() {
    const registros = await listarEnderecos();
    validarBuscaEndereco(registros);

    return resposta;
}