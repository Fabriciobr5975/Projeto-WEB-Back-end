import { buscarVinicolaPorId, alterarVinicola } from '../../repository/vinho/vinicolaRepository.js'
import { validarCamposObrigatoriosVinicola, verificarSeVinicolasSãoIguais, verificarSeVinicolaFoiAlterada } from '../../validation/vinicola/vinicolaValidation.js'

export default async function alterarVinicolaService (idVinicola, vinicola) {
    validarCamposObrigatoriosVinicola(idVinicola);
    
    const registro = await buscarVinicolaPorId(idVinicola);
    verificarSeVinicolasSãoIguais(registro, vinicola)
    
    const resposta = await alterarVinicola(idVinicola, vinicola);
    verificarSeVinicolaFoiAlterada(registro);
    
    return resposta;
}