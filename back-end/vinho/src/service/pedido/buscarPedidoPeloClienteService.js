import { buscarPedidoPeloCliente} from '../../repository/pedido/pedidoRepository.js';
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js';
import agruparPedidos from './contruirVetorBuscaPedido.js';

export default async function buscarPedidoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorPedido(cpfCliente);

    const registros = await buscarPedidoPeloCliente(cpfCliente);
    validarBuscaPedido(registros);

    return agruparPedidos(registros);
}

