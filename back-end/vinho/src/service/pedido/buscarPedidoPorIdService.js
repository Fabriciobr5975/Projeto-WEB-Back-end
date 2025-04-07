import { buscarPedidoPorId } from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'

export default async function buscarPedidoPorIdService(idPedido) {
    validarEntradaParaBuscaPorPedido(idPedido);
    
    const registro = await buscarPedidoPorId(idPedido);
    validarBuscaPedido(registro);

    return resposta;
}