
/**
 * Função para transformar as imagens que vem do banco de dados em bytes e tranformar em uma imagem base64 
 * 
 * @param {JSON} registro - Recebe o registro que contém a imagem a ser tratada
 * 
 * @returns {JSON} Retorna uma imagem base64 do imagem do vinho que passado
 */
export default function tranformarImagemBase64(registro) {
    return registro.map(vinho => {
        const imagem = vinho.imagem_vinho.toString("base64");
        return { ...vinho, imagem_vinho: `data:image/${vinho.extensao};base64,${imagem}` };
    });
}