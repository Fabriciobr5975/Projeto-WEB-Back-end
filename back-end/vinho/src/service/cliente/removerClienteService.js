import { removerCliente } from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, verificarSeClienteFoiRemovido } from '../../validation/cliente/clienteValidation.js'


export default async function removerClienteService(idCliente) {
    validarEntradaParaBuscaPorCliente(idCliente);
    
    const resposta = await removerCliente(idCliente);
    verificarSeClienteFoiRemovido(idCliente);

    return resposta;
}