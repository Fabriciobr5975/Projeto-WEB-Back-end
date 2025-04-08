import { buscarEnderecoPorId, alterarEndereco } from '../../repository/endereco/enderecoRepository.js'
import { validarEntradaParaBuscaPorEndereco, validarCamposObrigatoriosEndereco, validarBuscaEndereco, verificarSeEnderecosSãoIguais, verificarSeEnderecoFoiAlterado} from '../../validation/endereco/enderecoValidation.js'

export default async function alterarEnderecoService(idEndereco, endereco) {
    validarEntradaParaBuscaPorEndereco(idEndereco);
    validarCamposObrigatoriosEndereco(endereco);
    
    const registro = await buscarEnderecoPorId(idEndereco);
    validarBuscaEndereco(registro);
    verificarSeEnderecosSãoIguais(registro, endereco);

    const resposta = await alterarEndereco(idEndereco, endereco);
    verificarSeEnderecoFoiAlterado(resposta);

    return resposta;
} 