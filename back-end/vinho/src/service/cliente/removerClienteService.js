import { buscarClientesPorId, removerCliente } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarBuscaCliente, verificarSeClienteFoiRemovido } from '../../validation/cliente/clienteValidation.js'


export default async function removerClienteService(idCliente) {
    validarEntradaParaBuscaPorCliente(idCliente);
    
    const registro = await buscarClientesPorId(idCliente);
    validarBuscaCliente(registro);

    const resposta = await removerCliente(idCliente);
    verificarSeClienteFoiRemovido(idCliente);

    return resposta;
}