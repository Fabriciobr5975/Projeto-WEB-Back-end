import carrinhoController from './controller/carrinho/carrinhoController.js'
import itensCarrinhoController from './controller/carrinho/itensCarrinhoController.js'
import clienteController from './controller/cliente/clienteController.js'
import enderecoController from './controller/endereco/enderecoController.js'
import enderecoClienteController from './controller/endereco/enderecoClienteController.js'
import estoqueController from './controller/estoque/estoqueController.js'
import paisController from './controller/pais/paisController.js'
import pedidoController from './controller/pedido/pedidoController.js'
import vinhoController from './controller/vinho/vinhoController.js'
import vinicolaController from './controller/vinho/vinicolaController.js'

/**
 * Função para adicionar as rotas criadas nos end-points para o servidor
 * 
 * @param {Express} servidor - Recebe a variável do servidor
 */
export default function adicionarRotas(servidor) {
    servidor.use(carrinhoController);
    servidor.use(itensCarrinhoController);
    servidor.use(clienteController);
    servidor.use(enderecoController);
    servidor.use(enderecoClienteController);
    servidor.use(estoqueController);
    servidor.use(paisController);
    servidor.use(pedidoController);
    servidor.use(vinhoController);
    servidor.use(vinicolaController);
}