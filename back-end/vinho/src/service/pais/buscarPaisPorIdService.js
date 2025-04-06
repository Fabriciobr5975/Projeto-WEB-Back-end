import { buscarPaisPorId } from '../../repository/pais/paisRepository.js'
import { validarEntradaParaBuscaPorPais, validarBuscaPais } from '../../validation/pais/paisValidation.js'

export default async function buscarPaisPorIdService (idPais) {
    validarEntradaParaBuscaPorPais(idPais);
    const registro = await buscarPaisPorId(idPais);
    validarBuscaPais(registro);

    return registro;
}