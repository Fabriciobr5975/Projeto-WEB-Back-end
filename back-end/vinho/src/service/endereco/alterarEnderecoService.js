import { buscarEnderecoPorId, alterarEndereco } from '../../repository/endereco/enderecoRepository.js'
import { pegarEnderecoDoViaCep, construirJSONIEndereco } from './buscarEnderecoViaCepService.js'

import { validarEntradaParaBuscaPorEndereco, validarCamposObrigatoriosEndereco, validarBuscaEndereco, verificarSeEnderecoFoiAlterado} from '../../validation/endereco/enderecoValidation.js'

export default async function alterarEnderecoService(idEndereco, endereco) {
    validarEntradaParaBuscaPorEndereco(idEndereco);
    validarCamposObrigatoriosEndereco(endereco);
    
    const registro = await buscarEnderecoPorId(idEndereco);
    validarBuscaEndereco(registro);
    
    // Pegando as informações do CEP da API do viacep
    const enderecoViaCep = await pegarEnderecoDoViaCep(endereco.cep);

    // Construindo o JSON para a alteraçao do endereço no BD
    const enderecoFinal = construirJSONIEndereco(enderecoViaCep, endereco);

    const resposta = await alterarEndereco(idEndereco, enderecoFinal);
    verificarSeEnderecoFoiAlterado(resposta);

    return resposta;
} 