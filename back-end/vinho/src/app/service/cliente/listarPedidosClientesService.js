//import contruirVetorListaPedidoCliente from "./contruirVetorListaPedidoCliente.js";
import { listarPedidosClientes } from '../../repository/cliente/clienteRepository.js'
import { validarBuscaCliente } from '../../validation/cliente/clienteValidation.js'

export default async function listarPedidosClientesService() {
    const registros = await listarPedidosClientes();
    validarBuscaCliente(registros);

    return registros.slice(0, 20);
}