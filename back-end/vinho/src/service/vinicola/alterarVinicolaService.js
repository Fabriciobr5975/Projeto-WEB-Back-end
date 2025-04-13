import { buscarVinicolaPorId, alterarVinicola } from '../../repository/vinho/vinicolaRepository.js'
import { validarEntradaParaBuscaPorVinicola, validarCamposObrigatoriosVinicola, validarBuscaVinicola, verificarSeVinicolasSãoIguais, verificarSeVinicolaFoiAlterada } from '../../validation/vinho/vinicolaValidation.js'

export default async function alterarVinicolaService (idVinicola, vinicola) {
    validarEntradaParaBuscaPorVinicola(idVinicola);
    validarCamposObrigatoriosVinicola(vinicola);
    
    const registro = await buscarVinicolaPorId(idVinicola);
    validarBuscaVinicola(registro);
    verificarSeVinicolasSãoIguais(registro, vinicola)
    
    const resposta = await alterarVinicola(idVinicola, vinicola);
    verificarSeVinicolaFoiAlterada(registro);
    
    return resposta;
}