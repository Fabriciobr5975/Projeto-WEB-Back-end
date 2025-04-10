import { buscarVinhoPorPreco } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorPrecoService(precoVinho) {
    validarEntradaParaBuscaPorVinho(precoVinho);
    
    const registro = await buscarVinhoPorPreco(precoVinho);
    validarBuscaVinho(registro);

    return registro;
}