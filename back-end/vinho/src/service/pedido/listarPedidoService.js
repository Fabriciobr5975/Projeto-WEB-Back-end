import { listarPedido } from '../../repository/pedido/pedidoRepository.js'
import { validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'
import agruparPedidos from './contruirVetorBuscaPedido.js';

export default async function listarPedidoService() {
    const registros = await listarPedido();
    validarBuscaPedido(registros);

    const registroComImage = registros.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return agruparPedidos(registroComImage);
}