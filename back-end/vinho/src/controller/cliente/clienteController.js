import alterarClienteService from '../../service/cliente/alterarClienteService.js';
import inserirClienteComEnderecoService from '../../service/cliente/inserirClienteService.js';
import removerClienteService from '../../service/cliente/removerClienteService.js';
import listarClientesService from '../../service/cliente/listarClientesService.js';
import buscarClientePorCpfService from '../../service/cliente/buscarClientePorCpfService.js';
import buscarClientePorEmailService from '../../service/cliente/buscarClientePorEmailService.js';
import buscarClientePorIdService from '../../service/cliente/buscarClientePorIdService.js';
import buscarClientePorNomeService from '../../service/cliente/buscarClientePorNomeService.js';

import { Router } from "express";

const endpoints = Router();

endpoints.post("/cliente", async (req, resp) => {
    try {
        const cliente = req.body;
        const resposta = await inserirClienteComEnderecoService(cliente);

        resp.send({
            resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.put("/cliente/:id", async (req, resp) => {
    try {
        const idCliente = req.params.id;
        const cliente = req.body;
        const resposta = await alterarClienteService(idCliente, cliente);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.delete("/cliente/:id", async (req, resp) => {
    try {
        const idCliente = req.params.id;
        const resposta = await removerClienteService(idCliente);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/cliente", async (req, resp) => {
    try {
        const registros = await listarClientesService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/cliente/:id", async (req, resp) => {
    try {
        const idCliente = req.params.id;
        const registro = await buscarClientePorIdService(idCliente);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/cliente/informacoes/nome", async (req, resp) => {
    try {
        const nomeCliente = req.query.nome;
        const registro = await buscarClientePorNomeService(nomeCliente);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/cliente/informacao/cpf", async (req, resp) => {
    try {
        const cpfCliente = req.query.cpf;
        const registro = await buscarClientePorCpfService(cpfCliente);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/cliente/informacao/email", async (req, resp) => {
    try {
        const emailCliente = req.query.email;
        const registro = await buscarClientePorEmailService(emailCliente);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 
 
export default endpoints;
