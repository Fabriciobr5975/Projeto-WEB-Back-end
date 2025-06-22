import { buscarEstoquePorStatus } from '../../repository/estoque/estoqueRepository.js'
import { validarEntradaParaBuscaPorEstoque, validarBuscaEstoque } from '../../validation/estoque/estoqueValidation.js'

export default async function buscarEstoquePorStatusService(status) {
    validarEntradaParaBuscaPorEstoque(status);

    const registro = await buscarEstoquePorStatus(status);
    validarBuscaEstoque(registro);
    
    const registroComImage = registro.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });

    return registroComImage;
}