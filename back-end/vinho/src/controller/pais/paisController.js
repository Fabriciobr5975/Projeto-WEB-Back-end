import inserirPaisService from '../../service/pais/inserirPaisService.js';
import alterarPaisService from '../../service/pais/alterarPedidoService.js';
import removerPaisService from '../../service/pais/removerPedidoService.js';
import listarPaisesService from '../../service/pais/listarPedidoService.js';
import buscarPaisPorId from '../../service/pais/buscarPedidoPorIdService.js';
import buscarPaisPorNomeService from '../../service/pais/buscarPaisPorNomeService.js';
import buscarPaisPorSiglaService from '../../service/pais/buscarPaisPorSiglaService.js';

import { Router } from "express";

const endpoints = Router();

endpoints.post("/pais", async (req, resp) => {
    try {
        const pais = req.body;
        const resposta = await inserirPaisService(pedido);

        resp.send({
            id_inserido: resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.put("/pais/:id", async (req, resp) => {
    try {
        const idPais = req.params.id;
        const pais = req.body;
        const resposta = await alterarPaisService(idPais, pais);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.delete("/pais/:id", async (req, resp) => {
    try {
        const idPais = req.params.id;
        const resposta = await removerPaisService(idPais);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/pais", async (req, resp) => {
    try {
        const registros = await listarPaisesService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/pais/:id", async (req, resp) => {
    try {
        const idPais = req.params.id;
        const registro = await buscarPaisPorId(idPais);

        resp.send({registro});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/pais/:nome", async (req, resp) => {
    try {
        const nomePais = req.params.nome;
        const registros = await buscarPaisPorNomeService(nomePais);

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/pais/:sigla", async (req, resp) => {
    try {
        const sigla = req.params.nome;
        const registro = await buscarPaisPorSiglaService(sigla);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

export default endpoints;