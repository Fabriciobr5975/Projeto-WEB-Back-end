import { alterarCarrinho } from '../../repository/carrinho/carrinhoRepository.js'
import { validarEntradaParaBuscaPorCarrinho, validarCamposObrigatoriosCarrinho, verificarSeCarrinhoFoiAlterado} from '../../validation/carrinho/carrinhoValidation.js'

export default async function alterarCarrinhoService(idCarrinho, carrinho) {
    validarEntradaParaBuscaPorCarrinho(idCarrinho);
    validarCamposObrigatoriosCarrinho(carrinho);

    const resposta = await alterarCarrinho(idCarrinho, carrinho); 
    verificarSeCarrinhoFoiAlterado(resposta);

    return resposta;
}
