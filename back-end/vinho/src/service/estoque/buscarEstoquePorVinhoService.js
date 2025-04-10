import { buscarEstoquePorVinho } from '../../repository/estoque/estoqueRepository.js'
import { validarEntradaParaBuscaPorEstoque, validarBuscaEstoque } from '../../validation/estoque/estoqueValidation.js'

export default async function buscarEstoquePorVinhoService(vinho) {
    validarEntradaParaBuscaPorEstoque(vinho);

    const registro = await buscarEstoquePorVinho(vinho);
    validarBuscaEstoque(registro);

    return registro;
}