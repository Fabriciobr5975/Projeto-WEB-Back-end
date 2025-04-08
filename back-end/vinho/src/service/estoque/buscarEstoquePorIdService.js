import { buscarEstoquePorId } from '../../repository/estoque/estoqueRepository.js'
import { validarEntradaParaBuscaPorEstoque, validarBuscaEstoque } from '../../validation/estoque/estoqueValidation.js'

export default async function buscarEstoquePorIdService(idEstoque) {
    validarEntradaParaBuscaPorEstoque(idEstoque);

    const registro = await buscarEstoquePorId(idEstoque);
    validarBuscaEstoque(registro);

    return registro;
}