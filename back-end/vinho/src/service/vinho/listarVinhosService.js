import { listarVinhos } from '../../repository/vinho/vinhoRepository.js'
import { validarBuscaVinho } from '../../validation/vinho/vinhoValidation.js'

export default async function listarVinhoService() {
    const registros = await listarVinhos();
    validarBuscaVinho(registros);
   
    const registroComImage = registros.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    }); 

    return registroComImage;
}