import { buscarPedidoPorId, removerPedido } from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido, verificarSePedidoFoiRemovido } from '../../validation/pedido/pedidoValidation.js'

export default async function removerPedidoService(idPedido) {
    validarEntradaParaBuscaPorPedido(idPedido);
    
    const registro = await buscarPedidoPorId(idPedido);
    validarBuscaPedido(registro);

    const resposta = await removerPedido(idPedido);
    verificarSePedidoFoiRemovido(resposta);

    return resposta;
}