import alterarItensPedidoService from '../../service/itensPedido/alteraritensPedidoService.js'
import buscarItensPedidoPorPedidoService from '../../service/itensPedido/buscarItensPedidoPorPedidoService.js'
import buscarItensPedidoPeloClienteService from '../../service/itensPedido/buscaritensPedidoPeloClienteService.js'
import buscarItensPedidoPorIdService from '../../service/itensPedido/buscaritensPedidoPorIdService.js'
import buscarItensPedidoPorVinhoService from '../../service/itensPedido/buscaritensPedidoPorVinhoService.js'
import inserirItensPedidoService from '../../service/itensPedido/inseriritensPedidoService.js'
import listarItensPedidoService from '../../service/itensPedido/listaritensPedidoService.js'
import removerItensPedidoService from '../../service/itensPedido/removeritensPedidoService.js'

import { Router } from "express";

const endpoints = Router();

endpoints.post("/itenspedido", async (req, resp) => {
    try {
        const itensPedido = req.body;
        const resposta = await inserirItensPedidoService(itensPedido);

        resp.send({
            resposta: resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.put("/itenspedido/:id", async (req, resp) => {
    try {
        const idItensPedido = req.params.id;
        const itensPedido = req.body;
        const resposta = await alterarItensPedidoService(idItensPedido, itensPedido);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.delete("/itenspedido/:id", async (req, resp) => {
    try {
        const idItensPedido = req.params.id;
        const resposta = await removerItensPedidoService(idItensPedido);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/itenspedido", async (req, resp) => {
    try {
        const registros = await listarItensPedidoService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/itenspedido/:id", async (req, resp) => {
    try {
        const idItensPedido = req.params.id;
        const registro = await buscarItensPedidoPorIdService(idItensPedido);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/itenspedido/busca/pedido", async (req, resp) => {
    try {
        const idPedido = req.query.pedido;
        const registro = await buscarItensPedidoPorPedidoService(idPedido);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/itenspedido/busca/cliente", async (req, resp) => {
    try {
        const cpfCliente = req.query.cliente;
        const registro = await buscarItensPedidoPeloClienteService(cpfCliente);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/itenspedido/busca/vinho", async (req, resp) => {
    try {
        const idVinho = req.query.vinho;
        const registro = await buscarItensPedidoPorVinhoService(idVinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

export default endpoints;