import { buscarVinhoPorId, alterarVinho } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarCamposObrigatoriosVinho, validarBuscaVinho, verificarSeVinhoFoiAlterado } from '../../validation/vinho/vinhoValidation.js'

export default async function alterarVinhoService(idVinho, vinho) {
    validarEntradaParaBuscaPorVinho(idVinho);
    validarCamposObrigatoriosVinho(vinho);
    
    const registro = await buscarVinhoPorId(idVinho);
    validarBuscaVinho(registro);

    const resposta = await alterarVinho(idVinho, vinho);
    verificarSeVinhoFoiAlterado(resposta)
    
    return resposta;
}