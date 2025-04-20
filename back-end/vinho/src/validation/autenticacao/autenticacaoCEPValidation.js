
export function validarCEPNulo(cep) {
    if (!cep)
        throw new Error("O CEP não pode ficar nulo ou vazio");
}

export function validarCPEDeTamanhoInvalido(cep) {
     if (cep.length < 8 || cep.length > 9) 
            throw new Error("Não foi possível validar O CEP, pois ele não está com os valores necessários");
}

export function validarCEPInvalido(cep) {
    if(cep.length != 8 || isNaN(cep)) 
        throw new Error("Não foi possível validar O CEP, pois ele contém valores inválidos");
}