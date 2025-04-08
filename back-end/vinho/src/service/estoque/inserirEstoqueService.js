import { buscarEstoquePorVinho, inserirEstoque } from '../../repository/estoque/estoqueRepository.js'
import { validarCamposObrigatoriosEstoque, validarBuscaEstoque, verificarSeEstoqueSãoIguais, verificarSeEstoqueFoiInserido } from '../../validation/estoque/estoqueValidation.js'

export default async function inserirEstoqueService(estoque) {
    validarCamposObrigatoriosEstoque(estoque);
    
    const registro = await buscarEstoquePorVinho(estoque.vinho);
    validarBuscaEstoque(registro);
    verificarSeEstoqueSãoIguais(registro, estoque);

    const resposta = await inserirEstoque(estoque);
    verificarSeEstoqueFoiInserido(resposta);

    return resposta;
}