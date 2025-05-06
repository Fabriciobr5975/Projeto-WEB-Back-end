import { listarPedido } from '../../repository/pedido/pedidoRepository.js'
import { validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'
import agruparPedidos from './contruirVetorBuscaPedido.js';

export default async function listarPedidoService() {
    const registros = await listarPedido();
    validarBuscaPedido(registros);

    return agruparPedidos(registros);
}