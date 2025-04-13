import { buscarPaisPorId, removerPais } from '../../repository/pais/paisRepository.js'
import { validarEntradaParaBuscaPorPais, validarBuscaPais, verificarSePaisFoiRemovido } from '../../validation/pais/paisValidation.js'

export default async function removerPaisService (idPais) {
    validarEntradaParaBuscaPorPais(idPais);
    
    const registro = await buscarPaisPorId(idPais);
    validarBuscaPais(registro);
    
    const resposta = await removerPais(idPais);
    verificarSePaisFoiRemovido(resposta);

    return resposta;
}