import { buscarPedidoPorVinho} from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'

export default async function buscarPedidoPorVinhoService(idVinho) {
    validarEntradaParaBuscaPorPedido(idVinho);

    const registro = await buscarPedidoPorVinho(idVinho);
    validarBuscaPedido(registro);

    return resposta;
}