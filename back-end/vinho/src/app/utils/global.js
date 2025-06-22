import { mensagemCampoUnicoDuplicado, mensagemCampoReferencialInexistente, mensagemEstoqueInsuficiente } from './mensagemPersonalizadasExcecoes.js'

/**
 * 
 */
global.criarLogDateTimeSistema = () => {
    return new Date().toLocaleDateString("pt-br", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }) + " " + new Date().toLocaleTimeString("pt-br");
}

/**
 * Função global que tem como objetivo criar as mensagens de erros que vem do banco  
 * de dados de forma personalizadas
 * 
 * @param {String} mensagem 
 * 
 * @returns Retorna para o sistema a mensagem de erro que foi tratada e está formatada
 */
global.criarErro = function criarErro(mensagem) {
    return tratarErro(mensagem);
}

/**
 * Função para pegar as mensagem de erro que o banco de dados gera. Algumas exceções
 * são verificadas antes, porém, algumas só são lançadas pelo bancos de dados, e são
 * essas que seram tratadas da melhor forma
 * 
 * @param {String} erro - Recebe o erro que foi gerado
 *  
 * @returns Retorna a mensagem de erro formatada
 */
const tratarErro = erro => {
    if (erro.includes("Duplicate entry")) {
        return mensagemCampoUnicoDuplicado(erro);

    } else if (erro.includes("teste")) {
        return mensagemCampoReferencialInexistente(erro);

    } else if (erro.includes("Ocorreu um erro ao atualizar a quantidade do estoque. Estoque insuficiente")) {
        return mensagemEstoqueInsuficiente(erro);

    } else if (erro.includes("Cannot delete or update a parent row")) {
        return "O banco de dados impediu essa operação devio as retrições internas!";
    }

    return "Não foi possível identificar o erro " + erro;
}
