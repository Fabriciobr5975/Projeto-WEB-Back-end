import { listarItensPedido } from '../../repository/pedido/itensPedidoRepository.js'
import { validarBuscaItensPedido } from '../../validation/pedido/itemPedidoValidation.js'

export default async function listarItensPedidoService() {
    const registros = await listarItensPedido();
    validarBuscaItensPedido(registros);

    const registroComImage = registros.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}