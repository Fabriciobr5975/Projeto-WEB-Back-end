import { buscarItensPedidoPeloCliente } from '../../repository/pedido/itensPedidoRepository.js'
import { validarEntradaParaBuscaPorItensPedido, validarBuscaItensPedido } from '../../validation/pedido/itemPedidoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarItensPedidoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorItensPedido(cpfCliente);

    const registro = await buscarItensPedidoPeloCliente(cpfCliente);
    validarBuscaItensPedido(registro);
    
    return tranformarImagemBase64(registro);
}