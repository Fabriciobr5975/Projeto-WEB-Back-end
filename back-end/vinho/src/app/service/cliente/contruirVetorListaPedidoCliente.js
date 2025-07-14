
/**
 * Função que pega o pedido e os itens do pedido, junta tudo isso em um único objeto e retorna para o sistema consumir os dados. Cada 
 * Pedido tem informações gerais, como o cliente, o endereço, data do pedido, valor total entre outros. E têm também, os produtos que
 * foram inseridos, com o nome do vinho, a imagem, a quantidade e preço unitário entre outros. 
 * 
 * @param {JSON} pedidos - Recebe o pedido, juntamente com os itens do pedido
 * 
 * @returns {JSON} Retorna um Objeto com as principais informações do pedido, com um vetor com cada item do pedido
 */
export default function agruparPedidos(pedidos) {
    return pedidos.reduce((vetor, pedido) => {
        if (!vetor[pedido.id_cliente]) {
            vetor[pedido.id_cliente] = {
                id_cliente: pedido.id_cliente,
                nome_completo: pedido.nome_completo,
                email: pedido.email,
                celular: pedido.celular,
                quantidade_pedidos: pedido.quantidade_pedidos,
                preco_total_pedido: pedido.preco_total_pedido,
                ticket_medio: pedido.ticket_medio,
            };
        }
        return vetor;
    }, {});
};
