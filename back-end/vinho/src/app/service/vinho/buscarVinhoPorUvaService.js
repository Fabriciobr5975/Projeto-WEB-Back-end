import { buscarVinhoPorUva } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarVinhoPorUvaService(uva) {
    validarEntradaParaBuscaPorVinho(uva);
    
    const registro = await buscarVinhoPorUva(uva);
    validarBuscaVinho(registro);

    return tranformarImagemBase64(registro);
}