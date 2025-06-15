import { listarMaisComprados } from '../../repository/vinho/vinhoRepository.js'
import { validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function listarVinhosMaisCompradosService() {
    const registros = await listarMaisComprados();
    validarBuscaVinho(registros);
   
    return tranformarImagemBase64(registros);
}