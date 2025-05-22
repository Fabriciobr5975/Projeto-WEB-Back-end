 /* CRIAÇÃO DAS TABELAS DO BANCO DE DADOS */ 

CREATE DATABASE IF NOT EXISTS db_projeto_vinho; 
 
use db_projeto_vinho;

/* Tabela Vinícola */
CREATE TABLE IF NOT EXISTS vinicola (
    id_vinicola INT AUTO_INCREMENT PRIMARY KEY,
    vinicola VARCHAR(100) NOT NULL UNIQUE,
    rotulo VARCHAR(100) NOT NULL
);

/* Tabela Pais */
CREATE TABLE IF NOT EXISTS pais (
    id_pais INT AUTO_INCREMENT PRIMARY KEY,
    pais VARCHAR(100) NOT NULL UNIQUE,
    sigla CHAR(3) NOT NULL UNIQUE
);

DROP TABLE vinho;

/* Tabela Vinho */
CREATE TABLE IF NOT EXISTS vinho (
    id_vinho INT AUTO_INCREMENT PRIMARY KEY,
    imagem_vinho LONGBLOB NOT NULL,
    mimetype VARCHAR(50) NOT NULL,
    nome_imagem VARCHAR(100) NOT NULL,
    extensao VARCHAR(10) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    uva VARCHAR(100) NOT NULL,
    vinicola_fk INT NOT NULL,
    teor_alcolico VARCHAR(10) NOT NULL,
    classificacao ENUM('Suave', 'Seco', 'Demi-Sec', 'Espumante', 'Frisante','Rosé', 'Sem Classificação') NOT NULL DEFAULT "Sem Classificação",
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

/* Tabela Estoque */
CREATE TABLE IF NOT EXISTS estoque (
    id_estoque INT AUTO_INCREMENT PRIMARY KEY,
    vinho_fk INT NOT NULL UNIQUE, 
    quantidade INT NOT NULL DEFAULT 0,
    status_estoque ENUM('Cheio', 'Normal', 'Baixo', 'Vazio', 'Sem Informação') NOT NULL DEFAULT "Sem Informação",
    CHECK(quantidade >= 0),
    CONSTRAINT vinho_estoque_fk FOREIGN KEY (vinho_fk) REFERENCES vinho(id_vinho) ON DELETE CASCADE
);

/* Tabela Endereço */
CREATE TABLE IF NOT EXISTS endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(100) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    localidade VARCHAR(50) NOT NULL,
    uf CHAR(2) NOT NULL,
    cep CHAR(9) NOT NULL UNIQUE
);

/* Tabela Cliente */
CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    sobrenome VARCHAR(30) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    celular CHAR(15),
    administrador BOOLEAN default 0
);


/* Tabela Endereco Cliente (N:N) */
CREATE TABLE IF NOT EXISTS endereco_cliente (
	endereco_id INT NOT NULL,
    cliente_id INT NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    apelido_endereco VARCHAR(100),
    PRIMARY KEY(endereco_id, cliente_id),
	CONSTRAINT endereco_fk FOREIGN KEY (endereco_id) REFERENCES endereco(id_endereco),
    CONSTRAINT cliente_fk FOREIGN KEY (cliente_id) REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

/* Tabela Carrinho */
CREATE TABLE IF NOT EXISTS carrinho (
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    cliente_fk INT UNIQUE,
    CONSTRAINT cliente_carrinho_fk FOREIGN KEY (cliente_fk) REFERENCES cliente(id_cliente)
);

/* Tabela Itens Carrinho (N:N) */
CREATE TABLE IF NOT EXISTS itens_carrinho (
    id_itens_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    carrinho_fk INT NOT NULL,
    vinho_fk INT NOT NULL,
    quantidade INT NOT NULL default 0,
    item_esta_no_pedido BOOLEAN NOT NULL DEFAULT 0,
    CHECK(quantidade >= 0),
    UNIQUE(carrinho_fk, vinho_fk), 
    CONSTRAINT carrinho_itens_carrinho_fk FOREIGN KEY (carrinho_fk) REFERENCES carrinho(id_carrinho)
		ON DELETE CASCADE,
	CONSTRAINT carrinho_itens_vinho_fk FOREIGN KEY (vinho_fk) REFERENCES vinho(id_vinho)
);


/* Tabela Pedido */
CREATE TABLE IF NOT EXISTS pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    carrinho_fk INT NOT NULL UNIQUE,
    endereco_entrega_fk INT NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    status_pedido ENUM('PENDENTE', 'EM ANDAMENTO', 'ENVIADO', 'ENTREGUE') NOT NULL DEFAULT "PENDENTE",
    data_pedido DATE NOT NULL,
    CHECK(valor_total >= 0),
    CONSTRAINT itens_carrinho_pedido_fk FOREIGN KEY (carrinho_fk) REFERENCES carrinho(id_carrinho) ON DELETE CASCADE,
    CONSTRAINT endereco_pedido_fk FOREIGN KEY (endereco_entrega_fk) REFERENCES endereco(id_endereco)
);

