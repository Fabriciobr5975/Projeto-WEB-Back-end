import { mensagemCampoUnicoDuplicado, mensagemCampoReferencialInexistente } from './mensagemPersonalizadasExcecoes.js'

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
    }

    return "Não foi possível identificar o erro " + erro;
}
