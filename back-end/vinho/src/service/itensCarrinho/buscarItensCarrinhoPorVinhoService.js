import { buscarItensCarrinhoPorVinho } from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function buscarItensCarrinhoPorVinhoService(idVinho) {
    validarEntradaParaBuscaPorItensCarrinho(idVinho);

    const registro = await buscarItensCarrinhoPorVinho(idVinho);
    validarBuscaItensCarrinho(registro);

    const registroComImage = registro.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });


    return registroComImage;
}