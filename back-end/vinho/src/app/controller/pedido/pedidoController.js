import inserirPedidoService from '../../service/pedido/inserirPedidoService.js';
import alterarPedidoService from '../../service/pedido/alterarPedidoService.js';
import removerPedidoService from '../../service/pedido/removerPedidoService.js';
import listarPedidoService from '../../service/pedido/listarPedidoService.js';
import buscarPedidoPorIdService from '../../service/pedido/buscarPedidoPorIdService.js';
import buscarPedidoPorVinhoService from '../../service/pedido/buscarPedidoPorVinhoService.js';
import buscarPedidoPeloClienteService from '../../service/pedido/buscarPedidoPeloClienteService.js';
import buscarPedidoPeloPorFiltroService from '../../service/pedido/buscarPedidoPorFiltroService.js';

import { Router } from "express";

const endpoints = Router();

endpoints.post("/pedido", async (req, resp) => {
    try {
        const pedido = req.body;
        const resposta = await inserirPedidoService(pedido);

        resp.status(201).send({
            resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.put("/pedido/:id", async (req, resp) => {
    try {
        const idPedido = req.params.id;
        const pedido = req.body;
        const resposta = await alterarPedidoService(idPedido, pedido);

        resp.send({ resposta });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.delete("/pedido/:id", async (req, resp) => {
    try {
        const idPedido = req.params.id;
        const resposta = await removerPedidoService(idPedido);

        resp.send({ resposta });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/pedido", async (req, resp) => {
    try {
        const registros = await listarPedidoService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/pedido/:id", async (req, resp) => {
    try {
        const idCarrinho = req.params.id;
        const registro = await buscarPedidoPorIdService(idCarrinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/pedido/busca/vinho", async (req, resp) => {
    try {
        const idVinho = req.query.vinho;
        const registro = await buscarPedidoPorVinhoService(idVinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/pedido/busca/cliente", async (req, resp) => {
    try {
        const cpfCliente = req.query.cliente;
        const registro = await buscarPedidoPeloClienteService(cpfCliente);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/pedido/busca/data", async (req, resp) => {
    try {
        const cpfCliente = req.query.cliente;
        const filtro = req.query.filtro;
        const registro = await buscarPedidoPeloPorFiltroService(cpfCliente, filtro);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

export default endpoints;