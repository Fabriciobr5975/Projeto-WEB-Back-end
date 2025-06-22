import { buscarEnderecoPorId, removerEndereco } from '../../repository/endereco/enderecoRepository.js'
import { validarEntradaParaBuscaPorEndereco, validarBuscaEndereco, verificarSeEnderecoFoiRemovido } from '../../validation/endereco/enderecoValidation.js'

export default async function removerEnderecoService(idEndereco) {
    validarEntradaParaBuscaPorEndereco(idEndereco);

    const registro = await buscarEnderecoPorId(idEndereco);
    validarBuscaEndereco(registro);

    const resposta = await removerEndereco(idEndereco);
    verificarSeEnderecoFoiRemovido(resposta);

    return resposta;
}