import { buscarEstoquePorId } from '../../repository/estoque/estoqueRepository.js'
import { validarEntradaParaBuscaPorEstoque, validarBuscaEstoque } from '../../validation/estoque/estoqueValidation.js'

export default async function buscarEstoquePorIdService(idEstoque) {
    validarEntradaParaBuscaPorEstoque(idEstoque);

    const registro = await buscarEstoquePorId(idEstoque);
    validarBuscaEstoque(registro);

    const imagem = registro.imagem_vinho.toString("base64");
    const registroComImage = { ...registro, imagem_vinho: `data:image/${registro.extensao};base64,${imagem}` };

    return registroComImage;
}