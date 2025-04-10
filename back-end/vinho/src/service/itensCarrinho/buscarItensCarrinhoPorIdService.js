import {buscarItensCarrinhoPorId} from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function buscarItensCarrinhoPorIdService(idItensCarrinho) {
    validarEntradaParaBuscaPorItensCarrinho(idItensCarrinho);

    const resposta = await buscarItensCarrinhoPorId(idItensCarrinho);
    validarBuscaItensCarrinho(resposta);

    return resposta;
}