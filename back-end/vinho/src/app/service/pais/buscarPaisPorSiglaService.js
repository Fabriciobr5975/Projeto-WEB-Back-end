import { buscarPaisPorSigla } from '../../repository/pais/paisRepository.js'
import { validarEntradaParaBuscaPorPais, validarBuscaPais } from '../../validation/pais/paisValidation.js'

export default async function buscarPaisPorSiglaService (siglaPais) {
    validarEntradaParaBuscaPorPais(siglaPais);
    const registro = await buscarPaisPorSigla(siglaPais);
    validarBuscaPais(registro);

    return registro;
}