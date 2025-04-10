import { buscarEstoquePorSafra } from '../../repository/estoque/estoqueRepository.js'
import { validarEntradaParaBuscaPorEstoque, validarBuscaEstoque } from '../../validation/estoque/estoqueValidation.js'

export default async function buscarEstoquePorSafraService(safra) {
    validarEntradaParaBuscaPorEstoque(safra);

    const registro = await buscarEstoquePorSafra(safra);
    validarBuscaEstoque(registro);

    return registro;
}