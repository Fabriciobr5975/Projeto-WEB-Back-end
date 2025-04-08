import { buscarCarrinhoPorId, alterarCarrinho } from '../../repository/carrinho/carrinhoRepository.js'
import { validarEntradaParaBuscaPorCarrinho, validarCamposObrigatoriosCarrinho, validarBuscaCarrinho, verificarSeCarrinhoFoiAlterado} from '../../validation/carrinho/carrinhoValidation.js'

export default async function alterarCarrinhoService(idCarrinho, carrinho) {
    validarEntradaParaBuscaPorCarrinho(idCarrinho);
    validarCamposObrigatoriosCarrinho(carrinho);

    const registro = await buscarCarrinhoPorId(idCarrinho);
    validarBuscaCarrinho(registro);

    const resposta = await alterarCarrinho(idCarrinho, carrinho); 
    verificarSeCarrinhoFoiAlterado(resposta);

    return resposta;
}
