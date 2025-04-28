/* Procedures */

/* Para chamar as procedures usamos CALL. Exemplo: CALL cadastro_vinho(parametros...) */

use db_projeto_vinho;

DELIMITER $$

CREATE PROCEDURE 
    cadastro_vinho(
    imagem_vinho MEDIUMBLOB,
    mimetype VARCHAR(50),
    extensao VARCHAR(10),
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
        INSERT INTO vinho (imagem_vinho, mimetype, extensao, nome, uva, teor_alcolico, classificacao, volume, safra, temperatura_servir, preco, descricao, vinicola_fk, pais_fk)
			VALUES (imagem_vinho, mimetype, extensao, nome, uva, teor_alcolico, classificacao, volume, safra, temperatura_servir, preco, descricao, vinicola_fk, pais_fk);
    COMMIT;
        SELECT CONCAT('Inserção Realizada com Sucesso! ID gerado: ',  LAST_INSERT_ID()) AS mensagem; 
    ELSE 
        ROLLBACK; 
        SELECT 'Erro na inserção dos dados do Vinho' AS mensagem;
    END IF;
END;$$

DELIMITER ;