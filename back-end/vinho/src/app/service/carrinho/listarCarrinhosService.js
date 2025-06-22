import { listarCarrinhos } from '../../repository/carrinho/carrinhoRepository.js'
import { validarBuscaCarrinho } from '../../validation/carrinho/carrinhoValidation.js'

export default async function listarCarrinhoService() {
    const registros = await listarCarrinhos();
    validarBuscaCarrinho(registros);

    return registros;
}
