import { listaVinicolas } from '../../repository/vinho/vinicolaRepository.js'
import { validarBuscaVinicola } from '../../validation/vinho/vinicolaValidation.js'

export default async function listarVinicolaService () {
    const registro = await listaVinicolas();
    validarBuscaVinicola(registro);

    return registro;
}