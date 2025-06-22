import { buscarPaisPorSigla, inserirPais } from '../../repository/pais/paisRepository.js'
import { verificarSePaisesSãoIguais, validarCamposObrigatoriosPais, verificarSePaisFoiInserido } from '../../validation/pais/paisValidation.js'

export default async function inserirPaisService (pais) {    
    validarCamposObrigatoriosPais(pais);
    
    const registro = await buscarPaisPorSigla(pais.sigla);    
    verificarSePaisesSãoIguais(registro, pais);
    
    const resposta = await inserirPais(pais);
    verificarSePaisFoiInserido(resposta);

    return resposta;
}