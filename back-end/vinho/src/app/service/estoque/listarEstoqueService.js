import { listarEstoque } from '../../repository/estoque/estoqueRepository.js'
import { validarBuscaEstoque } from '../../validation/estoque/estoqueValidation.js'

export default async function listarEstoqueService() {
    const registros = await listarEstoque();
    validarBuscaEstoque(registros);

    const registroComImage = registros.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}