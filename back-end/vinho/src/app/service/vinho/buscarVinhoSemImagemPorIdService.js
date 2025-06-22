import { buscarVinhoSemImagemPorId } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoSemImagemPorIdService(idVinho) {
    validarEntradaParaBuscaPorVinho(idVinho);
    
    const registro = await buscarVinhoSemImagemPorId(idVinho);
    validarBuscaVinho(registro);

    return registro;
}