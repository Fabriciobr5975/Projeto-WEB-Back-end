import { buscarUltimoPedidoCliente, buscarPedidosPorFiltroData } from '../../repository/pedido/pedidoRepository.js';
import { validarEntradaParaBuscaPorPedido, validarBuscaPedido } from '../../validation/pedido/pedidoValidation.js';
import { agruparPedidos } from '../../utils/pedidosUtils/pedidosUtils.js';
import tranformarImagemBase64 from '../../utils/tranformarImagemBase64.js';

export default async function buscarPedidoPorFiltroService(cpfCliente, filtro) {
    validarEntradaParaBuscaPorPedido(cpfCliente);

    let registros = null;

    if (filtro === "ultimos-12-meses") {
        const { dataInicial, dataFinal } = calculoDataFiltro(12);
        registros = await buscarPedidosPorFiltroData(cpfCliente, dataInicial, dataFinal);

    } else if (filtro === "ultimo-mes") {
        const { dataInicial, dataFinal } = calculoDataFiltro(1);
        registros = await buscarPedidosPorFiltroData(cpfCliente, dataInicial, dataFinal);

    } else if (filtro === "ultimos-3-meses") {
        const { dataInicial, dataFinal } = calculoDataFiltro(3);
        registros = await buscarPedidosPorFiltroData(cpfCliente, dataInicial, dataFinal);

    } else if (filtro === "ultima-compra") {
        registros = await buscarUltimoPedidoCliente(cpfCliente);
    
    } else {
        throw new Error("Nenhum filtro encontrado");
    }

    validarBuscaPedido(registros);

    const registroComImage = tranformarImagemBase64(registros);

    return agruparPedidos(registroComImage);
}

/**
 * Função para calcular as datas de início e fim para o filtro de pedidos
 * 
 * @param {Number} meses - Recebe o número de meses que será usado para calcular a diferença de datas 
 * 
 * @returns Retorna um objeto JSON contendo as datas inicial e final
 */
const calculoDataFiltro = meses => {
    const dataAtual = new Date();
    const dataInicio = new Date();
    dataInicio.setMonth(dataInicio.getMonth() - meses);

    return {
        dataInicial: dataInicio,
        dataFinal: dataAtual
    };
}