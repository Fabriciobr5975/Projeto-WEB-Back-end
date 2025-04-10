import { buscarVinhoPorNome } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorNomeService(nomeVinho) {
    validarEntradaParaBuscaPorVinho(nomeVinho);
    
    const registro = await buscarVinhoPorNome(nomeVinho);
    validarBuscaVinho(registro);

    return registro;
}