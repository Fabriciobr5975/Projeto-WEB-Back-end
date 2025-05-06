import { buscarVinhoPorId } from '../../repository/vinho/vinhoRepository.js'
import { validarEntradaParaBuscaPorVinho, validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function buscarVinhoPorIdService(idVinho) {
    validarEntradaParaBuscaPorVinho(idVinho);
    
    const registro = await buscarVinhoPorId(idVinho);
    validarBuscaVinho(registro);

    const imagem = registro.imagem_vinho.toString("base64");
    
    const registroComImage = { ...registro, imagem_vinho: `data:image/${registro.extensao};base64,${imagem}` };

    return registroComImage;
}