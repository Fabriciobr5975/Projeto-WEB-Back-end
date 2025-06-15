import { buscarVinhoPorTeorAlcoolico } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarVinhoPorTeorAlcoolicoService(teorAlcoolico) {
    validarEntradaParaBuscaPorVinho(teorAlcoolico);

    const registro = await buscarVinhoPorTeorAlcoolico(teorAlcoolico);
    validarBuscaVinho(registro);

    return tranformarImagemBase64(registro);
}