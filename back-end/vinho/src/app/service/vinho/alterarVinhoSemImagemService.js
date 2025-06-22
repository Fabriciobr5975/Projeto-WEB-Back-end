import { buscarVinhoPorId, alterarVinhoSemImagem } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarCamposObrigatoriosVinhoSemImagem, validarBuscaVinho, verificarSeVinhoFoiAlterado } from '../../validation/vinho/vinhoValidation.js'

export default async function alterarVinhoService(idVinho, vinho) {
    validarEntradaParaBuscaPorVinho(idVinho);
    validarCamposObrigatoriosVinhoSemImagem(vinho);
    
    const registro = await buscarVinhoPorId(idVinho);
    validarBuscaVinho(registro);

    const resposta = await alterarVinhoSemImagem(idVinho, vinho);
    verificarSeVinhoFoiAlterado(resposta)
    
    return resposta;
}