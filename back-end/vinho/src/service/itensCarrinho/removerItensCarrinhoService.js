import { buscarItensCarrinhoPorId, removerItensCarrinho } from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, validarBuscaItensCarrinho, verificarSeItensCarrinhoFoiRemovido } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function removerItensCarrinhoService(idItensCarrinho) {
    validarEntradaParaBuscaPorItensCarrinho(idItensCarrinho);

    const registro = await buscarItensCarrinhoPorId(idItensCarrinho);
    validarBuscaItensCarrinho(registro);

    const resposta = await removerItensCarrinho(idItensCarrinho);
    verificarSeItensCarrinhoFoiRemovido(resposta);

    return resposta;
}