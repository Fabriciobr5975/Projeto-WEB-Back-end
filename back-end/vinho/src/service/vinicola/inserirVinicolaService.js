import { buscarVinicolaPorNome, inserirVinicola } from '../../repository/vinho/vinicolaRepository.js'
import { validarCamposObrigatoriosVinicola, verificarSeVinicolasSãoIguais, verificarSeVinicolaFoiInserida } from '../../validation/vinicola/vinicolaValidation.js'

export default async function inserirVinicolaService(vinicola) {
    validarCamposObrigatoriosVinicola(vinicola);

    const registro = await buscarVinicolaPorNome(vinicola.vinicola);
    verificarSeVinicolasSãoIguais(registro, vinicola);

    const resposta = await inserirVinicola(vinicola);
    verificarSeVinicolaFoiInserida(resposta);

    return resposta;
}