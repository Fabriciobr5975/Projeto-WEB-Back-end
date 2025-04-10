import { buscarCarrinhoPorId } from '../../repository/carrinho/carrinhoRepository.js'
import { validarBuscaCarrinho, validarEntradaParaBuscaPorCarrinho } from '../../validation/carrinho/carrinhoValidation.js'

export default async function buscarCarrinhoPorIdService(idCarrinho) {
    validarEntradaParaBuscaPorCarrinho(idCarrinho);

    const registro = await buscarCarrinhoPorId(idCarrinho);
    validarBuscaCarrinho(registro);

    return registro;
}
