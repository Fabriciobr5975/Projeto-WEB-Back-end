import { buscarItemPedidoPorPedido } from '../../repository/pedido/itensPedidoRepository.js'
import { validarEntradaParaBuscaPorItensPedido, validarBuscaItensPedido } from '../../validation/pedido/itemPedidoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarItensPedidoPorPedidoService(idItensPedido) {
    validarEntradaParaBuscaPorItensPedido(idItensPedido);

    const registro = await buscarItemPedidoPorPedido(idItensPedido);
    validarBuscaItensPedido(registro);

    return tranformarImagemBase64(registro);
}