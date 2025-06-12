import { buscarItensPedidoPeloCliente } from '../../repository/pedido/itensPedidoRepository.js'
import { validarEntradaParaBuscaPorItensPedido, validarBuscaItensPedido } from '../../validation/pedido/itemPedidoValidation.js'

export default async function buscarItensPedidoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorItensPedido(cpfCliente);

    const registro = await buscarItensPedidoPeloCliente(cpfCliente);
    validarBuscaItensPedido(registro);

    const registroComImage = registro.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}