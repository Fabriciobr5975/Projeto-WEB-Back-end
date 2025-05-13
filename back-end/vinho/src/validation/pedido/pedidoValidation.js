
export function validarEntradaParaBuscaPorPedido(entrada) {
    if (!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosPedido(pedido) {
    if (!pedido.carrinho)
        throw new Error("A identificação dos itens do carrinho vinho é obrigátoria é deve ser única");

    if (!pedido.endereco_entrega)
        throw new Error("O endereço da entrega é obrigatório");

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

export function verificarSePedidosSãoIguais(registro, pedido) {
    registro.forEach(itens => {
        if (itens.carrinho === pedido.carrinho) {
            throw new Error("Esse pedido já foi inserido");
        }
    });
}