// import contruirVetorListaPedidoCliente from "./contruirVetorListaPedidoCliente.js";
import { listarPedidosClientesPorFiltro } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente } from '../../validation/cliente/clienteValidation.js'

export default async function listarPedidosClientesFiltroService(filtro) {
    validarEntradaParaBuscaPorCliente(filtro);
    
    const registros = await listarPedidosClientesPorFiltro(filtro);
    validarBuscaCliente(registros);

    return registros.slice(0, 20);
}