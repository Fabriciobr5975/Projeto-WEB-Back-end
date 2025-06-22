import { inserirItensCarrinho } from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarCamposObrigatoriosItensCarrinho, verificarSeItensCarrinhoFoiInserido } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function inserirItensCarrinhoService(itens_carrinho) {
    validarCamposObrigatoriosItensCarrinho(itens_carrinho);

    const resposta = await inserirItensCarrinho(itens_carrinho);
    verificarSeItensCarrinhoFoiInserido(resposta);

    return resposta;
}