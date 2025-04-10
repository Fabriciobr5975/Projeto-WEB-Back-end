import { buscarEstoquePorQuantidade } from '../../repository/estoque/estoqueRepository.js'
import { validarEntradaParaBuscaPorEstoque, validarBuscaEstoque } from '../../validation/estoque/estoqueValidation.js'

export default async function buscarEstoquePorQuantidadeService(quantidade) {
    validarEntradaParaBuscaPorEstoque(quantidade);

    const registro = await buscarEstoquePorQuantidade(quantidade);
    validarBuscaEstoque(registro);

    return registro;
}