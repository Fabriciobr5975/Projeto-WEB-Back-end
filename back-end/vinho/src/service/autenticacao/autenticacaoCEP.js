import { validarCEPNulo, validarCPEDeTamanhoInvalido, validarCEPInvalido } from '../../validation/autenticacao/autenticacaoCEPValidation.js';

/**
 * Função para limpar o CEP, sendo útil em validações de valores e para buscar pelo CEP
 * 
 * @param {String} cep - Recebe o CEP que será limpo
 *  
 * @returns {String} Retorna o CEP limpo, sem os caracteres especiais
 */
export function limparCEP(cep) {
    validarCEPNulo(cep);

    return cep.replaceAll(/[-]/g, "");
}

/**
 * Função para validar se um CEP pode ser passado para a API que busca um endereço pelo CEP
 * 
 * @param {String} cep - Recebe o CEP que será validado
 */
export function validarCEP(cep) {
    validarCEPNulo(cep);
    validarCPEDeTamanhoInvalido(cep);

    let cepLimpo = limparCEP(cep);
    validarCEPInvalido(cepLimpo);
}

/**
 * Função para verificar se o CEP buscado retornou um endereço. Se ele não tiver retornado
 * um endereço, lança uma exceção
 * 
 * @param {JSON} endereco - Recebe o objeto do endereço 
 */
export function validarSeCepFoiEncontrado(endereco, cep) {
    if (Object.keys(endereco).length === 1)
        throw new Error(`O CEP ${cep} não foi encontrado, verifique se o CEP passado está correto`);
}