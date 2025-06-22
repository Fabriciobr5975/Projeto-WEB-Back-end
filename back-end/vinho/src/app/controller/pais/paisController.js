import inserirPaisService from '../../service/pais/inserirPaisService.js';
import alterarPaisService from '../../service/pais/alterarPaisService.js';
import removerPaisService from '../../service/pais/removerPaisService.js';
import listarPaisesService from '../../service/pais/listarPaisesService.js';
import buscarPaisPorId from '../../service/pais/buscarPaisPorIdService.js';
import buscarPaisPorNomeService from '../../service/pais/buscarPaisPorNomeService.js';
import buscarPaisPorSiglaService from '../../service/pais/buscarPaisPorSiglaService.js';

import { Router } from "express";

const endpoints = Router();

endpoints.post("/pais", async (req, resp) => {
    try {
        const pais = req.body;
        const resposta = await inserirPaisService(pais);

        resp.status(201).send({
            resposta
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

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/pais/nome/:nome", async (req, resp) => {
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

endpoints.get("/pais/sigla/:sigla", async (req, resp) => {
    try {
        const sigla = req.params.sigla;
        const registro = await buscarPaisPorSiglaService(sigla);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

export default endpoints;