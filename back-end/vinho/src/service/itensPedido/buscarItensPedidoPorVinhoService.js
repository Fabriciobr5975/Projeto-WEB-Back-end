import { buscarItensPedidoPorVinho } from '../../repository/pedido/itensPedidoRepository.js'
import { validarEntradaParaBuscaPorItensPedido, validarBuscaItensPedido } from '../../validation/pedido/itemPedidoValidation.js'

export default async function buscarItensPedidoPorVinhoService(idVinho) {
    validarEntradaParaBuscaPorItensPedido(idVinho);

    const registro = await buscarItensPedidoPorVinho(idVinho);
    validarBuscaItensPedido(registro);

    const registroComImage = registro.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}