import { buscarEstoquePorId, alterarEstoque } from '../../repository/estoque/estoqueRepository.js'
import { validarEntradaParaBuscaPorEstoque, validarCamposObrigatoriosEstoque, validarBuscaEstoque, verificarSeEstoqueSãoIguais, verificarSeEstoqueFoiAlterado } from '../../validation/estoque/estoqueValidation.js'

export default async function alterarEstoqueService(idEstoque, estoque) {
    validarEntradaParaBuscaPorEstoque(idEstoque);
    validarCamposObrigatoriosEstoque(estoque);

    const registro = await buscarEstoquePorId(idEstoque);
    validarBuscaEstoque(registro)
    //verificarSeEstoqueSãoIguais(registro, estoque);

    const resposta = await alterarEstoque(idEstoque, estoque);
    verificarSeEstoqueFoiAlterado(resposta);

    return resposta;
}