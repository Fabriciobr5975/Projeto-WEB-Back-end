import { removerVinho } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, verificarSeVinhoFoiRemovido } from '../../validation/vinho/vinhoValidation.js'

export default async function removerVinhoService(idVinho) {
    validarEntradaParaBuscaPorVinho(idVinho);
    
    const resposta = await removerVinho(idVinho);
    verificarSeVinhoFoiRemovido(resposta);

    return resposta;
}