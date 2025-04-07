import { inserirPedido } from '../../repository/pedido/pedidoRepository.js'
import { validarCamposObrigatoriosPedido, verificarSePedidoFoiInserido } from '../../validation/pedido/pedidoValidation.js'

export default async function inserirPedidoService(pedido) {
    validarCamposObrigatoriosPedido(pedido);

    const resposta = await inserirPedido(pedido);
    verificarSePedidoFoiInserido(resposta);

    return resposta;
}