import { buscarPedidoPorVinho} from '../../repository/pedido/pedidoRepository.js'
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js'
import agruparPedidos from './contruirVetorBuscaPedido.js';

export default async function buscarPedidoPorVinhoService(idVinho) {
    validarEntradaParaBuscaPorPedido(idVinho);

    const registro = await buscarPedidoPorVinho(idVinho);
    validarBuscaPedido(registro);

    const registroComImage = registro.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

     return agruparPedidos(registroComImage);
}