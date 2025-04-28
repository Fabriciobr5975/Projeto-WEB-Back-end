/* VIEWS */

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
	SELECT v.id_vinho, v.imagem_vinho, v.mimetype, v.extensao, v.nome 'nome_vinho', v.uva 'uva_vinho', vi.vinicola,
		   v.teor_alcolico, v.classificacao 'classificacao_vinho', volume 'volume_vinho', safra 'safra_vinho',
           temperatura_servir, p.pais, v.preco 'preco_vinho'
    FROM vinho v
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
	ORDER BY 'nome_vinho';

/* VIEW PARA A LISTAGEM DO ESTOQUE */
CREATE VIEW view_listagem_estoque AS
	SELECT e.id_estoque, v.nome 'vinho', vi.vinicola 'vinicola_vinho', v.classificacao 'classificao_vinho',
		   v.safra 'safra_vinho', p.pais 'pais_vinho', v.preco 'preco_vinho', e.quantidade 'quantidade_estoque',
           e.status_estoque 
    FROM vinho v
		INNER JOIN vinicola vi ON vi.id_vinicola = v.vinicola_fk
        INNER JOIN pais p ON p.id_pais = v.pais_fk
        INNER JOIN estoque e ON e.vinho_fk = v.id_vinho
	ORDER BY v.nome;


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
