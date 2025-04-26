/* 

	CRIAÇÃO DAS TABELAS DO BANCO DE DADOS 

*/

CREATE DATABASE IF NOT EXISTS db_projeto_vinho; 
 
use db_projeto_vinho;

CREATE TABLE IF NOT EXISTS vinicola (
    id_vinicola INT AUTO_INCREMENT PRIMARY KEY,
    vinicola VARCHAR(100) NOT NULL UNIQUE,
    rotulo VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS pais (
    id_pais INT AUTO_INCREMENT PRIMARY KEY,
    pais VARCHAR(100) NOT NULL UNIQUE,
    sigla CHAR(3) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS vinho (
    id_vinho INT AUTO_INCREMENT PRIMARY KEY,
    imagem_vinho MEDIUMBLOB NOT NULL,
    nome VARCHAR(100) NOT NULL,
    uva VARCHAR(100) NOT NULL,
    vinicola_fk INT NOT NULL,
    teor_alcolico VARCHAR(10) NOT NULL,
    classificacao ENUM('Suave', 'Doce', 'Sem Classificação') NOT NULL DEFAULT "Sem Classificação",
    volume VARCHAR(50) NOT NULL,
    safra YEAR NOT NULL,
    temperatura_servir VARCHAR(10),
    pais_fk INT NOT NULL,
    preco DECIMAL(10,2) DEFAULT 0,
    descricao TEXT NOT NULL,
    CHECK(preco >= 0),
    CONSTRAINT vinicola_vinho_fk FOREIGN KEY (vinicola_fk) REFERENCES vinicola(id_vinicola),
    CONSTRAINT pais_vinho_fk FOREIGN KEY (pais_fk) REFERENCES pais(id_pais)
); 

CREATE TABLE IF NOT EXISTS estoque (
    id_estoque INT AUTO_INCREMENT PRIMARY KEY,
    vinho_fk INT NOT NULL UNIQUE, 
    quantidade INT NOT NULL DEFAULT 0,
    status_estoque ENUM('Cheio', 'Normal', 'Baixo', 'Vazio', 'Sem Informação') NOT NULL DEFAULT "Sem Informação",
    CHECK(quantidade >= 0),
    CONSTRAINT vinho_estoque_fk FOREIGN KEY (vinho_fk) REFERENCES vinho(id_vinho) ON DELETE CASCADE
);

		/* Tabela sem complemento e número */
CREATE TABLE IF NOT EXISTS endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(100) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    localidade VARCHAR(50) NOT NULL,
    uf CHAR(2) NOT NULL,
    cep CHAR(9) NOT NULL UNIQUE
);

		/* Tabela com os dados do numero e complemento para o endereço */
CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    sobrenome VARCHAR(30) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    celular CHAR(15)
);

CREATE TABLE IF NOT EXISTS carrinho (
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    cliente_fk INT UNIQUE,
    quantidade INT NOT NULL default 0,
    CHECK(quantidade >= 0),
    CONSTRAINT cliente_carrinho_fk FOREIGN KEY (cliente_fk) REFERENCES cliente(id_cliente)
);
 
		/* Relacionamento N:N entre endereços e os clientes */
CREATE TABLE IF NOT EXISTS endereco_cliente (
	endereco_id INT NOT NULL,
    cliente_id INT NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    PRIMARY KEY(endereco_id, cliente_id),
	CONSTRAINT endereco_fk FOREIGN KEY (endereco_id) REFERENCES endereco(id_endereco),
    CONSTRAINT cliente_fk FOREIGN KEY (cliente_id) REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS itens_carrinho (
    id_itens_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    carrinho_fk INT NOT NULL UNIQUE,
    vinho_fk INT NOT NULL,
    UNIQUE(carrinho_fk, vinho_fk), 
    CONSTRAINT carrinho_itens_carrinho_fk FOREIGN KEY (carrinho_fk) REFERENCES carrinho(id_carrinho)
		ON DELETE CASCADE,
	CONSTRAINT carrinho_itens_vinho_fk FOREIGN KEY (vinho_fk) REFERENCES vinho(id_vinho)
);

CREATE TABLE IF NOT EXISTS pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    itens_carrinho_fk INT NOT NULL UNIQUE,
    endereco_entrega_fk INT NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    status_pedido ENUM('PENDENTE', 'EM ANDAMENTO', 'ENVIADO', 'ENTREGUE') NOT NULL DEFAULT "PENDENTE",
    data_pedido DATE NOT NULL,
    CHECK(valor_total >= 0),
    CONSTRAINT itens_carrinho_pedido_fk FOREIGN KEY (itens_carrinho_fk) REFERENCES itens_carrinho(id_itens_carrinho) ON DELETE CASCADE,
    CONSTRAINT endereco_pedido_fk FOREIGN KEY (endereco_entrega_fk) REFERENCES endereco(id_endereco)
);


/* 
		CRIAÇÃO DAS VIEW DO BANCO 

*/
    
use db_projeto_vinho;

		/* VIEW PARA A LISTAGEM DOS ENDEREÇOS DOS CLIENTES */
CREATE VIEW view_listagem_enderecos AS 
	SELECT c.id_cliente, CONCAT(c.nome, ' ', c.sobrenome) 'nome_completo_cliente', c.cpf, e.id_endereco, e.logradouro,
		   e.bairro, e.localidade 'cidade', e.uf, e.cep, ec.numero, ec.complemento
	FROM endereco e
		INNER JOIN endereco_cliente ec ON ec.endereco_id = e.id_endereco
        INNER JOIN cliente c ON c.id_cliente = ec.cliente_id
	ORDER BY 'cidade';
    
    
		/* VIEW PARA A LISTAGEM DOS VINHO */
CREATE VIEW view_listagem_vinho AS
	SELECT v.id_vinho, v.nome 'nome_vinho', v.uva 'uva_vinho', vi.vinicola, v.teor_alcolico, v.classificacao 'classificacao_vinho',
		   volume 'volume_vinho', safra 'safra_vinho', temperatura_servir, p.pais, v.preco 'preco_vinho'
    FROM vinho v
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
	ORDER BY 'nome_vinho';


		/* VIEW PARA A LISTAGEM DO ESTOQUE */
CREATE VIEW view_listagem_estoque AS
	SELECT e.id_estoque,v.id_vinho 'id_vinho', v.nome 'vinho', vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		v.preco 'preco' , v.safra 'safra_vinho', p.pais 'pais_vinho',
		 v.preco 'preco_vinho',v.descricao'descricao', e.quantidade 'quantidade_estoque',
           e.status_estoque 
    FROM vinho v
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN estoque e ON e.vinho_fk = v.id_vinho
	ORDER BY 'vinho';


		/* VIEW PARA A LISTAGEM DOS CLIENTES COM SEUS ENDERECEÇOS */
CREATE VIEW view_listagem_cliente AS
	SELECT c.id_cliente, CONCAT(c.nome, ' ', c.sobrenome) 'nome_completo', c.cpf, 
		   c.data_nascimento, c.email, c.senha, c.celular, e.logradouro 'endereco', ec.numero,
		   ec.complemento, e.bairro, e.localidade, e.uf, e.cep
    FROM cliente c
		INNER JOIN endereco_cliente ec ON ec.cliente_id = c.id_cliente
        INNER JOIN endereco e ON e.id_endereco = ec.endereco_id
	ORDER BY 'nome_completo';

		/* VIEW PARA A LISTAGEM DOS CLIENTES */
CREATE VIEW view_cliente AS
	SELECT c.id_cliente, CONCAT(c.nome, ' ', c.sobrenome) 'nome_completo', c.cpf, 
		   c.data_nascimento, c.email, c.senha, c.celular
    FROM cliente c
	ORDER BY 'nome_completo';

		/* VIEW PARA A LISTAGEM DOS ITENS DO CARRINHO */
CREATE VIEW view_listagem_itens_carrinho AS
	SELECT ic.id_itens_carrinho, v.id_vinho , v.nome 'vinho', vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		   p.pais 'pais_vinho', v.preco 'preco_vinho', cl.cpf, CONCAT(cl.nome, ' ', cl.sobrenome) 'nome_completo', c.quantidade
	FROM itens_carrinho ic
		INNER JOIN carrinho c ON c.id_carrinho = ic.carrinho_fk
        INNER JOIN vinho v ON v.id_vinho = ic.vinho_fk
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN cliente cl ON cl.id_cliente = c.cliente_fk
	ORDER BY 'vinho';
 
 
		/* VIEW PARA A LISTAGEM DOS PEDIDOS*/
CREATE VIEW view_listagem_pedidos AS
	SELECT pe.id_pedido, v.id_vinho , v.nome 'vinho', vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		   p.pais 'pais_vinho', v.preco 'preco_vinho', cl.cpf, CONCAT(cl.nome, ' ', cl.sobrenome) 'nome_completo', 
           e.logradouro 'endereco', ec.numero, ec.complemento, e.bairro, e.localidade, e.uf, e.cep, 
		   pe.valor_total 'preco_total_pedido', pe.data_pedido
	FROM pedido pe
		INNER JOIN itens_carrinho ic ON ic.id_itens_carrinho = pe.itens_carrinho_fk
		INNER JOIN carrinho c ON c.id_carrinho = ic.carrinho_fk
        INNER JOIN vinho v ON v.id_vinho = ic.vinho_fk
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN cliente cl ON cl.id_cliente = c.cliente_fk
        INNER JOIN endereco_cliente ec ON ec.cliente_id = cl.id_cliente
        INNER JOIN endereco e ON e.id_endereco = ec.endereco_id
	ORDER BY pe.data_pedido;



/* 

	CRIAÇÃO DAS PROCEDURE'S

*/

DELIMITER $$

CREATE PROCEDURE 
    cadastro_vinho(
    nome VARCHAR(100),
    uva VARCHAR(100),
    teor_alcolico VARCHAR(10),
    classificacao ENUM('Suave', 'Doce', 'Sem Classificação'),
    volume VARCHAR(50),
    safra YEAR,
    temperatura_servir VARCHAR(10),
    preco DECIMAL(10,2),
    descricao TEXT,
    vinicola_fk INT,
    pais_fk INT)
BEGIN
    DECLARE exists_vinho INT;
    DECLARE valid_vinicola INT;
    DECLARE valid_pais INT;

    START TRANSACTION;

    -- Verificando se o Vinho já existe
    SELECT COUNT(*) INTO exists_vinho 
    FROM vinho v
    WHERE v.nome = nome AND v.safra = safra AND v.vinicola_fk = vinicola_fk
		AND v.descricao = descricao;

    -- Validando a entrada da Vinícola
    SELECT COUNT(*) INTO valid_vinicola
    FROM vinicola 
    WHERE id_vinicola = vinicola_fk;
    
    -- Validando a entrada do Pais
    SELECT COUNT(*) INTO valid_pais
    FROM pais
    WHERE id_pais = pais_fk;

    IF exists_vinho = 0 AND valid_vinicola = 1 AND valid_pais = 1 THEN
        -- Inserção do Vinho
        INSERT INTO vinho (nome, uva, teor_alcolico, classificacao, volume, safra, temperatura_servir, preco, descricao, vinicola_fk, pais_fk)
			VALUES (nome, uva, teor_alcolico, classificacao, volume, safra, temperatura_servir, preco, descricao, vinicola_fk, pais_fk);
    COMMIT;
        SELECT CONCAT('Inserção Realizada com Sucesso! ID gerado: ',  LAST_INSERT_ID()) AS mensagem; 
    ELSE 
        ROLLBACK; 
        SELECT 'A inserção não pode ser concluida, verifique se os campos foram preenchidos corretamente' AS mensagem;
    END IF;
END;

DELIMITER ;

DROP PROCEDURE cadastro_vinho;

CALL cadastro_vinho('Teste3', 'Cabernet', '13%', 'Suave', '750ml', 2020, '16°C', 89.99, 'Um vinho delicioso!', 1, 2);

SELECT * FROM vinho;

CREATE TABLE IF NOT EXISTS vinho (
    id_vinho INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    uva VARCHAR(100) NOT NULL,
    vinicola_fk INT NOT NULL,
    teor_alcolico VARCHAR(10) NOT NULL,
    classificacao ENUM('Suave', 'Doce', 'Sem Classificação') NOT NULL DEFAULT "Sem Classificação",
    volume VARCHAR(50) NOT NULL,
    safra YEAR NOT NULL,
    temperatura_servir VARCHAR(10),
    pais_fk INT NOT NULL,
    preco DECIMAL(10,2) DEFAULT 0,
    descricao TEXT NOT NULL,
    CHECK(preco >= 0),
    CONSTRAINT vinicola_vinho_fk FOREIGN KEY (vinicola_fk) REFERENCES vinicola(id_vinicola),
    CONSTRAINT pais_vinho_fk FOREIGN KEY (pais_fk) REFERENCES pais(id_pais)
); 


/*

	SCRIPTS DE INSERÇÃO DE DADOS

*/

		/* TABELA PAIS */
INSERT INTO pais (pais, sigla) VALUES ("Brasil", "BRA");
INSERT INTO pais (pais, sigla) VALUES ("Argentina", "ARG");
INSERT INTO pais (pais, sigla) VALUES ("França", "FRA");


		/* TABELA VINICOLA */
INSERT INTO vinicola (vinicola, rotulo) VALUES ("vinicola1", "rotulo1");
INSERT INTO vinicola (vinicola, rotulo) VALUES ("vinicola2", "rotulo2");


		/* TABELA ESTOQUE */
INSERT INTO estoque (vinho_fk, quantidade,status_estoque) VALUES (1, 10, 'normal');
INSERT INTO estoque (vinho_fk, quantidade,status_estoque) VALUES (2, 2, 'Baixo');
INSERT INTO estoque (vinho_fk, quantidade,status_estoque) VALUES (3, 30, 'cheio');



		/* TABELA VINHO */
CALL cadastro_vinho('Teste', 'Cabernet', '13%', 'Suave', '750ml', 2020, '16°C', 89.99, 'Um vinho delicioso!', 1, 2);

