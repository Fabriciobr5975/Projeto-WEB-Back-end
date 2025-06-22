
/**
 * Função que trata de formatar a mensagem de erro quando uma "Duplicate entry" é lançada
 * pelo banco de dados
 * 
 * @returns Retorna uma mensagem de erro sobre "Duplicate entry" formatada
 */
export function mensagemCampoUnicoDuplicado() {
    return "Não é possível realizar a operação, esse elemento já existe"; 
}

export function mensagemCampoReferencialInexistente(erro) {
    return erro;
}

/**
 * Função para tratar as mensagens de estoque Insuficiente  
 * 
 * @returns Retorna uma mensagem personalizada para o sistema, quando um vinho está sem estoque e um cliente tenta 
 * adicionar ao seu carrinho
 */
export function mensagemEstoqueInsuficiente() {
    return "Não foi possível adicionar o vinho ao carrinho. Motivo: Estoque insuficiente";
}
