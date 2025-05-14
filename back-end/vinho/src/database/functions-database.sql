use db_projeto_vinho;

DELIMITER $$

/* Função para calcular o preço total de cada pedido, pegando o preço e multiplicando pela quantidade */
CREATE FUNCTION function_calcular_valor_total_pedido (pedido_id INT)
	RETURNS DECIMAL (10, 2)
DETERMINISTIC
BEGIN
	DECLARE total DECIMAL (10, 2);
    
    SELECT SUM(preco * quantidade) INTO total
    FROM view_listagem_pedidos
    WHERE id_pedido = pedido_id;
	
    RETURN total;
END $$
DELIMITER ;