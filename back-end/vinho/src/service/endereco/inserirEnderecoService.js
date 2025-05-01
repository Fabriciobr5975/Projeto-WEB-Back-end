import { buscarEnderecoPorCep, inserirEndereco } from '../../repository/endereco/enderecoRepository.js'
import { pegarEnderecoDoViaCep, construirJSONIEndereco } from './buscarEnderecoViaCepService.js'
import { limparCEP } from '../autenticacao/autenticacaoCEP.js';
import { validarCamposObrigatoriosEnderecoParaInsercao, verificarSeEnderecosSãoIguais, verificarSeEnderecoFoiInserido } from '../../validation/endereco/enderecoValidation.js'

export default async function inserirEnderecoService(endereco) {
    validarCamposObrigatoriosEnderecoParaInsercao(endereco);

    const cepLimpo = limparCEP(endereco.cep);
    endereco.cep = cepLimpo;

    const registro = await buscarEnderecoPorCep(cepLimpo);
    verificarSeEnderecosSãoIguais(registro, endereco);

    // Pegando as informações do CEP da API do viacep
    const enderecoViaCep = await pegarEnderecoDoViaCep(cepLimpo);

    // Construindo o JSON para a inserção do endereço no BD
    const enderecoFinal = construirJSONIEndereco(enderecoViaCep, endereco);

    const resposta = await inserirEndereco(enderecoFinal);
    verificarSeEnderecoFoiInserido(resposta);

    return resposta;
}
