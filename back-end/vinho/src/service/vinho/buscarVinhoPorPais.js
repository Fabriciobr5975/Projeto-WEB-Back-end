import { buscarVinhoPorPais } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorPaisService(pais) {
    validarEntradaParaBuscaPorVinho(pais);
    
    const registro = await buscarVinhoPorPais(pais);
    validarBuscaVinho(registro);

    const registroComImage = registros.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}