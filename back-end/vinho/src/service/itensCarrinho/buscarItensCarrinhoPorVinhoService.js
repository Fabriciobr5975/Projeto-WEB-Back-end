import {buscarItensCarrinhoPorVinho} from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function buscarItensCarrinhoPorVinhoService(idVinho) {
    validarEntradaParaBuscaPorItensCarrinho(idVinho);

    const resposta = await buscarItensCarrinhoPorVinho(idVinho);
    validarBuscaItensCarrinho(resposta);

    return resposta;
}