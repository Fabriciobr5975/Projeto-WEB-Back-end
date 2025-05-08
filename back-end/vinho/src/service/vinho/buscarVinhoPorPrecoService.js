import { buscarVinhoPorPreco } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorPrecoService(precoVinho) {
    validarEntradaParaBuscaPorVinho(precoVinho);
    
    const registro = await buscarVinhoPorPreco(precoVinho);
    validarBuscaVinho(registro);

    const registroComImage = registros.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}