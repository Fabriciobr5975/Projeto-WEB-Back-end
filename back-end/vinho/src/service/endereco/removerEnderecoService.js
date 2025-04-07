import { removerEndereco } from '../../repository/endereco/enderecoRepository.js'
import { validarEntradaParaBuscaPorEndereco, verificarSeEnderecoFoiRemovido } from '../../validation/endereco/enderecoValidation.js'

export default async function removerEnderecoService(idEndereco) {
    validarEntradaParaBuscaPorEndereco(idEndereco);

    const resposta = await removerEndereco(idEndereco);
    verificarSeEnderecoFoiRemovido(resposta);

    return resposta;
}