import { buscarPedidoPorId, alterarPedido } from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarCamposObrigatoriosPedido, validarBuscaPedido, verificarSePedidoFoiAlterado} from '../../validation/pedido/pedidoValidation.js'

export default async function alterarPedidoService(idPedido, pedido) {
    validarEntradaParaBuscaPorPedido(idPedido);
    validarCamposObrigatoriosPedido(pedido);

    const registro = await buscarPedidoPorId(idPedido);
    buscarPedidoPorId(registro);

    const resposta = await alterarPedido(idPedido, pedido);
    verificarSePedidoFoiAlterado(resposta);

    return resposta;
}