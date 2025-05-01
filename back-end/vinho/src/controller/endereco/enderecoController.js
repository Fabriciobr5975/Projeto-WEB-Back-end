import alterarEnderecoService from '../../service/endereco/alterarEnderecoService.js';
import inserirEnderecoService from '../../service/endereco/inserirEnderecoService.js';
import removerEnderecoService from '../../service/endereco/removerEnderecoService.js';
import listarEnderecosService from '../../service/endereco/listarEnderecosService.js';
import buscarEnderecoPorCepService from '../../service/endereco/buscarEnderecoPorCepService.js';
import buscarEnderecoPorCidadeService from '../../service/endereco/buscarEnderecoPorCidadeService.js';
import buscarEnderecoPorIdService from '../../service/endereco/buscarEnderecoPorIdService.js';
import buscarEnderecoPorLogradouroService from '../../service/endereco/buscarEnderecoPorLogradouroService.js';
import buscarEnderecoPorUFService from '../../service/endereco/buscarEnderecoPorUFService.js';

import { Router } from "express";

const endpoints = Router();

endpoints.post("/endereco", async (req, resp) => {
    try {
        const endereco = req.body;
        const resposta = await inserirEnderecoService(endereco);

        resp.send({
            id_inserido: resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.put("/endereco/:id", async (req, resp) => {
    try {
        const idEndereco = req.params.id;
        const endereco = req.body;
        const resposta = await alterarEnderecoService(idEndereco, endereco);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.delete("/endereco/:id", async (req, resp) => {
    try {
        const idEndereco = req.params.id;
        const resposta = await removerEnderecoService(idEndereco);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/endereco", async (req, resp) => {
    try {
        const registros = await listarEnderecosService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/endereco/:id", async (req, resp) => {
    try {
        const idEndereco = req.params.id;
        const registro = await buscarEnderecoPorIdService(idEndereco);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/endereco/busca/cep", async (req, resp) => {
    try {
        const cep = req.query.cep;
        const registro = await buscarEnderecoPorCepService(cep);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/endereco/busca/cidade", async (req, resp) => {
    try {
        const cidade = req.query.cidade;
        const registro = await buscarEnderecoPorCidadeService(cidade);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/endereco/busca/logradouro", async (req, resp) => {
    try {
        const logradouro = req.query.logradouro;
        const registro = await buscarEnderecoPorLogradouroService(logradouro);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/endereco/busca/uf", async (req, resp) => {
    try {
        const ufCidade = req.query.uf;
        const registro = await buscarEnderecoPorUFService(ufCidade);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

export default endpoints;