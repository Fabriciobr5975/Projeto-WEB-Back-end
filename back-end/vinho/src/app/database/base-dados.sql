/* SCRIPTS DE INSERÇÃO DE DADOS */

use db_projeto_vinho;

/* Inserção de alguns Paises */
INSERT INTO pais (pais, sigla) 
	VALUES ('Brasil', 'BRA'), 
		   ('Argentina', 'ARG'),
           ('França', 'FRA'),
           ('Chile', 'CHI'),
           ('Estados Unidos', 'USA'),
           ('Japão', 'JPA');


/* Inserção de algumas Vinícolas */
INSERT INTO vinicola (vinicola, rotulo) 
	VALUES ('Vale Encantado', 'Reserva Dourada'),
		   ('Vinhedos Aurora', 'Safira do Campo'),
           ('Monte Rubro', 'Ouro Carmesim'),
           ('Vinícola Estelar', 'Néctar Celestial'),
           ('Vinhedo Sereno', 'Brisa do Outono'),
           ('Terra de Uvas', 'Essência do Tempo');


/* Inserção do estoque */
INSERT INTO estoque (vinho_fk, quantidade, status_estoque) 
	VALUES (1, 20, 'Normal'),
		   (2, 0, 'Baixo'),
		   (3, 50, 'Cheio'),
           (4, 100, 'Cheio'),
		   (5, 12, 'Baixo'),
		   (6, 7, 'Baixo');


/* Inserção do endereco (Apenas CEP) */
-- CEP 01: 06045420 (Osasco) 
-- CEP 02: 05397260 (São Paulo)
-- CEP 03: 05583070 (São Paulo)
-- CEP 04: 06320030 (Carapicuíba)
-- CEP 05: 04696040 (São Paulo)
-- CEP 06: 06402190 (Barueri)


/* Inserção dos endereços dos clientes */
INSERT INTO endereco_cliente (endereco_id, cliente_id, numero, complemento)
	VALUES (1, 1, '130', 'Bloco Azul APTO 123'),
		   (2, 2, '100', 'Casa Amarela'),
           (3, 3, '150', 'Bloco A APTO 50'),
           (4, 4, '10', 'Ao lado da farmácia'),
           (5, 5, '260', 'Casa azul escuro'),
           (6, 5, '300', 'Bloco Cinza APTO 206');


/* Inserção de alguns cliente */
INSERT INTO cliente (nome, sobrenome, cpf, data_nascimento, email, senha, celular, administrador)
	VALUES 
		   ('Administrador', 'adm', '24441939035', '1990-05-02', 'administrador@teste.com', 'adm12345', '(11) 91111-1111', 1);
           
           
/* Inserção do carrinho (caso necessário) */
INSERT INTO carrinho (cliente_fk) values (1),
										 (2),
                                         (3),
                                         (4),
                                         (5),
                                         (6);


/* Inserção de itens no carrinho */
INSERT INTO itens_carrinho (carrinho_fk, vinho_fk, quantidade)
	VALUES (1, 1, 2),
		   (1, 3, 5),
           (2, 6, 5),
           (3, 1, 1),
           (3, 4, 10),
           (3, 5, 1),
           (4, 4, 5),
           (5, 1, 4),
           (5, 3, 9),
           (6, 3, 1);
           

/* Inserção de pedidos */
INSERT INTO pedido (carrinho_fk, endereco_entrega_fk, valor_total, status_pedido, data_pedido)
	VALUES (1, 1, 1000.0, 'EM ANDAMENTO', '2025-05-07'),
		   (2, 2, 2000.0, 'ENTREGUE', '2025-04-20'),
           (3, 3, 5000.0, 'EM ANDAMENTO', '2025-05-07'),
           (4, 4, 2000.0, 'PENDENTE', '2025-05-07'),
           (5, 5, 1000.0, 'PENDENTE', '2025-05-07'),
           (6, 6, 2500.0, 'EM ANDAMENTO', '2025-05-07');