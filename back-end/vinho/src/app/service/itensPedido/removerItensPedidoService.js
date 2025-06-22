import { buscarItemPedidoPorId, removerItemPedido } from '../../repository/pedido/itensPedidoRepository.js'
import { validarEntradaParaBuscaPorItensPedido, validarBuscaItensPedido, verificarSeItensPedidoFoiRemovido } from '../../validation/pedido/itemPedidoValidation.js'

export default async function removerItensPedidoService(idItensCarrinho) {
    validarEntradaParaBuscaPorItensPedido(idItensCarrinho);

    const registro = await buscarItemPedidoPorId(idItensCarrinho);
    validarBuscaItensPedido(registro);

    const resposta = await removerItemPedido(idItensCarrinho);
    verificarSeItensPedidoFoiRemovido(resposta);

    return resposta;
}