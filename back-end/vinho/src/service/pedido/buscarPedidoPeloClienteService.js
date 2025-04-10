import { listarPedidoPeloCliente} from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'

export default async function buscarPedidoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorPedido(cpfCliente);

    const registro = await listarPedidoPeloCliente(cpfCliente);
    validarBuscaPedido(registro);

    return resposta;
}