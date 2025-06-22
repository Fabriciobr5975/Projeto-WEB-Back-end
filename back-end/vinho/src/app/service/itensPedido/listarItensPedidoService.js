import { listarItensPedido } from '../../repository/pedido/itensPedidoRepository.js'
import { validarBuscaItensPedido } from '../../validation/pedido/itemPedidoValidation.js'
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function listarItensPedidoService() {
    const registros = await listarItensPedido();
    validarBuscaItensPedido(registros);

    return tranformarImagemBase64(registros);
}