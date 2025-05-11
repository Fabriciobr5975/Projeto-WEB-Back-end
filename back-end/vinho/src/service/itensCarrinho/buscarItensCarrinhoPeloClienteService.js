import {buscarItensCarrinhoPeloCliente} from '../../repository/carrinho/itensCarrinhoRepository.js'
import { validarEntradaParaBuscaPorItensCarrinho, validarBuscaItensCarrinho } from '../../validation/carrinho/itensCarrinhoValidation.js'

export default async function buscarItensCarrinhoPeloClienteService(cpfCliente) {
    validarEntradaParaBuscaPorItensCarrinho(cpfCliente);

    const registro = await buscarItensCarrinhoPeloCliente(cpfCliente);
    validarBuscaItensCarrinho(registro);

    const registroComImage = registro.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}