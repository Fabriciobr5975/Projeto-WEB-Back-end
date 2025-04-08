import { removerEstoque } from '../../repository/estoque/estoqueRepository.js'
import { validarEntradaParaBuscaPorEstoque, verificarSeEstoqueFoiRemovido } from '../../validation/estoque/estoqueValidation.js'

export default async function removerEstoqueService(idEstoque) {
    validarEntradaParaBuscaPorEstoque(idEstoque);

    const resposta = await removerEstoque(idEstoque);
    verificarSeEstoqueFoiRemovido(idEstoque);

    return resposta;
}