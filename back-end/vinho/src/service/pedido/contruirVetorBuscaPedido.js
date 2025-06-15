
export default function agruparPedidos(pedidos) {
    return pedidos.reduce((vetor, pedido) => {
        if (!vetor[pedido.id_pedido]) {
            vetor[pedido.id_pedido] = {
                id_pedido: pedido.id_pedido,
                nome_completo: pedido.nome_completo,
                cpf: pedido.cpf,
                celular: pedido.celular,
                endereco: pedido.endereco,
                numero: pedido.numero,
                complemento: pedido.complemento,
                bairro: pedido.bairro,
                uf: pedido.uf,
                localidade: pedido.localidade,
                cep: pedido.cep,
                preco_total_pedido: pedido.preco_total_pedido,
                data_pedido: pedido.data_pedido,
                status_pedido: pedido.status_pedido,
                itens: []
            };
        }

        vetor[pedido.id_pedido].itens.push({
            id_vinho: pedido.id_vinho,
            imagem_vinho: pedido.imagem_vinho,
            vinho: pedido.vinho,
            vinicola_vinho: pedido.vinicola_vinho,
            pais_vinho: pedido.pais_vinho,
            classificao_vinho: pedido.classificao_vinho,
            preco_vinho: pedido.preco_vinho,
            quantidade: pedido.quantidade,
            descricao: pedido.descricao
        });

        return vetor;
    }, {});
};
