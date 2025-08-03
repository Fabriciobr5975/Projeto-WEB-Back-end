import { listarPedido } from '../../repository/pedido/pedidoRepository.js'
import { validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'
import { agruparPedidos } from '../../utils/pedidosUtils/pedidosUtils.js';
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function listarPedidoService() {
    const registros = await listarPedido();
    validarBuscaPedido(registros);

    const registroComImage = tranformarImagemBase64(registros);

    return agruparPedidos(registroComImage);
}