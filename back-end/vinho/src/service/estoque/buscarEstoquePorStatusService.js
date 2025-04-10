import { buscarEstoquePorStatus } from '../../repository/estoque/estoqueRepository.js'
import { validarEntradaParaBuscaPorEstoque, validarBuscaEstoque } from '../../validation/estoque/estoqueValidation.js'

export default async function buscarEstoquePorStatusService(status) {
    validarEntradaParaBuscaPorEstoque(status);

    const registro = await buscarEstoquePorStatus(status);
    validarBuscaEstoque(registro);

    return registro;
}