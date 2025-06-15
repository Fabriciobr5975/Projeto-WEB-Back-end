import { buscarPedidoPeloCliente} from '../../repository/pedido/pedidoRepository.js';
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js';
import agruparPedidos from './contruirVetorBuscaPedido.js';
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarPedidoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorPedido(cpfCliente);

    const registros = await buscarPedidoPeloCliente(cpfCliente);
    validarBuscaPedido(registros);

    const registroComImage = tranformarImagemBase64(registros);

    return agruparPedidos(registroComImage);
}

