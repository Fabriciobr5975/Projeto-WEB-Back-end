import { buscarVinicolaPorId, removerVinicola } from '../../repository/vinho/vinicolaRepository.js'
import { validarEntradaParaBuscaPorVinicola, validarBuscaVinicola, verificarSeVinicolaFoiRemovida } from '../../validation/vinho/vinicolaValidation.js'

export default async function removerPaisService (idVinicola) {
    validarEntradaParaBuscaPorVinicola(idVinicola);
    
    const registro = await buscarVinicolaPorId(idVinicola);
    validarBuscaVinicola(registro);
    
    const resposta = await removerVinicola(idVinicola);
    verificarSeVinicolaFoiRemovida(resposta);

    return resposta;
}