import { buscarVinhoPorClassificacao } from '../../repository/vinho/vinhoRepository.js';
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js';
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarVinhoPorClassificacaoService(classificaoVinho) {
    validarEntradaParaBuscaPorVinho(classificaoVinho);

    const registro = await buscarVinhoPorClassificacao(classificaoVinho);
    validarBuscaVinho(registro);

    return tranformarImagemBase64(registro);
}