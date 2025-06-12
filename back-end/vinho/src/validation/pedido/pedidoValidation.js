
export function validarEntradaParaBuscaPorPedido(entrada) {
    if (!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosPedido(pedido) {
    if (!pedido.cliente)
        throw new Error("A identificação do cliente é obrigatória");

    if (!pedido.endereco_entrega)
        throw new Error("O endereço da entrega é obrigatório");

    if (!pedido.valor_total)
        throw new Error("O valor total do pedido é obrigatório");

    if (!pedido.status_pedido)
        throw new Error("O status do pedido é obrigatório");

    if (!pedido.data_pedido)
        throw new Error("A data do pedido é obrigatório");
}

export function validarCamposObrigatoriosPedidoParaAlteracao(pedido) {
    if (!pedido.status_pedido)
        throw new Error("O status do pedido é obrigatório");

    if (!pedido.data_pedido)
        throw new Error("A data do pedido é obrigatório");
}

export function validarBuscaPedido(registros) {
    if (registros?.length === 0 || !registros)
        throw new Error("Não foram encontrado registros para o pedido");
}

export function verificarSePedidoFoiInserido(insertId) {
    if (insertId === 0)
        throw new Error("O pedido não foi inserido");
}

export function verificarSePedidoFoiAlterado(linhasAfetadas) {
    if (linhasAfetadas === 0)
        throw new Error("O pedido não foi alterado");
}

export function verificarSePedidoFoiRemovido(linhasAfetadas) {
    if (linhasAfetadas === 0)
        throw new Error("O pedido não foi removido");
}
