import { buscarVinhoPorPais } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorPaisService(pais) {
    validarEntradaParaBuscaPorVinho(pais);
    
    const registro = await buscarVinhoPorPais(pais);
    validarBuscaVinho(registro);

    return registro;
}