import { listarClientes } from '../../repository/cliente/clienteRepository.js'
import { validarBuscaCliente } from '../../validation/cliente/clienteValidation.js'

export default async function listarClienteService() {
    const registros = await listarClientes();
    validarBuscaCliente(registros);

    // Removendo a senha do cliente;
    registros[0].senha = undefined;

    return registros;
}