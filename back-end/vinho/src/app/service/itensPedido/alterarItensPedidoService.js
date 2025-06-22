import { buscarItemPedidoPorId, alterarItemPedido } from '../../repository/pedido/itensPedidoRepository.js'
import { validarEntradaParaBuscaPorItensPedido, validarCamposObrigatoriosItensPedido, validarBuscaItensPedido, verificarSeItensPedidoFoiAlterado } from '../../validation/pedido/itemPedidoValidation.js'

export default async function alterarItensPedidoService(idItensPedido, itens_pedido) {
    validarEntradaParaBuscaPorItensPedido(idItensPedido);
    validarCamposObrigatoriosItensPedido(itens_pedido);

    const registro = buscarItemPedidoPorId(idItensPedido)
    validarBuscaItensPedido(registro);

    const resposta = await alterarItemPedido(idItensPedido, itens_pedido);
    verificarSeItensPedidoFoiAlterado(resposta);

    return resposta;
}