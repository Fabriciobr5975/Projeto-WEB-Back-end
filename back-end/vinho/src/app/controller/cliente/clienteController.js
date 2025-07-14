import alterarClienteService from '../../service/cliente/alterarClienteService.js';
import alterarSenhaClienteService from '../../service/cliente/alterarSenhaClienteService.js';
import inserirClienteComEnderecoService from '../../service/cliente/inserirClienteComEnderecoService.js';
import inserirClienteSemEnderecoService from '../../service/cliente/inserirClienteSemEnderecoService.js';
import removerClienteService from '../../service/cliente/removerClienteService.js';
import listarClientesService from '../../service/cliente/listarClientesService.js';
import listarPedidosClientesService from '../../service/cliente/listarPedidosClientesService.js';
import listarPedidosClientesPorFiltroService from '../../service/cliente/listarPedidosClientesPorFiltroService.js';
import buscarClientePorCpfService from '../../service/cliente/buscarClientePorCpfService.js';
import buscarClientePorEmailService from '../../service/cliente/buscarClientePorEmailService.js';
import buscarClientePorIdService from '../../service/cliente/buscarClientePorIdService.js';
import buscarClientePorNomeService from '../../service/cliente/buscarClientePorNomeService.js';

import { Router } from "express";
import bcrypt from 'bcryptjs';

const endpoints = Router();
const saltRounds = 10;

endpoints.post("/cliente", async (req, resp) => {
    try {
        const cliente = req.body;
        const hash = await bcrypt.hash(cliente.senha, saltRounds);
        cliente.senha = hash;
        let resposta = undefined;

        if(!cliente.cep || cliente.cep === "") {
            resposta = await inserirClienteSemEnderecoService(cliente);
        
        } else {
            resposta = await inserirClienteComEnderecoService(cliente);
        }
        
        resp.status(201).send({
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

endpoints.put("/cliente/senha/:id", async (req, resp) => {
    try {
        const idCliente = req.params.id;
        const cliente = req.body;
        const resposta = await alterarSenhaClienteService(idCliente, cliente);

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

endpoints.get("/cliente/busca/nome", async (req, resp) => {
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

endpoints.get("/cliente/busca/cpf", async (req, resp) => {
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

endpoints.get("/cliente/busca/email", async (req, resp) => {
    try {
        const emailCliente = req.query.email;
        const senhaCliente = req.query.senha;
        const registro = await buscarClientePorEmailService(emailCliente, senhaCliente);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/cliente/lista/pedidos", async (req, resp) => {
    try { 
        const registro = await listarPedidosClientesService();

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
}); 

endpoints.get("/cliente/lista/pedidos/filtro", async (req, resp) => {
    try { 
        const filtro = req.query.filtro;
        const registro = await listarPedidosClientesPorFiltroService(filtro);

        resp.send(registro);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});

export default endpoints;
