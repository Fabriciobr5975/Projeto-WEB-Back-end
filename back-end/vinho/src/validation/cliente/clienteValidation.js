import bcrypt from 'bcryptjs';

export function validarEntradaParaBuscaPorCliente(entrada) {
    if (!entrada)
        throw new Error("O campo para busca deve estar preenchido");
}

export function validarCamposObrigatoriosCliente(cliente) {
    if (!cliente.nome)
        throw new Error("O primeiro nome é obrigatório");

    if (!cliente.sobrenome)
        throw new Error("O sobrenome é obrigatório");

    if (!cliente.cpf)
        throw new Error("O cpf é obrigatório e deve ser único");

    if (!cliente.email)
        throw new Error("O email é obrigatório");

    if (!cliente.senha)
        throw new Error("A senha é obrigatório");
}

export function validarCamposObrigatoriosAlteracaoCliente(cliente) {
    if (!cliente.nome)
        throw new Error("O primeiro nome é obrigatório");

    if (!cliente.sobrenome)
        throw new Error("O sobrenome é obrigatório");


    if (!cliente.email)
        throw new Error("O email é obrigatório");
}

export function validarBuscaCliente(registros) {
    if (registros?.length === 0 || !registros)
        throw new Error("Não foram encontrado registros para o cliente");
}


/**
 * * Função para autenticar um cliente comparando a senha informada com o hash armazenado.
 * 
 * @param {String} passwordInput - Recebe a senha informada pelo cliente. 
 * @param {String} passwordStoredHash - Recebe o hash da senha armazenada no banco de dados.
 * 
 * @returns Retorna um erro caso a senha informada não corresponda ao hash armazenado.
 */
export async function validarSenhaCliente(passwordInput, passwordStoredHash) {
    return await bcrypt.compare(passwordInput, passwordStoredHash)
        .then(isMatch => {
            if (!isMatch)
                throw new Error("A senha informada não corresponde a senha cadastrada!")
        });
}

export function verificarSeClienteFoiInserido(insertId) {
    if (insertId === 0)
        throw new Error("O cliente não foi inserido");
}

export function verificarSeClienteFoiAlterado(linhasAfetadas) {
    if (linhasAfetadas === 0)
        throw new Error("O cliente não foi alterado");
}

export function verificarSeClienteFoiRemovido(linhasAfetadas) {
    if (linhasAfetadas === 0)
        throw new Error("O cliente não foi removido");
}

export function verificarSeClientesSãoIguais(registro, clienteAtual) {
    for (const key in registro) {
        if (registro[key].cpf === clienteAtual.cpf) {
            throw new Error("Esse cliente já foi inserido");
        }
    }
}