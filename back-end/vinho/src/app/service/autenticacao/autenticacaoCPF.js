import { validarCPFNulo, validarCPFDeTamanhoInvalido, validarCPFInvalido } from '../../validation/autenticacao/autenticacaoCPFValidation.js'

const tamanhoCPFBase = 11;
const pesoPrimeiroDigitoValidador = 10;
const pesoSegundoDigitoValidador = 11;

/**
 * Função para limpar um CPF, antes que ele seja validado, ou que ele seja salvo no banco de dados.
 * 
 * @param {String} cpf - Recebe o CPF que será limpo 
 * 
 * @returns {String} Retorna o CPF passado limpo, sem os caracteres especiais, como `.` e `-`
 */
export function limparCPF(cpf) {
    validarCPFNulo(cpf);

    return cpf.replace(/[.\-\/]/g, "");
}

/**
 * Valida um CPF conferindo seus dois dígitos verificadores.
 * 
 * O cálculo consiste em:
 * 
 * - Para o 1º dígito: multiplica-se cada um dos 9 primeiros dígitos por pesos decrescentes de 10 a 2, 
 *   soma-se o resultado e calcula-se o resto da divisão por 11. Se o resto for menor que 2, o dígito é 0; 
 *   caso contrário, é 11 menos o resto.
 * 
 * - Para o 2º dígito: repete-se o processo incluindo o 1º dígito, com pesos de 11 a 2.
 *   O CPF é válido se os dígitos calculados coincidirem com os informados.
 * 
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} `true` se o CPF for válido, `false` caso contrário.
 */
export function validarCPF(cpf) {
    validarCPFNulo(cpf);
    validarCPFDeTamanhoInvalido(cpf);

    let cpfLimpo = limparCPF(cpf);
    validarCPFInvalido(cpfLimpo);
    const cpfSemDigitosValidadores = cpfLimpo.substring(0, 9);


    const primeiroDigitoValidador = calcularDigitoValidadorCPF(cpfSemDigitosValidadores, pesoPrimeiroDigitoValidador);
    const segundoDigitoValidador = calcularDigitoValidadorCPF(cpfSemDigitosValidadores + primeiroDigitoValidador, pesoSegundoDigitoValidador);

    return (cpfLimpo === (cpfSemDigitosValidadores + primeiroDigitoValidador + segundoDigitoValidador));
}

/**
 * Função que calcula os digitos validadores do CPF
 * 
 * @param {String} cpf - Recebe o CPF
 * @param {Number} peso - Recebe o Peso, referente a qual dígito validador será calculado
 *  
 * @returns {Number} Retorna um número, que foi calculado e será atribuido aos dígitos que validam
 * o `CPF`
 */
function calcularDigitoValidadorCPF(cpf, peso) {
    let soma = 0;

    for (let i = 0; i < cpf.length; i++) {
        soma += Number((cpf.charAt(i))) * peso--;
    }

    let resto = soma % tamanhoCPFBase;
    return (resto < 2) ? 0 : tamanhoCPFBase - resto;
}

/**
 * Função que verifica se o CPF é válido
 * 
 * @param {*} cpf - Recebe o CPF
 */
export function verificarCPFValido(cpf) {
    if (!(validarCPF(cpf)))
        throw new Error(`O CPF ${cpf} não é válido`);
}