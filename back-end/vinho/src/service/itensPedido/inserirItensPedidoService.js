import { inserirItemPedido } from '../../repository/pedido/itensPedidoRepository.js'
import { validarCamposObrigatoriosItensPedido, verificarSeItensPedidoFoiInserido } from '../../validation/pedido/itemPedidoValidation.js'

export default async function inserirItensPedidoService(itens_pedido) {
    validarCamposObrigatoriosItensPedido(itens_pedido);

    const resposta = await inserirItemPedido(itens_pedido);
    verificarSeItensPedidoFoiInserido(resposta);

    return resposta;
}