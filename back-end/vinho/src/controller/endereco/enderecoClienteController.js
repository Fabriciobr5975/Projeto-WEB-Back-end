import alterarEnderecoClienteService from '../../service/enderecoCliente/alterarEnderecoClienteService.js';
import inserirEnderecoClienteService from '../../service/enderecoCliente/inserirEnderecoClienteService.js';
import removerEnderecoClienteService from '../../service/enderecoCliente/removerEnderecoClienteService.js';
import listarEnderecosClienteService from '../../service/enderecoCliente/listarEnderecosClienteService.js';
import buscarEnderecoClientePorCEPService from '../../service/enderecoCliente/buscarEnderecoClientePorCEPService.js';
import buscarEnderecoClientePorCPFService from '../../service/enderecoCliente/buscarEnderecoClientePorCPFService.js';

import { Router } from "express";

const endpoints = Router();

endpoints.post("/enderecoCliente", async (req, resp) => {
    try {
        const enderecoCliente = req.body;
        const resposta = await inserirEnderecoClienteService(enderecoCliente);

        resp.send({
            resposta: resposta
        });
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.put("/enderecoCliente/id", async (req, resp) => {
    try {
        const endereco = req.query.endereco;
        const cliente = req.query.cliente;
        const enderecoCliente = req.body;
        
        const resposta = await alterarEnderecoClienteService(endereco, cliente, enderecoCliente);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.delete("/enderecoCliente/id", async (req, resp) => {
    try {
        const endereco = req.query.endereco;
        const cliente = req.query.cliente;

        const resposta = await removerEnderecoClienteService(endereco, cliente);

        resp.send({resposta});
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/enderecoCliente", async (req, resp) => {
    try {
        const registros = await listarEnderecosClienteService();

        resp.send(registros);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/enderecoCliente/busca/cep", async (req, resp) => {
    try {
        const cep = req.query.cep;
        const registro = await buscarEnderecoClientePorCEPService(cep);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/enderecoCliente/busca/cliente", async (req, resp) => {
    try {
        const cliente = req.query.cliente;
        const registro = await buscarEnderecoClientePorCPFService(cliente);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 
 

export default endpoints;