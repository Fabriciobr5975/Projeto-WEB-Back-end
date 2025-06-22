import { buscarCarrinhoPeloCliente } from '../../repository/carrinho/carrinhoRepository.js'
import { validarBuscaCarrinho, validarEntradaParaBuscaPorCarrinho } from '../../validation/carrinho/carrinhoValidation.js'

export default async function buscarCarrinhoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorCarrinho(cpfCliente);

    const registro = await buscarCarrinhoPeloCliente(cpfCliente);
    validarBuscaCarrinho(registro);

    return registro;
}