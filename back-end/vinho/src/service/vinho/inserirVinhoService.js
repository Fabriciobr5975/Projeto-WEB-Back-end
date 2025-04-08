import { inserirVinho } from '../../repository/vinho/vinhoRepository.js'
import { validarCamposObrigatoriosVinho, verificarSeVinhoFoiInserido } from '../../validation/vinho/vinhoValidation.js'

export default async function inserirVinhoService(vinho) {
    validarCamposObrigatoriosVinho(vinho);

    const resposta = await inserirVinho(vinho);
    verificarSeVinhoFoiInserido(resposta);

    return resposta;
}