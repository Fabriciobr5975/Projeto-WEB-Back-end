import { buscarCarrinhoPorVinho } from '../../repository/carrinho/carrinhoRepository.js'
import { validarBuscaCarrinho, validarEntradaParaBuscaPorCarrinho } from '../../validation/carrinho/carrinhoValidation.js'

export default async function buscarCarrinhoPorVinhoService(idVinho) {
    validarEntradaParaBuscaPorCarrinho(idVinho);

    const registro = await buscarCarrinhoPorVinho(idVinho);
    validarBuscaCarrinho(registro);

    return registro;
}