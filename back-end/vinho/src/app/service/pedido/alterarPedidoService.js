import { buscarPedidoPorId, alterarPedido } from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarCamposObrigatoriosPedidoParaAlteracao, validarBuscaPedido, verificarSePedidoFoiAlterado} from '../../validation/pedido/pedidoValidation.js'

export default async function alterarPedidoService(idPedido, pedido) {
    validarEntradaParaBuscaPorPedido(idPedido);
    validarCamposObrigatoriosPedidoParaAlteracao(pedido);

    const registro = await buscarPedidoPorId(idPedido);
    validarBuscaPedido(registro);

    const resposta = await alterarPedido(idPedido, pedido);
    verificarSePedidoFoiAlterado(resposta);

    return resposta;
}