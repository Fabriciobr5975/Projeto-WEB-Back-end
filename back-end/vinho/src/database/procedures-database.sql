/* Procedures. Para chamar as procedures usamos CALL. Exemplo: CALL cadastro_vinho(parametros...)  */

use db_projeto_vinho;

/* PROCEDURE para o cadastro de vinhos */
DELIMITER $$

CREATE PROCEDURE 
    cadastro_vinho(
    imagem_vinho MEDIUMBLOB,
    nome_imagem VARCHAR(100),
    mimetype VARCHAR(50),
    extensao VARCHAR(10),
    nome VARCHAR(100),
    uva VARCHAR(100),
    teor_alcolico VARCHAR(10),
    classificacao ENUM('Suave', 'Seco', 'Demi-Sec', 'Espumante', 'Frisante','Rosé', 'Sem Classificação'),
    volume VARCHAR(50),
    safra YEAR,
    temperatura_servir VARCHAR(10),
    preco DECIMAL(10,2),
    descricao TEXT,
    quantidade INT, 
    status_estoque ENUM('Cheio', 'Normal', 'Baixo', 'Vazio', 'Sem Informação'),
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
        INSERT INTO vinho (imagem_vinho, nome_imagem, mimetype, extensao, nome, uva, teor_alcolico, classificacao, volume, safra, temperatura_servir, preco, descricao, vinicola_fk, pais_fk)
			VALUES (imagem_vinho, nome_imagem, mimetype, extensao, nome, uva, teor_alcolico, classificacao, volume, safra, temperatura_servir, preco, descricao, vinicola_fk, pais_fk);
        
        -- ID gerado do vinho
		SET @last_id_vinho = last_insert_id();
	
		-- Inserção do estoque do vinho
		INSERT INTO estoque (vinho_fk, quantidade, status_estoque)
			VALUES (@last_id_vinho, quantidade, status_estoque);
  
  COMMIT;
        SELECT CONCAT('Inserção Realizada com Sucesso! ID gerado: ',  LAST_INSERT_ID()) AS mensagem; 
    ELSE 
        ROLLBACK; 
        SELECT 'Erro na inserção dos dados do Vinho' AS mensagem;
    END IF;
END;$$

DELIMITER ;


/* PROCEDURE para a alteração de vinhos e do estoque */
DELIMITER $$

CREATE PROCEDURE 
    alterar_vinho(
    _imagem_vinho MEDIUMBLOB,
    _nome_imagem VARCHAR(100),
    _mimetype VARCHAR(50),
    _extensao VARCHAR(10),
    _nome VARCHAR(100),
    _uva VARCHAR(100),
    _teor_alcolico VARCHAR(10),
    _classificacao ENUM('Suave', 'Seco', 'Demi-Sec', 'Espumante', 'Frisante','Rosé', 'Sem Classificação'),
    _volume VARCHAR(50),
    _safra YEAR,
    _temperatura_servir VARCHAR(10),
    _preco DECIMAL(10,2),
    _descricao TEXT,
    _quantidade INT, 
    _status_estoque ENUM('Cheio', 'Normal', 'Baixo', 'Vazio', 'Sem Informação'),
    _vinicola_fk INT,
    _pais_fk INT,
    _id_vinho INT) 
BEGIN
    DECLARE exists_vinho INT;
    DECLARE valid_vinicola INT;
    DECLARE valid_pais INT;

    START TRANSACTION;

    -- Verificando se o Vinho já existe
    SELECT COUNT(*) INTO exists_vinho 
	FROM vinho v
	WHERE id_vinho = _id_vinho;

    -- Validando a entrada da Vinícola
    SELECT COUNT(*) INTO valid_vinicola
    FROM vinicola 
    WHERE id_vinicola = _vinicola_fk;
    
    -- Validando a entrada do Pais
    SELECT COUNT(*) INTO valid_pais
    FROM pais
    WHERE id_pais = _pais_fk;

    IF exists_vinho = 1 AND valid_vinicola = 1 AND valid_pais = 1 THEN
        -- Alteração do Vinho
        UPDATE vinho 
			SET imagem_vinho = _imagem_vinho,
				nome_imagem = _nome_imagem, 
                mimetype = _mimetype,
                extensao = _extensao, 
                nome = _nome, 
                uva = _uva,
                teor_alcolico = _teor_alcolico, 
                classificacao = _classificacao, 
                volume = _volume,
                safra = _safra,
                temperatura_servir = _temperatura_servir,
                preco = _preco,
                descricao = _descricao,
                vinicola_fk = _vinicola_fk,
                pais_fk = _pais_fk
		WHERE id_vinho = _id_vinho;
			
		UPDATE estoque
			SET vinho_fk = _id_vinho,
				quantidade = _quantidade,
                status_estoque = _status_estoque
			WHERE vinho_fk = _id_vinho;
        
  COMMIT;
        SELECT 'Alteração Realizada com Sucesso!' AS mensagem; 
    ELSE 
        ROLLBACK; 
        SELECT 'Erro na alteração dos dados do Vinho' AS mensagem;
    END IF;
END;$$

DELIMITER ;


/* PROCEDURE para a inserção de clientes, endereço e endereco_cliente */

DELIMITER $$

CREATE PROCEDURE 
    cadastro_usuario(
    nome VARCHAR(30),
    sobrenome VARCHAR(30),
    cpf CHAR(11),
    email VARCHAR(100),
    senha VARCHAR(20),
    celular CHAR(15),
    logradouro VARCHAR(100),
    bairro VARCHAR(50),
    localidade VARCHAR(50),
    uf CHAR(2),
    cep CHAR(9),
    numero VARCHAR(10),
    complemento VARCHAR(50))
    
BEGIN
	/* Variáveis para validar se os itens abaixo existem ou não */
    DECLARE exists_cliente INT;
    DECLARE exists_endereco INT;
    DECLARE exist_endereco_cliente INT;

    START TRANSACTION;

    -- Verificando se o Cliente já existe
    SELECT COUNT(*) INTO exists_cliente 
    FROM cliente c
    WHERE c.cpf = cpf;

    -- Validando se o Endereço já existe
    SELECT COUNT(*) INTO exists_endereco
    FROM endereco e 
    WHERE e.cep = cep;
    
    -- Validando se o cliente já tem esse endereço
    SELECT COUNT(*) INTO exist_endereco_cliente
    FROM endereco_cliente ec
    WHERE ec.cliente_id = (SELECT c.id_cliente FROM cliente c where c.cpf = cpf);

	IF exists_cliente = 1 THEN
		ROLLBACK; 
        SELECT 'Erro: Esse cliente já foi inserido' AS mensagem;
        
	ELSEIF exist_endereco_cliente = 1 THEN
		ROLLBACK; 
        SELECT 'Erro: Esse cliente já foi inserido e já contem os dados do endereço' AS mensagem;

	-- Se não tiver o usuário, e o mesmo não tiver passado os dados do endereço (cep)
	ELSEIF exists_cliente = 0 AND (cep IS NULL OR TRIM(cep) = '') THEN
    -- Inserção do Cliente
        INSERT INTO cliente (nome, sobrenome, cpf, email, senha, celular)
			VALUES (nome, sobrenome, cpf, email, senha, celular);
            
            -- ID gerado do cliente
			SET @last_id_cliente = last_insert_id();
            
			COMMIT;
			SELECT CONCAT('Inserção Realizada com Sucesso! ID Cliente: ',  @last_id_cliente) AS mensagem; 

	-- Se não tiver o usuário buscado, o endereço buscado não existir e a relação entre cliente e endereço não existir
    ELSEIF exists_cliente = 0 AND exists_endereco = 0 AND exist_endereco_cliente = 0 THEN
        -- Inserção do Cliente
        INSERT INTO cliente (nome, sobrenome, cpf, email, senha, celular)
			VALUES (nome, sobrenome, cpf, email, senha, celular);
            
		-- ID gerado do cliente
		SET @last_id_cliente = last_insert_id();
        
        -- Inserção do Endereço
        INSERT INTO endereco (logradouro, bairro, localidade, uf, cep)
			VALUES (logradouro, bairro, localidade, uf, cep);
            
		-- ID gerado do endereco
		SET @last_id_endereco = last_insert_id();
        
        -- Inserção do Endereço dos Clientes
        INSERT INTO endereco_cliente (endereco_id, cliente_id, numero, complemento)
			VALUES (@last_id_endereco, @last_id_cliente, numero, complemento);
        
		COMMIT;
        SELECT CONCAT('Inserção Realizada com Sucesso! ID Cliente: ',  @last_id_cliente) AS mensagem; 
    
    -- Se não tiver o usuário buscado, mas o endereço buscado existir e a relação entre cliente e endereço não existir
    ELSEIF exists_cliente = 0 AND exists_endereco = 1 AND exist_endereco_cliente = 0 THEN
		-- Inserção do Cliente
        INSERT INTO cliente (nome, sobrenome, cpf, email, senha, celular)
			VALUES (nome, sobrenome, cpf, email, senha, celular);
            
		-- ID gerado do cliente
		SET @last_id_cliente = last_insert_id();
        
        -- Busca pelo Endereço
        SET @id_endereco = (SELECT e.id_endereco FROM endereco e WHERE e.cep = cep);
            
        -- Inserção do Endereço dos Clientes
        INSERT INTO endereco_cliente (endereco_id, cliente_id, numero, complemento)
			VALUES (@id_endereco, @last_id_cliente, numero, complemento);
            
		COMMIT;
		SELECT CONCAT('Inserção Realizada com Sucesso! ID Cliente: ',  @last_id_cliente) AS mensagem; 
        
    ELSE 
        ROLLBACK; 
        SELECT 'Erro na inserção dos dados do Cliente' AS mensagem;
    END IF;
END;$$

DELIMITER ;

/* Procedure para a inserção do item no carrinho do usuário */
DELIMITER $$

CREATE PROCEDURE 
    insercao_itens_carrinho(
    carrinho_fk INT,
    vinho_fk INT,
    quantidade INT) 
BEGIN
    DECLARE exists_item_carrinho INT;

    START TRANSACTION;

    -- Verificando se o Item já está no carrinho
	SELECT EXISTS(
		SELECT 1 
        FROM itens_carrinho ic
        WHERE ic.carrinho_fk = carrinho_fk AND ic.vinho_fk = vinho_fk
	) INTO exists_item_carrinho;
    
    IF exists_item_carrinho = 0 THEN
        -- Inserção do Vinho
        INSERT INTO itens_carrinho (carrinho_fk, vinho_fk, quantidade)
			VALUES (carrinho_fk, vinho_fk, quantidade);
    COMMIT;
        SELECT CONCAT('O Item foi adicionado no carrinho com sucesso! ID da operação: ',  LAST_INSERT_ID()) AS mensagem; 
    ELSE 
        ROLLBACK; 
        SELECT 'Erro, esse vinho já foi adicionado ao carrinho!' AS mensagem;
    END IF;
END;$$

DELIMITER ;


/* PROCEDURE para a inserção de novos endereço, associando aos clientes */
CREATE PROCEDURE 
    cadastro_endereco_cliente(
		logradouro VARCHAR(100),
		bairro VARCHAR(50),
		localidade VARCHAR(50),
		uf CHAR(2),
		cep CHAR(9),
		numero VARCHAR(10),
		complemento VARCHAR(50),
        apelido_endereco VARCHAR(100),
		endereco_id INT,
		cliente_id INT)
    
BEGIN
	/* Variáveis para validar se os itens abaixo existem ou não */
    DECLARE exists_cliente INT;
    DECLARE exists_endereco INT;
    DECLARE exist_endereco_cliente INT;

    START TRANSACTION;

    -- Verificando se o Cliente já existe
    SELECT COUNT(*) INTO exists_cliente 
    FROM cliente c
    WHERE c.id_cliente = cliente_id;

    -- Validando se o Endereço já existe
    SELECT COUNT(*) INTO exists_endereco
    FROM endereco e 
    WHERE e.cep = cep;
    
    -- Validando se o cliente já tem esse endereço
    SELECT COUNT(*) INTO exist_endereco_cliente
    FROM endereco_cliente ec
    WHERE ec.cliente_id = cliente_id AND ec.endereco_id = endereco_id; 

	IF exists_cliente = 0 THEN
		ROLLBACK; 
        SELECT 'Erro: Esse cliente não existe' AS mensagem;
        
	ELSEIF exist_endereco_cliente = 1 THEN
		ROLLBACK; 
        SELECT 'Erro: Esse cliente já contem os dados do endereço' AS mensagem;

	ELSEIF exists_cliente = 1 AND exists_endereco = 0 AND exist_endereco_cliente = 0 THEN
        -- Inserção do endereço
        INSERT INTO endereco (logradouro, bairro, localidade, uf, cep)
			VALUES (logradouro, bairro, localidade, uf, cep);
            
		-- ID gerado do cliente
		SET @last_id_endereco = last_insert_id();
        
        -- Inserção do Endereço dos Clientes
        INSERT INTO endereco_cliente (endereco_id, cliente_id, numero, complemento, apelido_endereco)
			VALUES (@last_id_endereco, cliente_id, numero, complemento, apelido_endereco);
        
		COMMIT;
        SELECT 'Endereço adicionado com sucesso!' AS mensagem; 
    
    ELSEIF exists_cliente = 1 AND exists_endereco = 1 AND exist_endereco_cliente = 0 THEN
        -- Busca pelo Endereço
        SET @id_endereco = (SELECT e.id_endereco FROM endereco e WHERE e.cep = cep);
            
        -- Inserção do Endereço dos Clientes
        INSERT INTO endereco_cliente (endereco_id, cliente_id, numero, complemento, apelido_endereco)
			VALUES (@id_endereco, cliente_id, numero, complemento, apelido_endereco);
            
		COMMIT;
		SELECT 'Endereço adicionado com sucesso!' AS mensagem; 
        
    ELSE 
        ROLLBACK; 
        SELECT 'Erro na inserção dos dados do Cliente' AS mensagem;
    END IF;
END;
