import { buscarItensCarrinhoPorVinho } from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarItensCarrinhoPorVinhoService(idVinho) {
    validarEntradaParaBuscaPorItensCarrinho(idVinho);

    const registro = await buscarItensCarrinhoPorVinho(idVinho);
    validarBuscaItensCarrinho(registro);

    return tranformarImagemBase64(registro);
}