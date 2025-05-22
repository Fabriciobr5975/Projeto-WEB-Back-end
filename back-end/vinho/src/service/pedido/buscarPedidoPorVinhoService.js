import { buscarPedidoPorVinho} from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'
import agruparPedidos from './contruirVetorBuscaPedido.js';

export default async function buscarPedidoPorVinhoService(idVinho) {
    validarEntradaParaBuscaPorPedido(idVinho);

    const registro = await buscarPedidoPorVinho(idVinho);
    validarBuscaPedido(registro);

     return agruparPedidos(registro);
}