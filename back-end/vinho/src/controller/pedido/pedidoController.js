import { Router } from "express";
import { alterarPedido, listarPedido, listarPedidoPorId, removerPedido, inserirPedido, listarPedidoPeloCliente } from "../../repository/pedido/pedidoRepository";

const endpoints = Router();

endpoints.post("/pedido", async (req, resp) => {
    let pedido = req.body;
    let novoId = await inserirPedido(pedido);
    resp.status(202).send({novoId});
}); 

endpoints.put("/pedido/:id", async (req, resp) => {
    let id = req.params.id;
    let pedido = req.body;
    let linhasAfetadas = await alterarPedido(id, pedido);

    if (linhasAfetadas == 0) {
        resp.status(404).send({erro: "O pedido não foi alterado."});
    } else {
        resp.status(202).send({linhasAfetadas});
    }
}); 

endpoints.delete("/pedido/:id", async (req, resp) => {
    let id = req.params.id;
    let linhasAfetadas = await removerPedido(id);

    if (linhasAfetadas == 0) {
        resp.status(404).send({erro: "O pedido não foi removido."});
    } else {
        resp.status(202).send({linhasAfetadas});
    }
}); 

endpoints.get("/pedido", async (req, resp) => {
    let registros = await listarPedido();
    resp.send(registros);
}); 

endpoints.get("/pedido/:id", async (req, resp) => {
    let id = req.query.idCaarrinho;
    let registro = await listarPedidoPorId(id);

    if (registro.length === 0) {
        return resp.status(404).send({erro: "Nenhuma produto encontrado."});
    } else {
        resp.send(registro);
    }
}); 

endpoints.get("/pedido/cpf", async (req, resp) => {
    let cpf = req.query.cpfCliente;
    let registro = await listarPedidoPeloCliente(cpf);

    if (registro.length === 0) {
        return resp.status(404).send({erro: "Nenhuma cliente encontrado."});
    } else {
        resp.send(registro);
    }
}); 

export default endpoints;