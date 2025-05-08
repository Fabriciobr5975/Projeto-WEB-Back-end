import { buscarVinhoPorNome } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorNomeService(nomeVinho) {
    validarEntradaParaBuscaPorVinho(nomeVinho);
    
    const registro = await buscarVinhoPorNome(nomeVinho);
    validarBuscaVinho(registro);

    const registroComImage = registros.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}