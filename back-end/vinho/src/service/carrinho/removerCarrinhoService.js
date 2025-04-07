import { removerCarrinho } from '../../repository/carrinho/carrinhoRepository.js'
import { validarEntradaParaBuscaPorCarrinho, verificarSeCarrinhoFoiRemovido} from '../../validation/carrinho/carrinhoValidation.js'

export default async function removerCarrinhoService(idCarrinho) {
    validarEntradaParaBuscaPorCarrinho(idCarrinho);
    
    const resposta = await removerCarrinho(idCarrinho);
    verificarSeCarrinhoFoiRemovido(resposta);

    return resposta;
}
