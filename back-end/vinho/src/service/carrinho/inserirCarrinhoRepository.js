import { inserirCarrinho } from '../../repository/carrinho/carrinhoRepository.js'
import { validarCamposObrigatoriosCarrinho, verificarSeCarrinhoFoiInserido} from '../../validation/carrinho/carrinhoValidation.js'

export default async function inserirCarrinhoService(carrinho) {
    validarCamposObrigatoriosCarrinho(carrinho);

    const resposta = await inserirCarrinho(carrinho);
    verificarSeCarrinhoFoiInserido(carrinho);

    return resposta;
}
