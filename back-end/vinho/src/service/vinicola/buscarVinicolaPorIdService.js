import { buscarVinicolaPorId } from '../../repository/vinho/vinicolaRepository.js'
import { validarEntradaParaBuscaPorVinicola, validarBuscaVinicola } from '../../validation/vinicola/vinicolaValidation.js'

export default async function buscarVinicolaPorIdService (idVinicola) {
    validarEntradaParaBuscaPorVinicola(idVinicola);
    const registro = await buscarVinicolaPorId(idVinicola);
    validarBuscaVinicola(registro);

    return registro;
}