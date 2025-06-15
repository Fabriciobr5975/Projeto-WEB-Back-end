import { buscarPedidoPorVinho} from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'
import agruparPedidos from './contruirVetorBuscaPedido.js';
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarPedidoPorVinhoService(idVinho) {
    validarEntradaParaBuscaPorPedido(idVinho);

    const registro = await buscarPedidoPorVinho(idVinho);
    validarBuscaPedido(registro);

    const registroComImage = tranformarImagemBase64(registro);

     return agruparPedidos(registroComImage);
}