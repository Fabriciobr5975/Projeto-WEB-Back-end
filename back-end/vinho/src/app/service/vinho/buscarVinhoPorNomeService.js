import { buscarVinhoPorNome } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarVinhoPorNomeService(nomeVinho) {
    validarEntradaParaBuscaPorVinho(nomeVinho);
    
    const registro = await buscarVinhoPorNome(nomeVinho);
    validarBuscaVinho(registro);
    
    return tranformarImagemBase64(registro);
}