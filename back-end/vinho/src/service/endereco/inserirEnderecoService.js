import { buscarEnderecoPorId, inserirEndereco } from '../../repository/endereco/enderecoRepository.js'
import { validarCamposObrigatoriosEndereco, verificarSeEnderecosSãoIguais, verificarSeEnderecoFoiInserido} from '../../validation/endereco/enderecoValidation.js'

export default async function inserirEnderecoService(idEndereco, endereco) {
    validarCamposObrigatoriosEndereco(endereco);
    
    const registro = await buscarEnderecoPorId(idEndereco);
    verificarSeEnderecosSãoIguais(registro, endereco);

    const resposta = await inserirEndereco(idEndereco, endereco);
    verificarSeEnderecoFoiInserido(resposta);

    return resposta;
}