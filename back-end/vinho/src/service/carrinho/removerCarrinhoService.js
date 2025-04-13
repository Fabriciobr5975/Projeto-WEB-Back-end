import { buscarCarrinhoPorId, removerCarrinho } from '../../repository/carrinho/carrinhoRepository.js'
import { validarEntradaParaBuscaPorCarrinho, validarBuscaCarrinho, verificarSeCarrinhoFoiRemovido} from '../../validation/carrinho/carrinhoValidation.js'

export default async function removerCarrinhoService(idCarrinho) {
    validarEntradaParaBuscaPorCarrinho(idCarrinho);
    
    const registro = await buscarCarrinhoPorId(idCarrinho);
    validarBuscaCarrinho(registro);

    const resposta = await removerCarrinho(idCarrinho);
    verificarSeCarrinhoFoiRemovido(resposta);

    return resposta;
}
