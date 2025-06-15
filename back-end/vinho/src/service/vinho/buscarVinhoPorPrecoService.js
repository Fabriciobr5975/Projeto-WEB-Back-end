import { buscarVinhoPorPreco } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarVinhoPorPrecoService(precoVinho) {
    validarEntradaParaBuscaPorVinho(precoVinho);
    
    const registro = await buscarVinhoPorPreco(precoVinho);
    validarBuscaVinho(registro);

    return tranformarImagemBase64(registro);
}