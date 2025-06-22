
const tamanhoMinimoCPF = 11;
const tamanhoMaximoCPF = 14;

export function validarCPFNulo(cpf) {
    if (!cpf)
        throw new Error("O CPF não pode ficar nulo ou vazio")
}

export function validarCPFDeTamanhoInvalido(cpf) {
    if (cpf.length < tamanhoMinimoCPF || cpf.length > tamanhoMaximoCPF)
        throw new Error("O CPF passado não pode ser analisado, pois ele não tem os digitos necessários")
}

export function validarCPFInvalido(cpf) {
    const verificadorDeSequencias = /(\d)\1{10}/;
    
    if (cpf.length != tamanhoMinimoCPF || verificadorDeSequencias.test(cpf))
        throw new Error("Esse CPF não pode ser analisado, pois não é um CPF válido");
}