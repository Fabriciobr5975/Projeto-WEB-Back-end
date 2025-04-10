import inserirEstoqueService from '../../service/estoque/inserirEstoqueService.js';
import alterarEstoqueService from '../../service/estoque/alterarEstoqueService.js';
import removerEstoqueService from '../../service/estoque/removerEstoqueService.js';
import listarEstoqueService from '../../service/estoque/listarEstoqueService.js';
import buscarEstoquePorIdService from '../../service/estoque/buscarEstoquePorIdService.js';
import buscarEstoquePorQuantidadeService from '../../service/estoque/buscarEstoquePorQuantidadeService.js';
import buscarEstoquePorSafraService from '../../service/estoque/buscarEstoquePorSafraService.js';
import buscarEstoquePorStatusService from '../../service/estoque/buscarEstoquePorStatusService.js';
import buscarEstoquePorVinhoService from '../../service/estoque/buscarEstoquePorVinhoService.js';

import { Router } from "express";

const endpoints = Router();

endpoints.post("/estoque", async (req, resp) => {
    try {
        const estoque = req.body;
        const resposta = await inserirEstoqueService(estoque);

        resp.send({
            id_inserido: resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.put("/estoque/:id", async (req, resp) => {
    try {
        const idEstoque = req.params.id;
        const estoque = req.body;
        const resposta = await alterarEstoqueService(idEstoque, estoque);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.delete("/estoque/:id", async (req, resp) => {
    try {
        const idEstoque = req.params.id;
        const resposta = await removerEstoqueService(idEstoque);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/estoque", async (req, resp) => {
    try {
        const registros = await listarEstoqueService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/estoque/:id", async (req, resp) => {
    try {
        const idEstoque = req.params.id;
        const registro = await buscarEstoquePorIdService(idEstoque);

        resp.send({registro});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/estoque/:vinho", async (req, resp) => {
    try {
        const vinhoEstoque = req.params.vinho;
        const registro = await buscarEstoquePorVinhoService(vinhoEstoque);

        resp.send({registro});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/estoque/:safra", async (req, resp) => {
    try {
        const safraEstoque = req.params.safra;
        const registro = await buscarEstoquePorSafraService(safraEstoque);

        resp.send({registro});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/estoque/:status", async (req, resp) => {
    try {
        const statusEstoque = req.params.status;
        const registro = await buscarEstoquePorStatusService(statusEstoque);

        resp.send({registro});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/estoque/:quantidade", async (req, resp) => {
    try {
        const quantidadeEstoque = req.params.quantidade;
        const registro = await buscarEstoquePorQuantidadeService(quantidadeEstoque);

        resp.send({registro});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

export default endpoints;
