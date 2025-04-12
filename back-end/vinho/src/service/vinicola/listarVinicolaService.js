import { listaVinicolas } from '../../repository/vinho/vinicolaRepository.js'
import { validarBuscaVinicola } from '../../validation/vinho/vinicolaValidation.js'

export default async function listarVinicolaService () {
    const registro = await listaVinicolas(siglaPais);
    validarBuscaVinicola(registro);

    return registro;
}