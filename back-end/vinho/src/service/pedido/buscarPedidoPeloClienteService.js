import { buscarPedidoPeloCliente} from '../../repository/pedido/pedidoRepository.js';
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js';
import agruparPedidos from './contruirVetorBuscaPedido.js';

export default async function buscarPedidoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorPedido(cpfCliente);

    const registros = await buscarPedidoPeloCliente(cpfCliente);
    validarBuscaPedido(registros);

    const registroComImage = registros.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return agruparPedidos(registroComImage);
}

