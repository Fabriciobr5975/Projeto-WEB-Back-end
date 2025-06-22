import { buscarVinhoPorId, removerVinho } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho, verificarSeVinhoFoiRemovido } from '../../validation/vinho/vinhoValidation.js'

export default async function removerVinhoService(idVinho) {
    validarEntradaParaBuscaPorVinho(idVinho);

    const registro = await buscarVinhoPorId(idVinho);
    validarBuscaVinho(registro);
    
    const resposta = await removerVinho(idVinho);
    verificarSeVinhoFoiRemovido(resposta);

    return resposta;
}