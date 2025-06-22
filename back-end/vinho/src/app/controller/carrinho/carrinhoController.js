import alterarCarrinhoService from '../../service/carrinho/alterarCarrinhoService.js'
import buscarCarrinhoPeloClienteService from '../../service/carrinho/buscarCarrinhoPeloClienteService.js'
import buscarCarrinhoPorIdService from '../../service/carrinho/buscarCarrinhoPorIdService.js'
import buscarCarrinhoPorVinhoService from '../../service/carrinho/buscarCarrinhoPorVinhoService.js'
import inserirCarrinhoService from '../../service/carrinho/inserirCarrinhoService.js'
import listarCarrinhosService from '../../service/carrinho/listarCarrinhosService.js'
import removerCarrinhoService from '../../service/carrinho/removerCarrinhoService.js'

import { Router } from "express";

const endpoints = Router();

endpoints.post("/carrinho", async (req, resp) => {
    try {
        const carrinho = req.body;
        const resposta = await inserirCarrinhoService(carrinho);

        resp.status(201).send({
            id_inserido: resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.put("/carrinho/:id", async (req, resp) => {
    try {
        const idCarrinho = req.params.id;
        const carrinho = req.body;
        const resposta = await alterarCarrinhoService(idCarrinho, carrinho);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.delete("/carrinho/:id", async (req, resp) => {
    try {
        const idCarrinho = req.params.id;
        const resposta = await removerCarrinhoService(idCarrinho);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/carrinho", async (req, resp) => {
    try {
        const registros = await listarCarrinhosService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/carrinho/:id", async (req, resp) => {
    try {
        const idCarrinho = req.params.id;
        const registro = await buscarCarrinhoPorIdService(idCarrinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/carrinho/vinho/:vinho", async (req, resp) => {
    try {
        const idVinho = req.params.vinho;
        const registro = await buscarCarrinhoPorVinhoService(idVinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/carrinho/cliente/:cliente", async (req, resp) => {
    try {
        const cpfCliente = req.params.cliente;
        const registro = await buscarCarrinhoPeloClienteService(cpfCliente);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 


export default endpoints;