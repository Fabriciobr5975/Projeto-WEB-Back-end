import { buscarClientesPorEmail } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente, validarSenhaCliente } from '../../validation/cliente/clienteValidation.js'

export default async function buscarClientesPorEmailService(email, senha) {
    validarEntradaParaBuscaPorCliente(email);

    const registro = await buscarClientesPorEmail(email);
    validarBuscaCliente(registro);

    await validarSenhaCliente(senha, registro[0].senha);

    // Removendo a senha do cliente;
    registro[0].senha = undefined;

    return registro;
}