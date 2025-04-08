import { listarVinhos } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function listarVinhoService() {
    const registros = await listarVinhos();
    validarEntradaParaBuscaPorVinho(registros);

    return registros;
}