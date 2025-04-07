import { alterarPedido } from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarCamposObrigatoriosPedido, verificarSePedidoFoiAlterado} from '../../validation/pedido/pedidoValidation.js'

export default async function alterarPedidoService(idPedido, pedido) {
    validarEntradaParaBuscaPorPedido(idPedido);
    validarCamposObrigatoriosPedido(pedido);

    const resposta = await alterarPedido(idPedido, pedido);
    verificarSePedidoFoiAlterado(resposta);

    return resposta;
}