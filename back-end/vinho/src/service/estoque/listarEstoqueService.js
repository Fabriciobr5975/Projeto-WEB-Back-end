import { listarEstoque } from '../../repository/estoque/estoqueRepository.js'
import { validarBuscaEstoque } from '../../validation/estoque/estoqueValidation.js'

export default async function listarEstoqueService() {
    const registros = await listarEstoque();
    validarBuscaEstoque(registros);

    return registros;
}