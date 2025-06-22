import { buscarEstoquePorId, removerEstoque } from '../../repository/estoque/estoqueRepository.js'
import { validarEntradaParaBuscaPorEstoque, validarBuscaEstoque, verificarSeEstoqueFoiRemovido } from '../../validation/estoque/estoqueValidation.js'

export default async function removerEstoqueService(idEstoque) {
    validarEntradaParaBuscaPorEstoque(idEstoque);

    const registro = await buscarEstoquePorId(idEstoque);
    validarBuscaEstoque(registro);

    const resposta = await removerEstoque(idEstoque);
    verificarSeEstoqueFoiRemovido(idEstoque);

    return resposta;
}