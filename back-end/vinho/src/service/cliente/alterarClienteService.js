import { buscarClientesPorId, alterarCliente} from '../../repository/cliente/clienteRepository.js'
import { validarEntradaParaBuscaPorCliente, validarCamposObrigatoriosCliente, validarBuscaCliente, verificarSeClientesSãoIguais, verificarSeClienteFoiAlterado } from '../../validation/cliente/clienteValidation.js'

export default async function alterarClienteClienteService(idCliente, cliente) {
    validarEntradaParaBuscaPorCliente(idCliente);
    validarCamposObrigatoriosCliente(cliente);

    const registro = buscarClientesPorId(idCliente)
    validarBuscaCliente(registro);
    verificarSeClientesSãoIguais(registro, cliente);    

    const resposta = await alterarCliente(idCliente, cliente);
    verificarSeClienteFoiAlterado(resposta);

    return resposta;
}