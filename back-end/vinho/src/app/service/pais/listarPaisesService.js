import { listarPaises } from '../../repository/pais/paisRepository.js'
import { validarBuscaPais } from '../../validation/pais/paisValidation.js'

export default async function listarPaisesService () {
    const registro = await listarPaises();
    validarBuscaPais(registro);

    return registro;
}