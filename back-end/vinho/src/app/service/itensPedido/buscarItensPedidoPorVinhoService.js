import { buscarItensPedidoPorVinho } from '../../repository/pedido/itensPedidoRepository.js'
import { validarEntradaParaBuscaPorItensPedido, validarBuscaItensPedido } from '../../validation/pedido/itemPedidoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarItensPedidoPorVinhoService(idVinho) {
    validarEntradaParaBuscaPorItensPedido(idVinho);

    const registro = await buscarItensPedidoPorVinho(idVinho);
    validarBuscaItensPedido(registro);

    return tranformarImagemBase64(registro);
}