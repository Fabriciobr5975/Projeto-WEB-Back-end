import {buscarItensCarrinhoPeloCliente} from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarItensCarrinhoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorItensCarrinho(cpfCliente);

    const registro = await buscarItensCarrinhoPeloCliente(cpfCliente);
    validarBuscaItensCarrinho(registro);

    return tranformarImagemBase64(registro);
}