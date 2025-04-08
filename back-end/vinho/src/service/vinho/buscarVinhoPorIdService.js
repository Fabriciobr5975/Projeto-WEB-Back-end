import { buscarVinhoPorId } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorIdService(idVinho) {
    validarEntradaParaBuscaPorVinho(idVinho);
    
    const registro = await buscarVinhoPorId(idVinho);
    validarBuscaVinho(registro);

    return registro;
}