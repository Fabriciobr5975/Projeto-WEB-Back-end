import alterarItensCarrinhoService from '../../service/itensCarrinho/alterarItensCarrinhoService.js'
import buscarItensCarrinhoPeloClienteService from '../../service/itensCarrinho/buscarItensCarrinhoPeloClienteService.js'
import buscarItensCarrinhoPorIdService from '../../service/itensCarrinho/buscarItensCarrinhoPorIdService.js'
import buscarItensCarrinhoPorVinhoService from '../../service/itensCarrinho/buscarItensCarrinhoPorVinhoService.js'
import inserirItensCarrinhoService from '../../service/itensCarrinho/inserirItensCarrinhoService.js'
import listarItensCarrinhosService from '../../service/itensCarrinho/listarItensCarrinhosService.js'
import removerItensCarrinhoService from '../../service/itensCarrinho/removerItensCarrinhoService.js'

import { Router } from "express";

const endpoints = Router();

endpoints.post("/itenscarrinho", async (req, resp) => {
    try {
        const itens_carrinho = req.body;
        const resposta = await inserirItensCarrinhoService(itens_carrinho);

        resp.send({
            id_inserido: resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.put("/itenscarrinho/:id", async (req, resp) => {
    try {
        const idItensCarrinho = req.params.id;
        const itens_carrinho = req.body;
        const resposta = await alterarItensCarrinhoService(idItensCarrinho, itens_carrinho);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.delete("/itenscarrinho/:id", async (req, resp) => {
    try {
        const idItensCarrinho = req.params.id;
        const resposta = await removerItensCarrinhoService(idItensCarrinho);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/itenscarrinho", async (req, resp) => {
    try {
        const registros = await listarItensCarrinhosService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/itenscarrinho/:id", async (req, resp) => {
    try {
        const idItensCarrinho = req.params.id;
        const registro = await buscarItensCarrinhoPorIdService(idItensCarrinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/itenscarrinho/cliente/:cliente", async (req, resp) => {
    try {
        const clienteItensCarrinho = req.params.cliente;
        const registro = await buscarItensCarrinhoPeloClienteService(clienteItensCarrinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/itenscarrinho/vinho/:vinho", async (req, resp) => {
    try {
        const vinhoItensCarrinho = req.params.vinho;
        const registro = await buscarItensCarrinhoPorVinhoService(vinhoItensCarrinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

export default endpoints;