import { buscarVinhoPorUva } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorUvaService(uva) {
    validarEntradaParaBuscaPorVinho(uva);
    
    const registro = await buscarVinhoPorUva(uva);
    validarBuscaVinho(registro);

    return registro;
}