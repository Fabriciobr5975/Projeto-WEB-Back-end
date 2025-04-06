import { removerPais } from '../../repository/pais/paisRepository.js'
import { validarEntradaParaBuscaPorPais, verificarSePaisFoiRemovido } from '../../validation/pais/paisValidation.js'

export default async function removerPaisService (idPais) {
    validarEntradaParaBuscaPorPais(idPais);
    const resposta = await removerPais(idPais);
    verificarSePaisFoiRemovido(resposta);

    return resposta;
}