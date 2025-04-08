import { removerItensCarrinho } from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, verificarSeItensCarrinhoFoiRemovido } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function removerItensCarrinhoService(idItensCarrinho) {
    validarEntradaParaBuscaPorItensCarrinho(idItensCarrinho);

    const resposta = await removerItensCarrinho(idItensCarrinho);
    verificarSeItensCarrinhoFoiRemovido(resposta);

    return resposta;
}