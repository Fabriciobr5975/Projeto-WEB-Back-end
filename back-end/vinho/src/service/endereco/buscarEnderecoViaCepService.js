import { validarCEP, validarSeCepFoiEncontrado } from '../autenticacao/autenticacaoCEP.js'

/**
 * Função que busca um endereço a partir do cep passado pelo usuário, utilizando a API viacep
 * 
 * @param {String} cep - CEP que será usado para realizar a busca do endereço
 * 
 * @returns Retorna um JSON, contendo as informações do endereço buscado
 */
export const pegarEnderecoDoViaCep = async cep => {
    validarCEP(cep);
    
    const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    const endereco = await request.json();
    validarSeCepFoiEncontrado(endereco, cep);

    return endereco;
}

/**
 * Função para contruir objeto que será usado para criar os endereços no banco de dados 
 * 
 * @param {JSON} - Recebe o JSON que vem da API do viacep  
 *  
 * @returns Retorna um JSON contendo somente as informações relevantes para a inserção dos endereços  
 */
export const construirJSONIEndereco = ({ logradouro, bairro, localidade, uf, cep }) => {
    return {
        logradouro,
        bairro,
        localidade,
        uf,
        cep
    };
}
