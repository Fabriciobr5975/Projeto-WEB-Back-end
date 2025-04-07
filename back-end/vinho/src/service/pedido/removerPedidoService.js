import { removerPedido } from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, verificarSePedidoFoiRemovido } from '../../validation/pedido/pedidoValidation.js'

export default async function removerPedidoService(idPedido) {
    validarEntradaParaBuscaPorPedido(idPedido);
    
    const resposta = await removerPedido(idPedido);
    verificarSePedidoFoiRemovido(resposta);

    return resposta;
}