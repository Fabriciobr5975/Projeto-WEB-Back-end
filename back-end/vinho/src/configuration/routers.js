import carrinhoController from '../app/controller/carrinho/carrinhoController.js'
import itensCarrinhoController from '../app/controller/carrinho/itensCarrinhoController.js'
import clienteController from '../app/controller/cliente/clienteController.js'
import enderecoController from '../app/controller/endereco/enderecoController.js'
import enderecoClienteController from '../app/controller/endereco/enderecoClienteController.js'
import estoqueController from '../app/controller/estoque/estoqueController.js'
import paisController from '../app/controller/pais/paisController.js'
import pedidoController from '../app/controller/pedido/pedidoController.js'
import itensPedidoController from '../app/controller/pedido/itensPedidoController.js'
import vinhoController from '../app/controller/vinho/vinhoController.js'
import vinicolaController from '../app/controller/vinho/vinicolaController.js'

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
    servidor.use(itensPedidoController);
}