import inserirPaisService from '../../service/vinicola/inserirVinicolaService.js';
import alterarPaisService from '../../service/vinicola/alterarVinicolaService.js';
import removerPaisService from '../../service/vinicola/removerVinicolaService.js';
import listarPaisesService from '../../service/vinicola/listarVinicolaService.js';
import buscarVinicolaPorIdService from '../../service/vinicola/buscarVinicolaPorIdService.js';
import buscarVinicolaPorNomeService from '../../service/vinicola/buscarVinicolaPorNomeService.js';

import { Router } from "express";

const endpoints = Router();

endpoints.post("/vinicola", async (req, resp) => {
    try {
        const vinicola = req.body;
        const resposta = await inserirPaisService(vinicola);

        resp.send({
            id_inserido: resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.put("/vinicola/:id", async (req, resp) => {
    try {
        const idVinicola = req.params.id;
        const vinicola = req.body;
        const resposta = await alterarPaisService(idVinicola, vinicola);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.delete("/vinicola/:id", async (req, resp) => {
    try {
        const idVinicola = req.params.id;
        const resposta = await removerPaisService(idVinicola);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/vinicola", async (req, resp) => {
    try {
        const registros = await listarPaisesService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/estoque/:id", async (req, resp) => {
    try {
        const idVinicola = req.params.id;
        const registro = await buscarVinicolaPorIdService(idVinicola);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/vinicola/:nome", async (req, resp) => {
    try {
        const nome = req.params.id;
        const registros = await buscarVinicolaPorNomeService(nome);

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

export default endpoints;