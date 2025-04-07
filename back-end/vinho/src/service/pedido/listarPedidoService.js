import { listarPedido } from '../../repository/pedido/pedidoRepository.js'
import { validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'

export default async function listarPedidoService() {
    const registros = await listarPedido();
    validarBuscaPedido(registros);

    return registros;
}