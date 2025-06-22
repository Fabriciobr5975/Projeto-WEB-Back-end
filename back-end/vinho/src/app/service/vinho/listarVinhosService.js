import { listarVinhos } from '../../repository/vinho/vinhoRepository.js'
import { validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function listarVinhoService() {
    const registros = await listarVinhos();
    validarBuscaVinho(registros);
   
    return tranformarImagemBase64(registros);
}