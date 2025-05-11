import { buscarVinhoPorTeorAlcoolico } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorTeorAlcoolicoService(teorAlcoolico) {
    validarEntradaParaBuscaPorVinho(teorAlcoolico);

    const registro = await buscarVinhoPorTeorAlcoolico(teorAlcoolico);
    validarBuscaVinho(registro);

    const registroComImage = registro.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}