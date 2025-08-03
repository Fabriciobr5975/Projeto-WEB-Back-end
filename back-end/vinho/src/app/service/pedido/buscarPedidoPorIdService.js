import { buscarPedidoPorId } from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'
import { agruparPedidos } from '../../utils/pedidosUtils/pedidosUtils.js';
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarPedidoPorIdService(idPedido) {
    validarEntradaParaBuscaPorPedido(idPedido);
    
    const registro = await buscarPedidoPorId(idPedido);
    validarBuscaPedido(registro);

    const registroComImage = tranformarImagemBase64(registro);
    
    return agruparPedidos(registroComImage);
}