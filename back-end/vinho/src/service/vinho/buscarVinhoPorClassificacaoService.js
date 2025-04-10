import { buscarVinhoPorClassificacao } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorClassificacaoService(classificaoVinho) {
    validarEntradaParaBuscaPorVinho(classificaoVinho);
    
    const registro = await buscarVinhoPorClassificacao(classificaoVinho);
    validarBuscaVinho(registro);

    return registro;
}