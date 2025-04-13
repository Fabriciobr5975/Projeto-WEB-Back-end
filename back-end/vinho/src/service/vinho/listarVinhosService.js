import { listarVinhos } from '../../repository/vinho/vinhoRepository.js'
import { validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function listarVinhoService() {
    const registros = await listarVinhos();
    validarBuscaVinho(registros);

    return registros;
}