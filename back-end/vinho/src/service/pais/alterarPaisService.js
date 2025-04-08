import { buscarPaisPorId, alterarPais } from '../../repository/pais/paisRepository.js'
import { validarCamposObrigatoriosPais, validarBuscaPais, verificarSePaisesSãoIguais, verificarSePaisFoiAlterado } from '../../validation/pais/paisValidation.js'

export default async function alterarPaisService (idPais, pais) {
    validarCamposObrigatoriosPais(idPais);
    
    const registro = await buscarPaisPorId(idPais);
    validarBuscaPais(registro);
    verificarSePaisesSãoIguais(registro, pais)
    
    const resposta = await alterarPais(idPais, pais);
    verificarSePaisFoiAlterado(registro);
    
    return resposta;
}