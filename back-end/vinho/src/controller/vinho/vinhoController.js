import inserirVinhoService from '../../service/vinho/inserirVinhoService.js';
import alterarVinhoService from '../../service/vinho/alterarVinhoService.js';
import removerVinhoService from '../../service/vinho/removerVinhoService.js';
import listarVinhosService from '../../service/vinho/listarVinhosService.js';
import buscarVinhoPorClassificacaoService from '../../service/vinho/buscarVinhoPorClassificacaoService.js';
import buscarVinhoPorIdService from '../../service/vinho/buscarVinhoPorIdService.js';
import buscarVinhoPorNomeService from '../../service/vinho/buscarVinhoPorNomeService.js';
import buscarVinhoPorPais from '../../service/vinho/buscarVinhoPorPais.js';
import buscarVinhoPorPrecoService from '../../service/vinho/buscarVinhoPorPrecoService.js';
import buscarVinhoPorSafraService from '../../service/vinho/buscarVinhoPorSafraService.js';
import buscarVinhoPorTeorAlcoolicoService from '../../service/vinho/buscarVinhoPorTeorAlcoolicoService.js';
import buscarVinhoPorUvaService from '../../service/vinho/buscarVinhoPorUvaService.js';

import { Router } from "express";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({storage});

const endpoints = Router();

// const armazenmento = multer.memoryStorage();
// const upload = multer({armazenmento});


endpoints.post("/vinho",  async (req, resp) => {
    try {
        const vinho = req.body;
        vinho.imagem_vinho = req.file?.buffer;

        const resposta = await inserirVinhoService(vinho);

        resp.send({
            id_inserido: resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.put("/vinho/:id", async (req, resp) => {
    try {
        const idVinho = req.params.id;
        const vinho = req.body;
        const resposta = await alterarVinhoService(idVinho, vinho);

        resp.send({ resposta });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.delete("/vinho/:id", async (req, resp) => {
    try {
        const idVinho = req.params.id;
        const resposta = await removerVinhoService(idVinho);

        resp.send({ resposta });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/vinho", async (req, resp) => {
    try {
        const registros = await listarVinhosService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/vinho/:id", async (req, resp) => {
    try {
        const idVinho = req.params.id;
        const registro = await buscarVinhoPorIdService(idVinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/vinho/nome/:nome", async (req, resp) => {
    try {
        const nomeVinho = req.params.nome;
        const registro = await buscarVinhoPorNomeService(nomeVinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/vinho/classificacao/:classificacao", async (req, resp) => {
    try {
        const classificaoVinho = req.params.classificacao;
        const registro = await buscarVinhoPorClassificacaoService(classificaoVinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/vinho/safra/:safra", async (req, resp) => {
    try {
        const safraVinho = req.params.safra;
        const registro = await buscarVinhoPorSafraService(safraVinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/vinho/preco/:preco", async (req, resp) => {
    try {
        const precoVinho = req.params.preco;
        const registro = await buscarVinhoPorPrecoService(precoVinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/vinho/pais/:pais", async (req, resp) => {
    try {
        const paisVinho = req.params.pais;
        const registro = await buscarVinhoPorPais(paisVinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/vinho/uva/:uva", async (req, resp) => {
    try {
        const uvaVinho = req.params.uva;
        const registro = await buscarVinhoPorUvaService(uvaVinho);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

endpoints.get("/vinho/teoralcoolico/:teoralcoolico", async (req, resp) => {
    try {
        const teoralcoolico = req.params.teoralcoolico;
        const registro = await buscarVinhoPorTeorAlcoolicoService(teoralcoolico);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});
export default endpoints;