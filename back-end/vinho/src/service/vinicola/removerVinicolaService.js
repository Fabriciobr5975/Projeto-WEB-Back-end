import { removerVinicola } from '../../repository/vinho/vinicolaRepository.js'
import { validarEntradaParaBuscaPorVinicola, verificarSeVinicolaFoiRemovida } from '../../validation/vinho/vinicolaValidation.js'

export default async function removerPaisService (idVinicola) {
    validarEntradaParaBuscaPorVinicola(idVinicola);
    const resposta = await removerVinicola(idVinicola);
    verificarSeVinicolaFoiRemovida(resposta);

    return resposta;
}