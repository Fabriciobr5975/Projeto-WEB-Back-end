import { buscarPedidoPeloCliente} from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'

export default async function buscarPedidoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorPedido(cpfCliente);

    const registro = await buscarPedidoPeloCliente(cpfCliente);
    validarBuscaPedido(registro);

    return resposta;
}