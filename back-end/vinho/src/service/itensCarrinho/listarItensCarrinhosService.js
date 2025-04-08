import { listarItensCarrinhos } from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function listarItensCarrinhoService() {
    const registros = await listarItensCarrinhos();
    validarBuscaItensCarrinho(registros);

    return resposta;
}