import {buscarItensCarrinhoPeloCliente} from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function buscarItensCarrinhoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorItensCarrinho(cpfCliente);

    const resposta = await buscarItensCarrinhoPeloCliente(cpfCliente);
    validarBuscaItensCarrinho(resposta);

    return resposta;
}