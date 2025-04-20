
/**
 * Função que trata de formatar a mensagem de erro quando uma "Duplicate entry" é lançada
 * pelo banco de dados
 * 
 * @returns Retorna uma mensagem de erro sobre "Duplicate entry" formatada
 */
export function mensagemCampoUnicoDuplicado(erro) {
    return "Não é possível realizar a operação, esse elemento já existe"; 
}

export function mensagemCampoReferencialInexistente(erro) {
    return erro;
}
