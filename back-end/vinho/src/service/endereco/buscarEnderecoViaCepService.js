
/**
 * Função que busca um endereço a partir do cep passado pelo usuário, utilizando a API viacep
 * 
 * @param {String} cep - CEP que será usado para realizar a busca do endereço
 * 
 * @returns Retorna um JSON, contendo as informações do endereço buscado
 */
export const pegarEnderecoDoViaCep = async cep => {
    const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    return await request.json();
}

/**
 * Função para contruir objeto que será usado para criar os endereços no banco de dados 
 * 
 * @param {JSON} - Recebe o JSON que vem da API do viacep  
 * @param {JSON} - Recebe o JSON que o cliente inseriu as informações básicas (cep, numero e complemento)
 *  
 * @returns Retorna um JSON contendo somente as informações relevantes para a inserção dos endereços  
 */
export const construirJSONIEndereco = ({ logradouro, bairro, localidade, uf, cep }, { numero, complemento}) => {
    return {
        logradouro,
        numero,
        bairro,
        localidade,
        uf,
        cep,
        complemento
    };
}
