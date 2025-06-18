import { buscarClientesPorId, alterarSenhaCliente } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente, validarSenhaCliente, verificarSeClienteFoiAlterado } from '../../validation/cliente/clienteValidation.js'
import bcrypt from 'bcryptjs';

export default async function alterarSenhaClienteService(idCliente, cliente) {
    validarEntradaParaBuscaPorCliente(idCliente);

    const registro = await buscarClientesPorId(idCliente);
    validarBuscaCliente(registro);

    await validarSenhaCliente(cliente.senha, registro[0].senha);
    const novaSenhaHash = await bcrypt.hash(cliente.novaSenha, 10);

    const resposta = await alterarSenhaCliente(idCliente, novaSenhaHash);
    verificarSeClienteFoiAlterado(resposta);

    return resposta;
}