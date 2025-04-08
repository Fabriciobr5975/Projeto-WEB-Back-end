import { buscarItensCarrinhoPorId, alterarItensCarrinho } from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, validarCamposObrigatoriosItensCarrinho, validarBuscaItensCarrinho, verificarSeItensCarrinhoFoiAlterado } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function alterarItensCarrinhoService(idItensCarrinho, itens_carrinho) {
    validarEntradaParaBuscaPorItensCarrinho(idItensCarrinho);
    validarCamposObrigatoriosItensCarrinho(itens_carrinho);

    const registro = buscarItensCarrinhoPorId(idItensCarrinho)
    validarBuscaItensCarrinho(registro);

    const resposta = await alterarItensCarrinho(idItensCarrinho, itens_carrinho);
    verificarSeItensCarrinhoFoiAlterado(resposta);

    return resposta;
}