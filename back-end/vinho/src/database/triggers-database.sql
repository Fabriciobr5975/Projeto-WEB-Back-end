/* CRIAÇÃO DAS TRIGGERS PARA AS TABELAS */ 

use db_projeto_vinho;

/* Trigger para a atualização do estoque após a inserção do item do carrinho */
DELIMITER $$
CREATE TRIGGER trigger_atualizar_estoque_apos_insercao
	AFTER INSERT ON itens_carrinho
	FOR EACH ROW
BEGIN
	DECLARE quantidade_atual INT;
	SELECT quantidade INTO quantidade_atual FROM estoque WHERE vinho_fk = NEW.vinho_fk; 

	IF quantidade_atual >= NEW.quantidade THEN
			UPDATE estoque
				SET quantidade = quantidade - NEW.quantidade
			WHERE vinho_fk = NEW.vinho_fk;
	ELSE 
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ocorreu um erro ao atualizar a quantidade do estoque. Estoque insuficiente';
	END IF;
END$$;
DELIMITER ;


/* Trigger para a atualização do estoque após a alteração do item do carrinho */
DELIMITER $$
CREATE TRIGGER trigger_atualizar_estoque_apos_alteracao
	AFTER UPDATE ON itens_carrinho
	FOR EACH ROW
BEGIN
	DECLARE quantidade_atual INT;
	SELECT quantidade INTO quantidade_atual FROM estoque WHERE vinho_fk = NEW.vinho_fk; 

	IF quantidade_atual >= NEW.quantidade THEN
        IF NEW.quantidade > OLD.quantidade THEN
			UPDATE estoque
				SET quantidade = quantidade - (NEW.quantidade - OLD.quantidade)
			WHERE vinho_fk = NEW.vinho_fk;
		ELSE
			UPDATE estoque
				SET quantidade = quantidade + (OLD.quantidade - NEW.quantidade)
			WHERE vinho_fk = NEW.vinho_fk;
        END IF;
    ELSE 
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ocorreu um erro ao atualizar a quantidade do estoque. Estoque insuficiente';
	END IF;
END$$;
DELIMITER ;


/* Trigger para a atualização do estoque após a remoção do item do carrinho */
DELIMITER $$
CREATE TRIGGER trigger_atualizar_estoque_apos_remocao
	AFTER DELETE ON itens_carrinho
	FOR EACH ROW
BEGIN
	DECLARE quantidade_atual INT;
	SELECT quantidade INTO quantidade_atual FROM estoque WHERE vinho_fk = OLD.vinho_fk; 
    
	IF quantidade_atual >= OLD.quantidade THEN
		UPDATE estoque
		SET quantidade = quantidade + OLD.quantidade
	WHERE vinho_fk = OLD.vinho_fk;
    
    ELSE 
    SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ocorreu um erro ao atualizar a quantidade do estoque';
	END IF;
END$$;
DELIMITER ;


/* Trigger para a criação do carrinho do cliente após a criação do mesmo */
DELIMITER $$
CREATE TRIGGER trigger_criar_carrinho_usuario
	AFTER INSERT ON cliente
	FOR EACH ROW
BEGIN
	INSERT carrinho (cliente_fk) VALUE (NEW.id_cliente);
END$$;
DELIMITER ;
