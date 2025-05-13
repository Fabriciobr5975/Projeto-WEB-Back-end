import { listarItensCarrinhos } from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function listarItensCarrinhoService() {
    const registros = await listarItensCarrinhos();
    validarBuscaItensCarrinho(registros);

    const registroComImage = registros.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}