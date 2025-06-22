import { listarItensCarrinhos } from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function listarItensCarrinhoService() {
    const registros = await listarItensCarrinhos();
    validarBuscaItensCarrinho(registros);

    return tranformarImagemBase64(registros);
}