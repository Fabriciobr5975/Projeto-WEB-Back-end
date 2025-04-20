import { validarCPFNulo, validarCPFDeTamanhoInvalido, validarCPFInvalido } from '../../validation/autenticacaoCPF/autenticacaoCPFValidation.js'

/**
 * Função para limpar um CPF, antes que ele seja validado, ou que ele seja salvo no banco de dados.
 * 
 * @param {String} cpf - Recebe o CPF que será limpo 
 * 
 * @returns {String} Retorna o CPF passado limpo, sem os caracteres especiais, como `.` e `-`
 */
export function limparCPF(cpf) {
    validarCPFNulo(cpf);

    return cpf.replaceAll(/[./-]/g, "");
}

/**
 * Função para validar um CPF através dos seus dois dígitos verificadores. Esses dígitos são os últimos dois números do CPF,
 * separados por um traço, e são usados para verificar a autenticidade do CPF. A lógica para validação segue os passos abaixo:
 *
 * - A partir dos 9 primeiros dígitos do CPF, multiplicamos cada um por um número sequencial crescente a partir de 1.
 *   Exemplo: (1 * 1) + (2 * 2) + (3 * 3) + (4 * 4) + (5 * 5) + (6 * 6) + (7 * 7) + (8 * 8) + (9 * 9) = 285
 * ---
 * - Dividimos a soma resultante por 11 e verificamos o resto da divisão. Se o resto for menor que 2, o primeiro dígito verificador será 0.
 *   Caso contrário, subtraímos o resto de 11 para obter o primeiro dígito verificador.
 * ---
 * - Para calcular o segundo dígito verificador, repetimos o processo anterior, mas agora incluindo o primeiro dígito verificador calculado.
 *   Os multiplicadores começam em 0 e aumentam sequencialmente:
 *   Exemplo: (0 * 1) + (1 * 2) + (2 * 3) + (3 * 4) + (4 * 5) + (5 * 6) + (6 * 7) + (7 * 8) + (8 * 9) + (9 * 0) = 240
 * ---
 * - Dividimos essa nova soma por 11 e aplicamos a mesma regra do primeiro dígito verificador para obter o segundo dígito.
 * ---
 * - O CPF final obtido é comparado com o CPF fornecido. Se forem iguais, o CPF é válido; caso contrário, é inválido.
 * ---
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} Retorna `true` se o CPF for válido (contém os dígitos verificadores corretos), ou `false` caso contrário.
 */
export function validarCPF(cpf) {
    validarCPFNulo(cpf);
    validarCPFDeTamanhoInvalido(cpf);

    let cpfLimpo = limparCPF(cpf);
    validarCPFInvalido(cpfLimpo);
    
    let digito1 = calcularDigitoValidador(cpfLimpo.substring(0, 9), 10);
    let digito2 = calcularDigitoValidador(cpfLimpo.substring(0, 9) + digito1, 11);

    return (cpfLimpo === (cpfLimpo.substring(0, 9) + digito1 + digito2));
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
function calcularDigitoValidador(cpf, peso) {
    let soma = 0;

    for (let i = 0; i < cpf.length; i++) {
        soma += Number((cpf.charAt(i))) * peso--;
    }

    let resto = soma % 11;
    return (resto < 2) ? 0 : 11 - resto;
}