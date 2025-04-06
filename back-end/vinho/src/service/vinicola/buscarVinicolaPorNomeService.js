import { buscarVinicolaPorNome } from '../../repository/vinho/vinicolaRepository.js'
import { validarEntradaParaBuscaPorVinicola, validarBuscaVinicola } from '../../validation/vinicola/vinicolaValidation.js'

export default async function buscarPaisPorNomeService (nomeVinicola) {
    validarEntradaParaBuscaPorVinicola(nomeVinicola);
    const registros = await buscarVinicolaPorNome(nomeVinicola);
    validarBuscaVinicola(registros);

    return registros;
}