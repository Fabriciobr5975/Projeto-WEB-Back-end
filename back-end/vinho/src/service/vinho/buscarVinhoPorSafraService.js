import { buscarVinhoPorSafra } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorSafraService(safra) {
    validarEntradaParaBuscaPorVinho(safra);
    
    const registro = await buscarVinhoPorSafra(safra);
    validarBuscaVinho(registro);

    return registro;
}