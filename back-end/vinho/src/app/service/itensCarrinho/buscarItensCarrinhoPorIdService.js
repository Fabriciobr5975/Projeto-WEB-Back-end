import { buscarItensCarrinhoPorId } from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function buscarItensCarrinhoPorIdService(idItensCarrinho) {
    validarEntradaParaBuscaPorItensCarrinho(idItensCarrinho);

    const registro = await buscarItensCarrinhoPorId(idItensCarrinho);
    validarBuscaItensCarrinho(registro);

    const imagem = registro.imagem_vinho.toString("base64");
    const registroComImage = { ...registro, imagem_vinho: `data:image/${registro.extensao};base64,${imagem}` };

    return registroComImage;
}