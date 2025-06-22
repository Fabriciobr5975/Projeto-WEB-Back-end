import { buscarPaisPorNome } from '../../repository/pais/paisRepository.js'
import { validarEntradaParaBuscaPorPais, validarBuscaPais } from '../../validation/pais/paisValidation.js'

export default async function buscarPaisPorNomeService (nomePais) {
    validarEntradaParaBuscaPorPais(nomePais);
    const registros = await buscarPaisPorNome(nomePais);
    validarBuscaPais(registros);

    return registros;
}