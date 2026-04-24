## Projeto Viana Vinhos (Back-End) 🧑‍💻
<p align="justify">Repositório para os arquivos referentes ao Back-End do projeto <strong>Vinho</strong>. O projeto está vendo construido em NodeJs, usando o Framework ReactJs, com um sistema de gerenciamento de banco de dados MySQL.</p>

## Objetivo 🎯 
<p align="justify">Este projeto teve como proposito a construção de uma plataforma online de reserva de produtos, no caso vinhos, com o intuito de automatizar e facilitar na execução de processos administrativos e operacionais.</p>

## Funcionalidades 📕
- Vinho:
  - Cadastro, Alteração, Remoção e vários tipos de busca e listagens (CRUD)
  - Permite a associação entre tabelas, ou seja, o que é retornado pelos end-points são os dados de várias tabelas
  - Permite aos usuários inserir, vinhos em seus carrinhos, alterar a quantidade entre outros
  - Controle e verificações, para que o cliente saiba dos erros que ocorram

<br/>
 
- Estoque
  - Cadastro, Alteração, Remoção e alguns tipos de busca e listagens (CRUD)
  - O administrador pode adicionar ou remover os vinhos do estoque
  - Os clientes podem manipular também, porém apenas a quantidade do estoque do vinho
  - Determina se o vinho poderá ou não ser adicionado ao carrinho do cliente

<br/>

- Pais e Vinícola
  - Cadastro, Alteração, Remoção e vários tipos de busca e listagens (CRUD) para ambos
  - São informações adicionais adicionadas aos vinhos, complementando na hora da inserção dos mesmos
  - Apenas os administradores tema acesso a essa parte do sistema

<br/>

- Usuarios:
  - Cadastro, Alteração, Remoção e vários tipos de busca e listagens (CRUD)
  - Permite adicionar endereços, que são buscados através de uma API [viacep](https://viacep.com.br/)
  - Permite que os usuários tenha mais de um endereço

<br/>

- Carrinho e Itens do Carrinho
  - Cadastro, Alteração, Remoção e vários tipos de busca e listagens (CRUD)
  - Gerenciamento dos carrinhos e respectivamente com seus itens. Isso para os Administradores
  - Os clientes podem gerenciar seus os itens que estão em seu carrinho

<br/>
 
- Pedido e Itens do Pedido
  - Cadastro, Alteração, Remoção e vários tipos de busca e listagens (CRUD)
  - Gerenciamento dos pedidos respectivamente com seus itens. Isso para os Administradores

<br/>

- Endereço e Endereço Cliente
  - Cadastro, Alteração, Remoção e vários tipos de busca e listagens (CRUD)
  - Gerenciamento total dos endereços para os administradores. 
  - Gerenciamento parcial dos endereços para os clientes. Eles podem criar novos endereços ou alterar o seu endereço (Tabela do Endereço Cliente)
  - Criação dos endereços via API do [viacep](https://viacep.com.br/), o que facilita a criação e manipulação dos endereços
  - Um cliente pode adicionar mais de um endereço para a sua conta
  - É possível adicionar um nome para o endereço, além das informações complementares (número e complemeto)

## Informações Complementares 🧩
- O sistema foi validado e tenta tratar todas as possíveis exceções que são geradas
- No banco utilizamos algumas coisas mais avançadas, como procedures e triggers para controle de inserções e manipulações gerais 

> Os arquivos do Front-End se encontra neste repositório: [`Repositório do Front-End`](https://github.com/Ruanlv/Projeto-WEB-Front-end)  

## Ferramentas e Tecnologias Usadas ⚒️
<div align="center" > 
  <img src="https://logospng.org/download/visual-studio-code/visual-studio-code-4096.png" alt="Logo do Visual Studio Code" width="90"/>
  <img src="https://logospng.org/download/javascript/logo-javascript-1024.png" alt="Logo do JavaScript" width="90"/>
  <img src="https://logospng.org/download/node-js/logo-node-js-1024.png" alt="Logo do NodeJS" width="90"/>
  <img src="https://logospng.org/download/mysql/mysql-4096.png" alt="Logo do MySQL" width="90"/>
  <img src="https://logospng.org/download/figma/figma-4096.png" alt="Logo do Figma" width="90"/>
</div>

## Links Úteis 🔗
<sub> <br/>
[<img src="https://img.shields.io/badge/Figma-black?style=for-the-badge&logo=figma&logoColor=for-the-badge&labelColor=121212"/>](https://www.figma.com/design/c2hTNtz8hFYAapHXn8ly1h/Projeto-WEB---Vinho?node-id=0-1&t=4nWW1YDbkvDhPlSv-1)
[<img src="https://img.shields.io/badge/Unimodeler-black?style=for-the-badge&logoColor=for-the-badge&labelColor=121212" />](https://app.unimodeler.dev/workspace/shareLink/hebleocqsj657)
</sub>

[![Netlify Status](https://api.netlify.com/api/v1/badges/e33370db-0318-47a8-89d7-17375d023714/deploy-status)](https://app.netlify.com/projects/viana-vinhos/deploys)


## 
<h5 align="center">Feito por <a href="https://github.com/Fabriciobr5975"> Fabrício de Araújo Santana</a>, <a href="https://github.com/geovannanovais"> Geovanna Novais</a>, <a href="https://github.com/MarcusVPRocha">Marcus Vinícius Pereira Rocha</a> e <a href="https://github.com/Ruanlv"> Ruan Lopes Viana</a></h4>


